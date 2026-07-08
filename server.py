"""
EFTA-DL Web Console — Flask backend.
Start with:  python server.py
Then open:   http://localhost:15000
"""

import json
import os
import queue
import re
import sqlite3
import subprocess
import sys
import threading
import time
from datetime import datetime
from pathlib import Path

from flask import Flask, Response, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).parent
WEB_DIR  = BASE_DIR / "web"
DOWNLOAD_SCRIPT = BASE_DIR / "download.py"
SETTINGS_FILE   = BASE_DIR / ".gui_settings.json"

app = Flask(__name__, static_folder=str(WEB_DIR), static_url_path="")

# ── Crawl state ────────────────────────────────────────────────────────────
_proc: subprocess.Popen | None = None
_proc_lock  = threading.Lock()
_log_queue: queue.Queue = queue.Queue(maxsize=2000)
_crawl_state: dict = {
    "running": False, "dataset": None, "page": 0,
    "workers": 10, "delay": 0.4,
    "use_httpx": True, "use_playwright": True, "resume": True,
    "db_size": None, "total_files": None, "conflicts": 0,
    "retries": 0, "elapsed": None, "eta": None, "part": None,
    "max_pages": None, "start_time": None,
}
_state_lock = threading.Lock()

# ── Helpers ────────────────────────────────────────────────────────────────
def _fmt_size(b):
    if b is None:
        return None
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if b < 1024:
            return f"{b:.1f} {unit}"
        b /= 1024
    return f"{b:.1f} PB"


def _elapsed_str(start: float) -> str:
    secs = int(time.time() - start)
    h, rem = divmod(secs, 3600)
    m, s   = divmod(rem, 60)
    return f"{h}h {m}m" if h else f"{m}m {s}s"


def _db_path() -> Path | None:
    db = BASE_DIR / "downloads.db"
    return db if db.exists() else None


def _open_db():
    db = _db_path()
    if not db:
        return None
    conn = sqlite3.connect(str(db), timeout=5)
    conn.row_factory = sqlite3.Row
    return conn


def _get_db_stats() -> dict:
    conn = _open_db()
    if not conn:
        return {"downloaded": 0, "duplicates": 0, "conflicts": 0, "unmatched": 0}
    try:
        c = conn.cursor()
        out = {}
        for st in ("downloaded", "duplicate", "conflict", "unmatched"):
            c.execute("SELECT COUNT(*) FROM files WHERE status=?", (st,))
            out[st] = c.fetchone()[0]
        return {
            "downloaded": out["downloaded"],
            "duplicates":  out["duplicate"],
            "conflicts":   out["conflict"],
            "unmatched":   out["unmatched"],
        }
    except Exception:
        return {"downloaded": 0, "duplicates": 0, "conflicts": 0, "unmatched": 0}
    finally:
        conn.close()


# ── Settings ───────────────────────────────────────────────────────────────
_DEFAULT_SETTINGS = {
    "use_httpx": True, "use_playwright": True,
    "workers": 10, "delay": 0.4,
    "max_forbidden": 3, "max_retries": 3,
    "db_state": True, "fs_fallback": True,
    "csv": False, "debug": False,
    "download_dir": "downloads/",
}

def _load_settings() -> dict:
    base = dict(_DEFAULT_SETTINGS)
    if SETTINGS_FILE.exists():
        try:
            base.update(json.loads(SETTINGS_FILE.read_text(encoding="utf-8")))
        except Exception:
            pass
    return base


def _save_settings(data: dict):
    current = _load_settings()
    current.update(data)
    SETTINGS_FILE.write_text(json.dumps(current, indent=2), encoding="utf-8")


# ── Log parsing ────────────────────────────────────────────────────────────
_EMOJI_LEVEL = [
    ("✅", "success"), ("⬇", "success"),
    ("⚠️", "warn"),   ("⚠", "warn"),
    ("⏭️", "skip"),   ("⏭", "skip"),
    ("📄", "fetch"),  ("🔁", "fetch"),
    ("🛑", "error"),  ("❌", "error"),
    ("403", "warn"),  ("Forbidden", "warn"),
    ("Skipping duplicate", "skip"), ("duplicate", "skip"),
    ("Downloaded", "success"),
    ("Fetching page", "fetch"), ("Fetching", "fetch"),
    ("Retrying", "fetch"), ("Retry", "fetch"),
    ("conflict", "conflict"),
    ("ERROR", "error"), ("Error", "error"),
]

