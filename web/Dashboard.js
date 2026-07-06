/* Dashboard — active crawl monitor */
(function () {
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const CSS = `
.dash { padding: 20px; display: flex; flex-direction: column; gap: 16px; max-width: 1320px; }
.dash__stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--border-default);
  border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden; }
.dash__stat { background: var(--bg-panel); padding: 15px 18px; }
/* normal 2-col grid */
.dash__grid { display: grid; grid-template-columns: 1fr 360px; gap: 16px; align-items: start; }
/* expanded: console spans full width, sidebar moves below */
.dash__grid--expanded { display: flex; flex-direction: column; gap: 16px; }
.dash__console { background: var(--bg-sunken); border-radius: var(--radius-md); padding: 8px 4px; height: 380px; overflow: auto; }
.dash__console--expanded { height: calc(100vh - 340px); min-height: 300px; }
.dash__side { display: flex; flex-direction: column; gap: 16px; }
.dash__side--expanded { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.dash__conflict { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-sm); cursor: pointer; }
.dash__conflict:hover { background: var(--bg-hover); }
.dash__conflict__nm { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); }
.dash__conflict__meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.dash__strat { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.dash__strat:not(:last-child) { border-bottom: 1px solid var(--border-faint); }
.dash__strat__ic { width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--bg-raised); display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex: none; }
.dash__strat__t { font-size: 13px; color: var(--text-primary); font-weight: 500; }
.dash__strat__d { font-size: 11px; color: var(--text-faint); }
.dash__empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 200px; color: var(--text-faint); font-family: var(--font-mono); font-size: 13px; }
`;
const _old = document.getElementById("efta-dash-css");
if (_old) _old.remove();
const _s = document.createElement("style"); _s.id = "efta-dash-css"; _s.textContent = CSS; document.head.appendChild(_s);

const LEVEL_STYLE = {
  success: { color: "var(--state-downloaded)" },
  skip:    { color: "var(--text-disabled)" },
  conflict:{ color: "var(--state-conflict)" },
  warn:    { color: "var(--orange-500)" },
  error:   { color: "var(--state-error)" },
  fetch:   { color: "var(--state-info)" },
  info:    { color: "var(--text-muted)" },
};

const LEVEL_MARK = {
  success: "✓", skip: "⏭", conflict: "Δ", warn: "⚠", error: "✗", fetch: "→", info: "·",
};

function LogLine({ line }) {
  const st = LEVEL_STYLE[line.level] || { color: "var(--text-muted)" };
  const mark = LEVEL_MARK[line.level] || "·";
  return (
    <div style={{ display: "flex", gap: 10, padding: "3px 12px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6 }}>
      <span style={{ color: "var(--text-disabled)", flexShrink: 0, width: 56 }}>{line.t}</span>
      <span style={{ ...st, width: 14, flexShrink: 0 }}>{mark}</span>
      <span style={{ color: "var(--text-secondary)", wordBreak: "break-all" }}>
        {line.parts ? line.parts.map((p, i) =>
          p.bold ? <b key={i} style={{ color: "var(--text-primary)" }}>{p.text}</b> : p.text
        ) : line.m}
      </span>
    </div>
  );
}

// Singleton SSE connection shared across mounts
let _sharedES = null;
const _logListeners = new Set();

function _ensureSSE() {
  if (_sharedES && _sharedES.readyState !== EventSource.CLOSED) return;
  _sharedES = new EventSource("/api/log/stream");
  _sharedES.onmessage = (e) => {
    try {
      const line = JSON.parse(e.data);
      if (line.ping) return;
      _logListeners.forEach(fn => fn(line));
    } catch {}
  };
  _sharedES.onerror = () => {
    // reconnect after 3s
    setTimeout(_ensureSSE, 3000);
  };
}

function LogStream({ minimized, expanded }) {
  const ref = React.useRef(null);
  const [lines, setLines] = React.useState([]);

  React.useEffect(() => {
    _ensureSSE();
    const handler = (line) => {
      setLines(prev => {
        const next = [...prev, line];
        return next.length > 1000 ? next.slice(-1000) : next;
      });
    };
    _logListeners.add(handler);
    return () => _logListeners.delete(handler);
  }, []);

  // Auto-scroll when new lines arrive, but only if already at bottom
  React.useEffect(() => {
    if (!ref.current || minimized) return;
    const el = ref.current;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (atBottom) el.scrollTop = el.scrollHeight;
  }, [lines.length, minimized]);

  if (minimized) return null;

  return (
    <div className={"dash__console" + (expanded ? " dash__console--expanded" : "")} ref={ref}>
      {lines.length === 0 && (
        <div style={{ padding: "20px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-disabled)" }}>
          Waiting for crawl output…
        </div>
      )}
      {lines.map((l, idx) => <LogLine key={idx} line={l} />)}
    </div>
  );
}

function Dashboard({ status, setStatus, go }) {
  const [stats, setStats] = React.useState({ downloaded: 0, duplicates: 0, conflicts: 0, unmatched: 0, throughput: null });
  const [conflicts, setConflicts] = React.useState([]);
  const [logMinimized, setLogMinimized] = React.useState(false);
  const [logExpanded, setLogExpanded] = React.useState(false);

  React.useEffect(() => {
    const load = () => {
      fetch("/api/stats").then(r => r.json()).then(setStats).catch(() => {});
      fetch("/api/conflicts?limit=4").then(r => r.json()).then(d => setConflicts(d.items || [])).catch(() => {});
    };
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  const fmt = n => n != null ? n.toLocaleString() : "0";
  const running = status.running;

  const handleStop = () => {
    if (!window.confirm("Stop the crawl? Current page state will be saved.")) return;
    fetch("/api/stop", { method: "POST" }).then(() => setStatus(s => ({ ...s, running: false })));
  };
  const handlePause = () => fetch("/api/pause", { method: "POST" }).then(() => setStatus(s => ({ ...s, running: false })));
  const handleResume = () => fetch("/api/resume", { method: "POST" }).then(r => r.json()).then(d => setStatus(s => ({ ...s, running: true })));

  const maxPages = status.max_pages || (status.page ? Math.ceil(status.page * 1.2) : 11000);

  return (
    <div className="dash">
      <div className="dash__stats">
        <div className="dash__stat"><DS.Stat label="Downloaded" value={fmt(stats.downloaded)} unit="files" tone="downloaded" /></div>
        <div className="dash__stat"><DS.Stat label="Duplicates" value={fmt(stats.duplicates)} unit="skipped" tone="default" /></div>
        <div className="dash__stat"><DS.Stat label="Conflicts" value={fmt(stats.conflicts)} tone="conflict" foot={stats.conflicts > 0 ? "needs review" : ""} /></div>
        <div className="dash__stat"><DS.Stat label="Unmatched" value={fmt(stats.unmatched)} tone="unmatched" /></div>
        <div className="dash__stat"><DS.Stat label="Throughput" value={stats.throughput || "—"} unit={stats.throughput ? "MB/s" : ""} tone="accent" /></div>
      </div>

      {status.dataset && (
        <DS.Card flush>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <DS.ProgressBar value={status.page || 0} max={maxPages} striped={running} glow={running}
              label={<span style={{ display: "flex", alignItems: "center", gap: 8 }}><IC.Layers size={15} /> Dataset {status.dataset} — crawl progress</span>}
              showValue valueText={`page ${(status.page || 0).toLocaleString()} / ~${maxPages.toLocaleString()}`} />
            <div style={{ display: "flex", gap: 24, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>
              {status.elapsed && <span>elapsed&nbsp; <b style={{ color: "var(--text-secondary)" }}>{status.elapsed}</b></span>}
              {status.eta    && <span>eta&nbsp; <b style={{ color: "var(--text-secondary)" }}>{status.eta}</b></span>}
              {status.part   && <span>part&nbsp; <b style={{ color: "var(--text-secondary)" }}>{status.part}</b></span>}
              <span>retries&nbsp; <b style={{ color: "var(--text-secondary)" }}>{status.retries || 0}</b></span>
            </div>
          </div>
        </DS.Card>
      )}

      {!status.dataset && (
        <div className="dash__empty">
          <IC.Download size={32} style={{ color: "var(--text-disabled)" }} />
          <span>No active crawl. Start one from <b style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => go("new")}>New download</b>.</span>
        </div>
      )}

      <div className={logExpanded ? "dash__grid--expanded" : "dash__grid"}>
        <DS.Card flush eyebrow="Live log" title="Crawl output"
          actions={<>
            <DS.StatusBadge status={running ? "active" : "queued"} pulse={running} label={running ? "streaming" : "paused"} />
            {/* Expand / collapse vertically */}
            {!logMinimized && (
              <DS.IconButton aria-label={logExpanded ? "Collapse log" : "Expand log height"}
                title={logExpanded ? "Collapse log" : "Expand log to fill height"}
                onClick={() => setLogExpanded(e => !e)}>
                {logExpanded
                  ? <IC.ChevronRight size={16} style={{transform:"rotate(90deg)"}} />
                  : <IC.ChevronDown size={16} />}
              </DS.IconButton>
            )}
            {/* Minimize / restore */}
            <DS.IconButton aria-label={logMinimized ? "Show log" : "Hide log"} title={logMinimized ? "Show log" : "Hide log"}
              onClick={() => { setLogMinimized(m => !m); if (!logMinimized) setLogExpanded(false); }}>
              {logMinimized
                ? <IC.ChevronDown size={16} />
                : <IC.ChevronRight size={16} style={{transform:"rotate(-90deg)"}} />}
            </DS.IconButton>
          </>}>
          <LogStream minimized={logMinimized} expanded={logExpanded} />
        </DS.Card>

        <div className={logExpanded ? "dash__side--expanded" : "dash__side"}>
          <DS.Card eyebrow="Fetch strategy" title="Connection">
            <div>
              <div className="dash__strat">
                <div className="dash__strat__ic" style={{ color: status.use_httpx !== false ? "var(--state-downloaded)" : "var(--text-disabled)" }}><IC.Server size={16} /></div>
                <div style={{ flex: 1 }}><div className="dash__strat__t">httpx · HTTP/2</div><div className="dash__strat__d">primary</div></div>
                <DS.StatusBadge status={status.use_httpx !== false ? "downloaded" : "error"} label={status.use_httpx !== false ? "on" : "off"} dot />
              </div>
              <div className="dash__strat">
                <div className="dash__strat__ic"><IC.Shield size={16} /></div>
                <div style={{ flex: 1 }}><div className="dash__strat__t">Playwright</div><div className="dash__strat__d">fallback on 403</div></div>
                <DS.Badge variant="outline">{status.use_playwright ? "on" : "standby"}</DS.Badge>
              </div>
              <div className="dash__strat">
                <div className="dash__strat__ic"><IC.Wifi size={16} /></div>
                <div style={{ flex: 1 }}><div className="dash__strat__t">requests</div><div className="dash__strat__d">last-resort</div></div>
                <DS.Badge variant="outline">standby</DS.Badge>
              </div>
            </div>
          </DS.Card>

          <DS.Card flush eyebrow="Needs review" title="Recent conflicts"
            actions={<DS.Button variant="ghost" size="sm" onClick={() => go("conflicts")} iconRight={<IC.ChevronRight size={14} />}>
              {stats.conflicts > 0 ? `All ${stats.conflicts}` : "None"}
            </DS.Button>}>
            <div style={{ padding: 6 }}>
              {conflicts.length === 0 && (
                <div style={{ padding: "12px 10px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-disabled)" }}>No conflicts detected.</div>
              )}
              {conflicts.map((c, i) => (
                <div className="dash__conflict" key={i} onClick={() => go("conflicts")}>
                  <IC.Compare size={15} style={{ color: "var(--state-conflict)", flex: "none" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="dash__conflict__nm">{c.filename}</div>
                    <div className="dash__conflict__meta">page {c.page} · {c.when || ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </DS.Card>

          <div style={{ display: "flex", gap: 8 }}>
            {running
              ? <DS.Button variant="secondary" fullWidth iconLeft={<IC.Pause size={16} />} onClick={handlePause}>Pause</DS.Button>
              : <DS.Button variant="primary" fullWidth iconLeft={<IC.Play size={16} />} onClick={handleResume} disabled={!status.dataset}>
                  {status.dataset ? "Resume crawl" : "No active crawl"}
                </DS.Button>}
            {/* Stop is always available when a dataset is loaded — same as Pause but clears state */}
            <DS.Button variant="danger" iconLeft={<IC.Stop size={16} />} onClick={handleStop} disabled={!status.dataset}>Stop</DS.Button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.EFTADashboard = Dashboard;
})();