def _parse_log_line(raw: str) -> dict | None:
    raw = raw.rstrip()
    if not raw:
        return None
    t = datetime.now().strftime("%H:%M:%S")

    level = "info"
    for marker, lvl in _EMOJI_LEVEL:
        if marker in raw:
            level = lvl
            break

    # Track page number
    m = re.search(r"page[_ ]+([0-9,]+)", raw, re.IGNORECASE)
    if m:
        try:
            pg = int(m.group(1).replace(",", ""))
            with _state_lock:
                if pg > _crawl_state.get("page", 0):
                    _crawl_state["page"] = pg
                    _crawl_state["part"] = f"part_{pg // 1000 + 1}"
        except ValueError:
            pass

    # Track retries
    if "attempt" in raw.lower() or "retry" in raw.lower() or "retrying" in raw.lower():
        with _state_lock:
            _crawl_state["retries"] = _crawl_state.get("retries", 0) + 1

    # Bold filenames
    parts = []
    segs = re.split(r"(EFTA\d+\.pdf|\S+\.pdf)", raw)
    for seg in segs:
        if re.match(r"EFTA\d+\.pdf|\S+\.pdf", seg):
            parts.append({"text": seg, "bold": True})
        elif seg:
            parts.append({"text": seg, "bold": False})

    return {"t": t, "level": level, "parts": parts, "m": raw}


def _stream_proc(proc: subprocess.Popen):
    """Read process stdout line-by-line and push structured entries to queue."""
    for raw in proc.stdout:
        entry = _parse_log_line(raw)
        if entry:
            try:
                _log_queue.put_nowait(entry)
            except queue.Full:
                try:
                    _log_queue.get_nowait()
                    _log_queue.put_nowait(entry)
                except Exception:
                    pass

    proc.wait()
    with _state_lock:
        _crawl_state["running"] = False
        _crawl_state["elapsed"] = None
    _log_queue.put_nowait({
        "t": datetime.now().strftime("%H:%M:%S"),
        "level": "info",
        "parts": [{"text": f"Process exited (code {proc.returncode}).", "bold": False}],
        "m": f"Process exited (code {proc.returncode}).",
    })


def _bg_update():
    """Background thread: refresh elapsed time and DB stats every 5 s."""
    while True:
        time.sleep(5)
        with _state_lock:
            if _crawl_state["running"] and _crawl_state.get("start_time"):
                _crawl_state["elapsed"] = _elapsed_str(_crawl_state["start_time"])

        db = _db_path()
        if db:
            try:
                with _state_lock:
                    _crawl_state["db_size"] = _fmt_size(db.stat().st_size)
            except Exception:
                pass

        try:
            stats = _get_db_stats()
            with _state_lock:
                _crawl_state["total_files"] = stats["downloaded"]
                _crawl_state["conflicts"]   = stats["conflicts"]
        except Exception:
            pass


threading.Thread(target=_bg_update, daemon=True).start()


# ── Static ─────────────────────────────────────────────────────────────────
@app.route("/")
def index():
    return send_from_directory(str(WEB_DIR), "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(str(WEB_DIR), path)


# ── API: status ────────────────────────────────────────────────────────────
@app.route("/api/status")
def api_status():
    db = _db_path()
    with _state_lock:
        state = dict(_crawl_state)
    if db:
        try:
            state["db_size"] = _fmt_size(db.stat().st_size)
        except Exception:
            pass
    return jsonify(state)


# ── API: settings ──────────────────────────────────────────────────────────
@app.route("/api/settings", methods=["GET", "POST"])
def api_settings():
    if request.method == "GET":
        return jsonify(_load_settings())
    data = request.get_json(force=True) or {}
    _save_settings(data)
    # Mirror relevant keys into live crawl state
    with _state_lock:
        for key, state_key in [("workers", "workers"), ("delay", "delay"),
                                ("use_httpx", "use_httpx"), ("use_playwright", "use_playwright")]:
            if key in data:
                _crawl_state[state_key] = data[key]
    return jsonify({"ok": True})


# ── API: start ─────────────────────────────────────────────────────────────
def _build_and_spawn(cfg: dict):
    """Build the download.py command from cfg dict and spawn it. Returns (proc, cmd) or raises."""
    settings = _load_settings()
    dl_dir = cfg.get("downloadDir") or settings.get("download_dir", "downloads/")

    cmd = [sys.executable, "-u", str(DOWNLOAD_SCRIPT)]  # -u = unbuffered
    cmd += ["--dataset",       str(cfg.get("dataset", 12))]
    cmd += ["--max-workers",   str(cfg.get("workers",  settings["workers"]))]
    cmd += ["--request-delay", str(cfg.get("delay",    settings["delay"]))]
    cmd += ["--download-dir",  dl_dir]

    sp = cfg.get("startPage", 0)
    ep = cfg.get("endPage",   0)
    if sp: cmd += ["--start-page", str(sp)]
    if ep: cmd += ["--end-page",   str(ep)]

    if not cfg.get("httpx", settings["use_httpx"]):
        cmd.append("--no-httpx")
    if not cfg.get("pw", settings["use_playwright"]):
        cmd.append("--no-playwright")
    if not cfg.get("resume", True):
        cmd.append("--no-resume")
    if cfg.get("dry"):
        cmd.append("--dry-run")
    if settings.get("csv"):
        cmd.append("--use-csv-log")
    if settings.get("debug"):
        cmd.append("--debug-http")
    if not settings.get("fs_fallback", True):
        cmd.append("--no-fs-fallback")
    if settings.get("max_forbidden") and settings["max_forbidden"] != 3:
        cmd += ["--max-forbidden", str(settings["max_forbidden"])]
    if settings.get("max_retries") and settings["max_retries"] != 3:
        cmd += ["--max-retries", str(settings["max_retries"])]

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"  # force line-buffered output

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1,
        cwd=str(BASE_DIR),
        env=env,
    )
    return proc, cmd


@app.route("/api/start", methods=["POST"])
def api_start():
    global _proc
    cfg = request.get_json(force=True) or {}

    with _proc_lock:
        if _proc and _proc.poll() is None:
            return jsonify({"ok": False, "error": "A crawl is already running."}), 409
        try:
            proc, cmd = _build_and_spawn(cfg)
        except Exception as e:
            return jsonify({"ok": False, "error": str(e)}), 500

        _proc = proc
        settings = _load_settings()
        with _state_lock:
            _crawl_state.update({
                "running": True,
                "dataset": cfg.get("dataset", 12),
                "page":    cfg.get("startPage", 0),
                "workers": cfg.get("workers", settings["workers"]),
                "delay":   cfg.get("delay",   settings["delay"]),
                "use_httpx":      cfg.get("httpx", settings["use_httpx"]),
                "use_playwright": cfg.get("pw",    settings["use_playwright"]),
                "resume": cfg.get("resume", True),
                "start_time": time.time(),
                "elapsed": "0m 0s",
                "retries": 0,
            })
        threading.Thread(target=_stream_proc, args=(proc,), daemon=True).start()

    _log_queue.put_nowait({
        "t": datetime.now().strftime("%H:%M:%S"),
        "level": "info",
        "parts": [{"text": "Starting: " + " ".join(cmd), "bold": False}],
        "m": "Starting: " + " ".join(cmd),
    })
    return jsonify({"ok": True})


# ── API: pause / resume / stop ─────────────────────────────────────────────
@app.route("/api/pause", methods=["POST"])
def api_pause():
    global _proc
    with _proc_lock:
        if _proc and _proc.poll() is None:
            _proc.terminate()
            with _state_lock:
                _crawl_state["running"] = False
    return jsonify({"ok": True})


@app.route("/api/resume", methods=["POST"])
def api_resume():
    global _proc
    with _state_lock:
        cfg = {
            "dataset":  _crawl_state.get("dataset"),
            "workers":  _crawl_state.get("workers"),
            "delay":    _crawl_state.get("delay"),
            "httpx":    _crawl_state.get("use_httpx", True),
            "pw":       _crawl_state.get("use_playwright", True),
            "resume":   True,
        }
    if not cfg["dataset"]:
        return jsonify({"ok": False, "error": "No previous dataset to resume."}), 400

    with _proc_lock:
        if _proc and _proc.poll() is None:
            _proc.terminate()
            time.sleep(0.5)
        try:
            proc, cmd = _build_and_spawn(cfg)
        except Exception as e:
            return jsonify({"ok": False, "error": str(e)}), 500

        _proc = proc
        with _state_lock:
            _crawl_state["running"]    = True
            _crawl_state["start_time"] = time.time()
            _crawl_state["retries"]    = 0
        threading.Thread(target=_stream_proc, args=(proc,), daemon=True).start()

    _log_queue.put_nowait({
        "t": datetime.now().strftime("%H:%M:%S"),
        "level": "info",
        "parts": [{"text": "Resuming: " + " ".join(cmd), "bold": False}],
        "m": "Resuming: " + " ".join(cmd),
    })
    return jsonify({"ok": True})


@app.route("/api/stop", methods=["POST"])
def api_stop():
    global _proc
    with _proc_lock:
        if _proc and _proc.poll() is None:
            _proc.terminate()
            try:
                _proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                _proc.kill()
        with _state_lock:
            _crawl_state["running"] = False
            _crawl_state["dataset"] = None
    return jsonify({"ok": True})


# ── API: log stream (SSE) ──────────────────────────────────────────────────
@app.route("/api/log/stream")
def api_log_stream():
    def generate():
        # Drain any backlog first (last 200 entries)
        backlog = []
        while True:
            try:
                backlog.append(_log_queue.get_nowait())
            except queue.Empty:
                break
        for entry in backlog[-200:]:
            yield f"data: {json.dumps(entry)}\n\n"

        # Then stream live
        while True:
            try:
                entry = _log_queue.get(timeout=25)
                yield f"data: {json.dumps(entry)}\n\n"
            except queue.Empty:
                yield "data: {\"ping\":1}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── API: stats ─────────────────────────────────────────────────────────────
@app.route("/api/stats")
def api_stats():
    return jsonify(_get_db_stats())


# ── API: files/tree ────────────────────────────────────────────────────────
@app.route("/api/files/tree")
def api_files_tree():
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")

    totals = {"all": 0, "conflicts": 0, "unmatched": 0, "errors": 0}
    conn = _open_db()
    if conn:
        try:
            c = conn.cursor()
            c.execute("SELECT COUNT(*) FROM files"); totals["all"] = c.fetchone()[0]
            c.execute("SELECT COUNT(*) FROM files WHERE status='conflict'");  totals["conflicts"] = c.fetchone()[0]
            c.execute("SELECT COUNT(*) FROM files WHERE status='unmatched'"); totals["unmatched"] = c.fetchone()[0]
            c.execute("SELECT COUNT(*) FROM files WHERE status='error'");     totals["errors"]    = c.fetchone()[0]
        except Exception:
            pass
        finally:
            conn.close()

    tree = []

    # Build tree from filesystem
    if dl_dir.exists():
        for entry in sorted(dl_dir.iterdir()):
            if not entry.is_dir():
                continue
            name = entry.name

            if name == "conflicts":
                pages = sorted(
                    (p.name for p in entry.iterdir() if p.is_dir() and p.name.startswith("page_")),
                    key=lambda x: int(x.split("_")[1]) if x.split("_")[1].isdigit() else 0
                )
                count = sum(
                    1 for p in entry.rglob("*.pdf")
                    if "_compare" not in p.name and "_visual_compare" not in p.name
                )
                tree.append({"label": name, "type": "conflicts", "count": count, "pages": pages})

            elif name == "unmatched":
                count = sum(1 for _ in entry.rglob("*.pdf"))
                tree.append({"label": name, "type": "unmatched", "count": count, "pages": []})

            elif name.startswith("part_"):
                pages = sorted(
                    (p.name for p in entry.iterdir() if p.is_dir() and p.name.startswith("page_")),
                    key=lambda x: int(x.split("_")[1]) if x.split("_")[1].isdigit() else 0
                )
                count = sum(1 for _ in entry.rglob("*.pdf"))
                tree.append({"label": name, "type": "part", "count": count, "pages": pages})

    return jsonify({"tree": tree, "totals": totals})


# ── API: files ─────────────────────────────────────────────────────────────
@app.route("/api/files")
def api_files():
    tab    = request.args.get("tab", "all")
    node   = request.args.get("node", "")      # e.g. "part_1" or "part_1/page_42"
    q      = request.args.get("q", "")
    limit  = min(int(request.args.get("limit", 500)), 2000)

    conn = _open_db()
    if conn:
        try:
            return jsonify({"files": _files_from_db(conn, tab, node, q, limit)})
        except Exception:
            conn.close()

    # Fallback: filesystem scan
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")
    return jsonify({"files": _files_from_fs(dl_dir, tab, node, q, limit)})


def _files_from_db(conn, tab, node, q, limit):
    c = conn.cursor()
    where, params = [], []

    if tab == "conflicts":
        where.append("status='conflict'")
    elif tab == "unmatched":
        where.append("status='unmatched'")
    elif tab == "errors":
        where.append("status='error'")

    # node can be "part_1", "part_1/page_42", "conflicts", "conflicts/page_42"
    if node:
        segments = node.split("/")
        folder = segments[0]
        page_seg = segments[1] if len(segments) >= 2 else None

        if folder == "conflicts":
            if "status='conflict'" not in where:
                where.append("status='conflict'")
        elif folder == "unmatched":
            if "status='unmatched'" not in where:
                where.append("status='unmatched'")
        elif folder.startswith("part_"):
            if page_seg and page_seg.startswith("page_"):
                # Filter by exact page folder in path OR page_num column
                pg_str = page_seg  # e.g. "page_0"
                pg_num = pg_str.split("_")[1] if "_" in pg_str else None
                # Use path LIKE for robustness (handles NULL page_num)
                path_clause = (
                    f"(path LIKE ? OR path LIKE ? OR page_num=?)"
                )
                sep = "/"
                where.append(path_clause)
                params += [
                    f"%/{folder}/{pg_str}/%",
                    f"%\\{folder}\\{pg_str}\\%",
                    int(pg_num) if pg_num and pg_num.isdigit() else -1,
                ]
            else:
                # Filter by part folder
                where.append("(path LIKE ? OR path LIKE ?)")
                params += [f"%/{folder}/%", f"%\\{folder}\\%"]

    if q:
        # Search filename, hash, and ISO date derived from Unix timestamp
        where.append("(filename LIKE ? OR hash LIKE ? OR date(updated_ts, 'unixepoch') LIKE ?)")
        params += [f"%{q}%", f"%{q}%", f"%{q}%"]

    where_sql = ("WHERE " + " AND ".join(where)) if where else ""
    params.append(limit)

    try:
        c.execute(
            f"SELECT filename, page_num, size, hash, status, path, updated_ts FROM files {where_sql} ORDER BY rowid DESC LIMIT ?",
            params,
        )
        rows = c.fetchall()
    except Exception:
        conn.close()
        return []
    finally:
        conn.close()

    result = []
    for r in rows:
        # Derive page_num from path if DB column is NULL
        page = r["page_num"]
        if page is None and r["path"]:
            m = re.search(r"[/\\]page_(\d+)[/\\]", r["path"])
            if m:
                page = int(m.group(1))
        result.append({
            "name":   r["filename"],
            "page":   page,
            "size":   _fmt_size(r["size"]) if r["size"] else "—",
            "hash":   r["hash"] or "",
            "status": r["status"] or "downloaded",
            "ts":     r["updated_ts"] or "",
        })
    return result


def _files_from_fs(dl_dir, tab, node, q, limit):
    search_root = dl_dir
    if node:
        candidate = dl_dir / node
        if candidate.is_dir():
            search_root = candidate

    files = []
    for f in search_root.rglob("*.pdf"):
        if "_compare" in f.name or "_visual_compare" in f.name:
            continue
        path_str = str(f)
        status = ("conflict" if "conflicts" in f.parts
                  else "unmatched" if "unmatched" in f.parts
                  else "downloaded")
        if tab == "conflicts" and status != "conflict": continue
        if tab == "unmatched" and status != "unmatched": continue
        if q and q.lower() not in f.name.lower(): continue

        page_num = None
        m = re.search(r"[/\\]page_(\d+)[/\\]", path_str)
        if m:
            page_num = int(m.group(1))

        files.append({
            "name": f.name, "page": page_num,
            "size": _fmt_size(f.stat().st_size), "hash": "",
            "status": status,
        })
        if len(files) >= limit:
            break
    return files


# ── API: conflicts ─────────────────────────────────────────────────────────
@app.route("/api/conflicts")
def api_conflicts():
    limit = int(request.args.get("limit", 100))
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")
    conflicts_dir = dl_dir / "conflicts"
    items = _scan_conflicts(conflicts_dir, limit)
    return jsonify({"items": items, "total": len(items)})


def _base_conflict_name(filename: str) -> str:
    """Strip __<hash> suffix inserted before the extension for duplicate conflicts.
    e.g. 'EFTA123__ab12cd34.pdf' -> 'EFTA123.pdf'"""
    import re as _re
    return _re.sub(r"__[0-9a-f]{6,}\.", ".", filename)


def _scan_conflicts(conflicts_dir: Path, limit: int) -> list:
    """Return one entry per unique base filename per page — the latest conflict file."""
    if not conflicts_dir.exists():
        return []

    # First pass: collect all conflict files grouped by (page, base_name)
    groups: dict = {}  # (page_num, base_name) -> list of (mtime, Path)
    for page_dir in sorted(conflicts_dir.iterdir()):
        if not page_dir.is_dir():
            continue
        page_num = page_dir.name.replace("page_", "")
        for f in page_dir.iterdir():
            if not f.name.lower().endswith(".pdf"):
                continue
            if "_compare" in f.name or "_visual_compare" in f.name:
                continue
            base = _base_conflict_name(f.name)
            key = (page_num, base)
            groups.setdefault(key, []).append((f.stat().st_mtime, f))

    # Second pass: pick latest conflict file per group, build result
    items = []
    now = datetime.now()
    for (page_num, base_name), versions in sorted(groups.items()):
        # Latest conflict file (highest mtime)
        versions.sort(key=lambda x: x[0])
        latest_mtime, latest_f = versions[-1]

        mtime = datetime.fromtimestamp(latest_mtime)
        age   = now - mtime
        if age.total_seconds() < 3600:
            when = f"{int(age.total_seconds() // 60)}m ago"
        elif age.days == 0:
            when = f"{int(age.total_seconds() // 3600)}h ago"
        else:
            when = mtime.strftime("%Y-%m-%d")

        # Compare/visual PDFs are named after the BASE name (without hash suffix)
        base_stem = Path(base_name).stem
        page_dir  = latest_f.parent
        items.append({
            "filename":      base_name,            # canonical name shown in UI
            "conflict_file": latest_f.name,        # actual latest file on disk
            "page":          page_num,
            "when":          when,
            "conflict_path": str(latest_f),
            "compare_pdf":   (page_dir / (base_stem + "_compare.pdf")).exists(),
            "visual_pdf":    (page_dir / (base_stem + "_visual_compare.pdf")).exists(),
            "versions":      len(versions),
        })
        if len(items) >= limit:
            break

    return items


@app.route("/api/conflicts/<filename>/diff")
def api_conflict_diff(filename):
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")
    conflicts_dir = dl_dir / "conflicts"

    conf_file = None
    # Search all page dirs; prefer exact name, fall back to latest __hash variant
    base = _base_conflict_name(filename)
    stem = Path(base).stem
    for page_dir in conflicts_dir.iterdir():
        if not page_dir.is_dir():
            continue
        exact = page_dir / filename
        if exact.exists():
            conf_file = exact
            break
        # Find latest hash-suffixed variant for this base name
        candidates = sorted(
            [f for f in page_dir.iterdir()
             if _base_conflict_name(f.name) == base and "_compare" not in f.name and "_visual_compare" not in f.name],
            key=lambda f: f.stat().st_mtime,
        )
        if candidates:
            conf_file = candidates[-1]
            break
    if not conf_file:
        return jsonify({"error": "Not found"}), 404

    result = {"hash_orig": None, "hash_conf": None,
               "lines_removed": 0, "lines_added": 0,
               "original_lines": [], "conflict_lines": []}

    compare_pdf = conf_file.parent / (conf_file.stem + "_compare.pdf")
    if compare_pdf.exists():
        try:
            import pypdf
            reader = pypdf.PdfReader(str(compare_pdf))
            text = "\n".join(p.extract_text() or "" for p in reader.pages)
            orig, conf = [], []
            for line in text.splitlines():
                if line.startswith("-") and not line.startswith("---"):
                    orig.append({"type": "del", "text": line[1:].strip()})
                    result["lines_removed"] += 1
                elif line.startswith("+") and not line.startswith("+++"):
                    conf.append({"type": "add", "text": line[1:].strip()})
                    result["lines_added"] += 1
                elif line.startswith(" "):
                    t = line[1:].strip()
                    orig.append({"type": "ctx", "text": t})
                    conf.append({"type": "ctx", "text": t})
            result["original_lines"] = orig[:100]
            result["conflict_lines"] = conf[:100]
        except Exception:
            pass

    try:
        import hashlib
        result["hash_conf"] = hashlib.sha256(conf_file.read_bytes()).hexdigest()
    except Exception:
        pass

    return jsonify(result)


@app.route("/api/conflicts/<filename>/compare-pdf")
def api_conflict_compare_pdf(filename):
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")
    stem = Path(filename).stem
    for page_dir in (dl_dir / "conflicts").iterdir():
        candidate = page_dir / (stem + "_compare.pdf")
        if candidate.exists():
            return send_from_directory(str(candidate.parent), candidate.name)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/conflicts/<filename>/visual-pdf")
def api_conflict_visual_pdf(filename):
    settings = _load_settings()
    dl_dir = BASE_DIR / settings.get("download_dir", "downloads")
    stem = Path(filename).stem
    for page_dir in (dl_dir / "conflicts").iterdir():
        candidate = page_dir / (stem + "_visual_compare.pdf")
        if candidate.exists():
            return send_from_directory(str(candidate.parent), candidate.name)
    return jsonify({"error": "Not found"}), 404


# ── API: rescan ────────────────────────────────────────────────────────────
@app.route("/api/files/reveal", methods=["POST"])
def api_files_reveal():
    """Open Explorer with the file selected (Windows: explorer /select,<path>)."""
    data = request.get_json(silent=True) or {}
    filename = data.get("filename", "").strip()
    if not filename:
        return jsonify({"error": "No filename provided"}), 400
    # Look up the path in the DB first
    db_path = _db_path()
    filepath = None
    if db_path.exists():
        conn = sqlite3.connect(str(db_path))
        conn.row_factory = sqlite3.Row
        try:
            row = conn.execute("SELECT path FROM files WHERE filename=? LIMIT 1", (filename,)).fetchone()
            if row and row["path"]:
                filepath = Path(row["path"])
        finally:
            conn.close()
    # Fall back to filesystem search
    if not filepath or not filepath.exists():
        dl = _dl_dir()
        found = list(dl.rglob(filename))
        if found:
            filepath = found[0]
    if not filepath or not filepath.exists():
        return jsonify({"error": f"File not found: {filename}"}), 404
    try:
        subprocess.Popen(["explorer", "/select,", str(filepath)])
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/files/open", methods=["POST"])
def api_files_open():
    """Open a file with its default application."""
    data = request.get_json(silent=True) or {}
    filename = data.get("filename", "").strip()
    if not filename:
        return jsonify({"error": "No filename provided"}), 400
    db_path = _db_path()
    filepath = None
    if db_path.exists():
        conn = sqlite3.connect(str(db_path))
        conn.row_factory = sqlite3.Row
        try:
            row = conn.execute("SELECT path FROM files WHERE filename=? LIMIT 1", (filename,)).fetchone()
            if row and row["path"]:
                filepath = Path(row["path"])
        finally:
            conn.close()
    if not filepath or not filepath.exists():
        dl = _dl_dir()
        found = list(dl.rglob(filename))
        if found:
            filepath = found[0]
    if not filepath or not filepath.exists():
        return jsonify({"error": f"File not found: {filename}"}), 404
    try:
        os.startfile(str(filepath))
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/rescan", methods=["POST"])
def api_rescan():
    global _proc
    with _proc_lock:
        if _proc and _proc.poll() is None:
            return jsonify({"ok": False, "error": "Cannot rescan while a crawl is running."}), 409
    try:
        result = subprocess.run(
            [sys.executable, "-u", str(DOWNLOAD_SCRIPT), "--rescan"],
            capture_output=True, text=True, timeout=300, cwd=str(BASE_DIR),
            env={**os.environ, "PYTHONUNBUFFERED": "1"},
        )
        msg = (result.stdout or result.stderr or "").strip()[-300:]
        return jsonify({"ok": True, "message": f"Rescan complete. {msg}"})
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "Rescan timed out."}), 500
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ── Entry point ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 15000))
    print(f"\n  EFTA-DL Console  ->  http://localhost:{port}\n")
    app.run(host="0.0.0.0", port=port, threaded=True, debug=False)
