/* Files — folder tree + sortable, resizable file table */
(function () {
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const TREE_W_KEY         = "efta-files-tree-w";
const TREE_COLLAPSED_KEY = "efta-files-tree-collapsed";
const TREE_DEFAULT_W     = 220;
const TREE_MIN_W         = 44;

const CSS = `
.fb { display: grid; grid-template-columns: var(--fb-tree-w, 220px) 1fr; height: 100%; }
/* ── tree ── */
.fb__tree { border-right: 1px solid var(--border-default); background: var(--bg-sunken);
  position: relative; overflow: hidden; min-width: 0; display: flex; flex-direction: column; }
.fb__tree__inner { padding: 0 8px 10px; overflow: auto; flex: 1; }
.fb__tree__drag { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; z-index: 10; }
.fb__tree__drag:hover, .fb__tree__drag--active { background: var(--accent); opacity: .4; }
/* collapsed tree — header only, everything else hidden */
.fb__tree--collapsed .fb__tree__inner { display: none; }
.fb__tree--collapsed .fb__tree__drag  { display: none; }
.fb__tree--collapsed { min-width: ${TREE_MIN_W}px; max-width: ${TREE_MIN_W}px; overflow: hidden; }
.fb__tree--collapsed .fb__tree__header { border-bottom: none; justify-content: center; padding: 13px 0; }
.fb__tree__header { display: flex; align-items: center; gap: 8px; padding: 13px 12px;
  border-bottom: 1px solid var(--border-default); cursor: pointer; user-select: none; flex-shrink: 0; }
.fb__tree__header:hover { background: var(--bg-hover); }
.fb__tree__header__label { flex: 1; font-weight: 600; font-size: 13px; overflow: hidden; white-space: nowrap; }
.fb__tree__header__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin-left: 8px; }
.fb__tree__header__arrow { color: var(--text-disabled); display: flex; align-items: center; flex-shrink: 0;
  transition: transform 110ms; }
.fb__tree--collapsed .fb__tree__header__arrow { transform: rotate(-90deg); }
.fb__sec { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-disabled); padding: 8px 2px 4px; }
/* date cell hover — clickable */
.fb__date { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); font-variant-numeric: tabular-nums;
  white-space: nowrap; cursor: pointer; }
.fb__date:hover { color: var(--accent); text-decoration: underline; }

.fb__node { display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: var(--radius-sm);
  cursor: pointer; font-size: 13px; color: var(--text-secondary); width: 100%; }
.fb__node:hover { background: var(--bg-hover); color: var(--text-primary); }
.fb__node--on { background: var(--accent-tint); color: var(--accent); }
.fb__node--on svg { color: var(--accent); }
.fb__node__label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fb__node__c { margin-left: auto; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); flex-shrink: 0; }
.fb__node--on .fb__node__c { color: var(--accent); }
.fb__node__arrow { flex: none; color: var(--text-disabled); display: flex; align-items: center;
  transition: transform 110ms var(--ease-out); }
.fb__node__arrow--open { transform: rotate(90deg); }

.fb__page { display: flex; align-items: center; gap: 6px; padding: 4px 8px 4px 28px; border-radius: var(--radius-sm);
  cursor: pointer; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.fb__page:hover { background: var(--bg-hover); color: var(--text-primary); }
.fb__page--on { color: var(--accent); }

/* ── main panel ── */
.fb__main { display: flex; flex-direction: column; min-width: 0; }
.fb__bar { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid var(--border-default); flex-wrap: wrap; }
.fb__tablewrap { overflow: auto; flex: 1; }

/* ── resizable table ── */
.fb__table { border-collapse: collapse; table-layout: fixed; }
.fb__table thead th {
  position: sticky; top: 0; background: var(--bg-app); z-index: 1;
  text-align: left; padding: 9px 14px;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--text-faint); font-weight: 500; border-bottom: 1px solid var(--border-default);
  user-select: none; white-space: nowrap; overflow: hidden;
  position: relative;
}
.fb__table thead th .col-label { cursor: pointer; display: inline-block; }
.fb__table thead th .col-label:hover { color: var(--text-secondary); }
.fb__table thead th.sort-active .col-label { color: var(--accent); }
/* drag handle */
.col-resizer {
  position: absolute; right: 0; top: 0; bottom: 0; width: 6px;
  cursor: col-resize; z-index: 2;
}
.col-resizer:hover, .col-resizer--dragging { background: var(--accent); opacity: .5; }
.fb__table tbody td { padding: 8px 14px; border-bottom: 1px solid var(--border-faint); font-size: 13px; overflow: hidden; }
.fb__table tbody tr:hover { background: var(--bg-hover); }
.fb__fn { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 9px; }
.fb__fn__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fb__fn__name:hover { color: var(--accent); cursor: pointer; text-decoration: underline; }
.fb__mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.fb__actions { display: flex; gap: 4px; opacity: 0; transition: opacity 110ms; }
.fb__table tbody tr:hover .fb__actions { opacity: 1; }
.fb__empty { padding: 40px; text-align: center; color: var(--text-disabled); font-family: var(--font-mono); font-size: 13px; }
`;
// Replace stale style if present so CSS changes take effect on reload
const _old = document.getElementById("efta-fb2-css");
if (_old) _old.remove();
const _s = document.createElement("style"); _s.id = "efta-fb2-css"; _s.textContent = CSS; document.head.appendChild(_s);

/* ── Tree node ── */
function TreeNode({ item, selectedNode, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const isActive = selectedNode === item.label;
  const hasPages = item.pages && item.pages.length > 0;

  const iconEl = item.type === "conflicts"
    ? <IC.Compare size={15} style={{color: isActive ? "var(--accent)" : "var(--state-conflict)", flexShrink:0}} />
    : item.type === "unmatched"
    ? <IC.Alert size={15} style={{color: isActive ? "var(--accent)" : "var(--state-unmatched)", flexShrink:0}} />
    : <IC.FolderOpen size={15} style={{flexShrink:0}} />;

  const toggleOpen = (e) => { e.stopPropagation(); setOpen(o => !o); };
  const handleClick = () => { onSelect(isActive && !hasPages ? "" : item.label); if (hasPages) setOpen(o => !o); };

  return (
    <div>
      <div className={"fb__node" + (isActive ? " fb__node--on" : "")} onClick={handleClick}>
        {hasPages
          ? <span className={"fb__node__arrow" + (open ? " fb__node__arrow--open" : "")} onClick={toggleOpen}>
              <IC.ChevronRight size={13} />
            </span>
          : <span style={{width:13, flexShrink:0}} />
        }
        {iconEl}
        <span className="fb__node__label">{item.label}</span>
        <span className="fb__node__c">{item.count != null ? item.count.toLocaleString() : ""}</span>
      </div>

      {open && hasPages && item.pages.map(pageName => {
        const nodeKey = item.label + "/" + pageName;
        const active = selectedNode === nodeKey;
        return (
          <div key={pageName}
            className={"fb__page" + (active ? " fb__page--on" : "")}
            onClick={() => onSelect(active ? item.label : nodeKey)}>
            <IC.FileText size={12} style={{flexShrink:0}} />
            {pageName}
          </div>
        );
      })}
    </div>
  );
}

/* ── Sort helpers ── */
function parseSize(s) {
  if (!s || s === "—") return -1;
  const m = s.match(/([\d.]+)\s*(TB|GB|MB|KB|B)?/i);
  if (!m) return -1;
  const n = parseFloat(m[1]);
  const mult = {B:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776};
  return n * (mult[(m[2]||"B").toUpperCase()] || 1);
}

function sortFiles(files, col, dir) {
  if (!col) return files;
  return [...files].sort((a, b) => {
    let av, bv;
    if (col === "page") {
      av = a.page ?? -1; bv = b.page ?? -1;
      return dir === "asc" ? av - bv : bv - av;
    }
    if (col === "size") {
      av = parseSize(a.size); bv = parseSize(b.size);
      return dir === "asc" ? av - bv : bv - av;
    }
    if (col === "ts") {
      // ts is a Unix timestamp number; compare numerically
      av = Number(a.ts) || 0; bv = Number(b.ts) || 0;
      return dir === "asc" ? av - bv : bv - av;
    }
    av = (a[col] || "").toLowerCase(); bv = (b[col] || "").toLowerCase();
    return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });
}

/* ── Format timestamp ── */
function fmtTs(ts) {
  if (!ts) return "—";
  try {
    // Handle Unix epoch (integer or numeric string)
    const num = Number(ts);
    const d = !isNaN(num) && num > 1e8
      ? new Date(num * 1000)           // seconds → ms
      : new Date(String(ts).replace(" ", "T"));
    if (isNaN(d)) return String(ts);
    return d.toLocaleString([], {
      month:"2-digit", day:"2-digit", year:"2-digit",
      hour:"2-digit", minute:"2-digit",
    });
  } catch { return String(ts); }
}

/* ── Resizable column header ── */
function ResizableTh({ label, col, sortCol, sortDir, onSort, width, onResize, isLast }) {
  const active = sortCol === col;
  const arrow = active ? (sortDir === "asc" ? " ↑" : " ↓") : "";
  const dragRef = React.useRef(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = width;
    const handle = dragRef.current;
    if (handle) handle.classList.add("col-resizer--dragging");

    const onMove = (ev) => onResize(Math.max(50, startW + ev.clientX - startX));
    const onUp   = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (handle) handle.classList.remove("col-resizer--dragging");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <th className={active ? "sort-active" : ""} style={{width, minWidth:50, position:"relative"}}>
      <span className="col-label" onClick={() => onSort(col)}>{label}{arrow}</span>
      {!isLast && <div className="col-resizer" ref={dragRef} onMouseDown={onMouseDown} />}
    </th>
  );
}

/* ── File action buttons ── */
function FileActions({ file }) {
  const act = (endpoint) =>
    fetch(endpoint, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({filename: file.name})})
      .then(r => r.json()).then(d => { if (d.error) alert(d.error); }).catch(e => alert(e.message));
  return (
    <span className="fb__actions">
      <DS.IconButton size="sm" title="Reveal in Explorer" aria-label="Reveal in Explorer"
        onClick={(e) => { e.stopPropagation(); act("/api/files/reveal"); }}>
        <IC.FolderOpen size={14} />
      </DS.IconButton>
      <DS.IconButton size="sm" title="Open file" aria-label="Open file"
        onClick={(e) => { e.stopPropagation(); act("/api/files/open"); }}>
        <IC.External size={14} />
      </DS.IconButton>
    </span>
  );
}

/* ── Column definitions ── */
// Widths chosen to fit typical content without truncation at default size
const DEFAULT_COLS = [
  {col:"name",   label:"Filename", width:320},
  {col:"page",   label:"Page",     width:60},
  {col:"size",   label:"Size",     width:95},
  {col:"hash",   label:"SHA-256",  width:290},  // full 64-char hash
  {col:"ts",     label:"Date",     width:145},
  {col:"status", label:"Status",   width:135},  // fits "● DOWNLOADED" / "● CONFLICT"
  {col:"_act",   label:"",         width:72},
];
const COL_WIDTHS_KEY = "efta-col-widths-v1";

/* ── Main component ── */
function Files() {
  const [tab, setTab]               = React.useState("all");
  const [tree, setTree]             = React.useState([]);
  const [selectedNode, setSelectedNode] = React.useState("");
  const [files, setFiles]           = React.useState([]);
  const [loading, setLoading]       = React.useState(false);
  const [query, setQuery]           = React.useState("");
  const [totals, setTotals]         = React.useState({all:0, conflicts:0, unmatched:0, errors:0});
  const [sortCol, setSortCol]       = React.useState("");
  const [sortDir, setSortDir]       = React.useState("asc");
  const [treeCollapsed, setTreeCollapsed] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(TREE_COLLAPSED_KEY)) === true; } catch { return false; }
  });
  const [treeW, setTreeW]           = React.useState(() => {
    try { return parseInt(localStorage.getItem(TREE_W_KEY)) || TREE_DEFAULT_W; } catch { return TREE_DEFAULT_W; }
  });
  const treeDragRef = React.useRef(null);
  const [colWidths, setColWidths]   = React.useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(COL_WIDTHS_KEY) || "{}");
      return Object.fromEntries(DEFAULT_COLS.map(c => [c.col, stored[c.col] || c.width]));
    } catch {
      return Object.fromEntries(DEFAULT_COLS.map(c => [c.col, c.width]));
    }
  });

  React.useEffect(() => {
    fetch("/api/files/tree").then(r => r.json()).then(d => {
      setTree(d.tree || []);
      setTotals(d.totals || {});
    }).catch(() => {});
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ tab, limit: "500" });
    if (selectedNode) params.set("node", selectedNode);
    if (query)        params.set("q", query);
    fetch("/api/files?" + params)
      .then(r => r.json())
      .then(d => setFiles(d.files || []))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, [tab, selectedNode, query]);

  // Keep CSS variable in sync for grid column
  React.useLayoutEffect(() => {
    const w = treeCollapsed ? TREE_MIN_W : treeW;
    document.documentElement.style.setProperty("--fb-tree-w", w + "px");
  }, [treeCollapsed, treeW]);

  const toggleTree = () => setTreeCollapsed(prev => {
    const next = !prev;
    try { localStorage.setItem(TREE_COLLAPSED_KEY, JSON.stringify(next)); } catch {}
    return next;
  });

  const startTreeDrag = (e) => {
    if (treeCollapsed) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW = treeW;
    const handle = treeDragRef.current;
    if (handle) handle.classList.add("fb__tree__drag--active");
    const onMove = (ev) => {
      const w = Math.max(120, Math.min(500, startW + ev.clientX - startX));
      setTreeW(w);
      document.documentElement.style.setProperty("--fb-tree-w", w + "px");
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (handle) handle.classList.remove("fb__tree__drag--active");
      setTreeW(prev => {
        try { localStorage.setItem(TREE_W_KEY, String(prev)); } catch {}
        return prev;
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleSort = (col) => {
    if (col === "_act") return;
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const handleResize = (col, w) => setColWidths(prev => {
    const next = {...prev, [col]: w};
    try { localStorage.setItem(COL_WIDTHS_KEY, JSON.stringify(next)); } catch {}
    return next;
  });

  // Click on filename: extract EFTA ID, reset to all files, apply filter
  const handleFileClick = (filename) => {
    const m = filename.match(/EFTA\d+/i);
    if (m) { setSelectedNode(""); setQuery(m[0]); }
  };

  // Click on date: apply ISO date (YYYY-MM-DD) as filter, reset folder
  const handleDateClick = (ts) => {
    if (!ts) return;
    const num = Number(ts);
    const d = (!isNaN(num) && num > 1e8)
      ? new Date(num * 1000)
      : new Date(String(ts).replace(" ", "T"));
    if (isNaN(d)) return;
    const iso = d.toISOString().slice(0, 10); // "2026-06-23"
    setSelectedNode("");
    setQuery(iso);
  };

  const handleRescan = () => {
    if (!window.confirm("Rescan will rebuild the SQLite index from files on disk. Continue?")) return;
    fetch("/api/rescan", {method:"POST"}).then(r => r.json()).then(d => {
      alert(d.message || "Rescan complete.");
      fetch("/api/files/tree").then(r => r.json()).then(d => { setTree(d.tree || []); setTotals(d.totals || {}); });
    });
  };

  const displayed = sortFiles(files, sortCol, sortDir);
  const tableWidth = DEFAULT_COLS.reduce((s, c) => s + (colWidths[c.col] || c.width), 0);

  return (
    <div className="fb">
      <aside className={"fb__tree" + (treeCollapsed ? " fb__tree--collapsed" : "")}>
        {/* Header — click to toggle, matches Conflicts visual style */}
        <div className="fb__tree__header" onClick={toggleTree} title={treeCollapsed ? "Expand panel" : "Collapse panel"}>
          <IC.Files size={16} style={{color:"var(--accent)", flexShrink:0}} />
          {!treeCollapsed && (
            <span className="fb__tree__header__label">
              Files
              {totals.all > 0 && <span className="fb__tree__header__count">{totals.all.toLocaleString()}</span>}
            </span>
          )}
          <span className="fb__tree__header__arrow"><IC.ChevronDown size={13} /></span>
        </div>

        {/* Scrollable content */}
        <div className="fb__tree__inner">
          <div className={"fb__node" + (!selectedNode ? " fb__node--on" : "")}
            onClick={() => setSelectedNode("")}>
            <span style={{width:13, flexShrink:0}} />
            <IC.Files size={15} style={{flexShrink:0}} />
            <span className="fb__node__label">All files</span>
            <span className="fb__node__c">{(totals.all||0).toLocaleString()}</span>
          </div>
          {tree.length === 0 && (
            <div style={{padding:"8px 2px", color:"var(--text-disabled)", fontFamily:"var(--font-mono)", fontSize:12}}>
              No downloads yet.
            </div>
          )}
          {tree.map(item => (
            <TreeNode key={item.label} item={item} selectedNode={selectedNode} onSelect={setSelectedNode} />
          ))}
        </div>

        {/* Drag handle */}
        {!treeCollapsed && <div className="fb__tree__drag" ref={treeDragRef} onMouseDown={startTreeDrag} />}
      </aside>

      <section className="fb__main">
        <div className="fb__bar">
          <DS.Tabs value={tab} onChange={t => { setTab(t); setSelectedNode(""); }} items={[
            {id:"all",       label:"All",      count:(totals.all||0).toLocaleString()},
            {id:"conflicts", label:"Conflicts", count:totals.conflicts||0},
            {id:"unmatched", label:"Unmatched", count:totals.unmatched||0},
            {id:"errors",    label:"Errors",    count:totals.errors||0},
          ]} />
          <div style={{flex:1}} />
          <DS.TextField prefix={<IC.Search size={15} />} placeholder="Filter filenames…"
            mono style={{width:200}} value={query} onChange={e => setQuery(e.target.value)} />
          {query && (
            <DS.IconButton size="sm" title="Clear filter" aria-label="Clear filter"
              onClick={() => setQuery("")}>
              <IC.X size={15} />
            </DS.IconButton>
          )}
          <DS.Button variant="secondary" size="sm" iconLeft={<IC.Refresh size={15} />} onClick={handleRescan}>Rescan</DS.Button>
        </div>

        <div style={{
          padding:"9px 18px", borderBottom:"1px solid var(--border-faint)",
          fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text-faint)",
          display:"flex", alignItems:"center", gap:8,
        }}>
          <IC.FolderOpen size={14} />
          {selectedNode || "downloads/"}
          <span style={{color:"var(--text-disabled)"}}>· {displayed.length} files</span>
          {loading && <span style={{color:"var(--accent)"}}>loading…</span>}
        </div>

        <div className="fb__tablewrap">
          {!loading && displayed.length === 0 && <div className="fb__empty">No files to display.</div>}
          {displayed.length > 0 && (
            <table className="fb__table" style={{width: tableWidth}}>
              <colgroup>
                {DEFAULT_COLS.map(c => <col key={c.col} style={{width: colWidths[c.col] || c.width}} />)}
              </colgroup>
              <thead>
                <tr>
                  {DEFAULT_COLS.map((c, i) => (
                    <ResizableTh key={c.col}
                      label={c.label} col={c.col}
                      sortCol={sortCol} sortDir={sortDir} onSort={handleSort}
                      width={colWidths[c.col] || c.width}
                      onResize={(w) => handleResize(c.col, w)}
                      isLast={i === DEFAULT_COLS.length - 1}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((f, i) => (
                  <tr key={f.name + i}>
                    <td>
                      <span className="fb__fn">
                        <IC.FileText size={15} style={{color:"var(--text-faint)", flexShrink:0}} />
                        <span className="fb__fn__name" title={f.name} onClick={() => handleFileClick(f.name)}>{f.name}</span>
                      </span>
                    </td>
                    <td className="fb__mono">{f.page != null ? f.page.toLocaleString() : "—"}</td>
                    <td className="fb__mono">{f.size || "—"}</td>
                    <td className="fb__mono" title={f.hash}>{f.hash || "—"}</td>
                    <td className="fb__date" title="Click to filter by date" onClick={() => handleDateClick(f.ts)}>{fmtTs(f.ts)}</td>
                    <td><DS.StatusBadge status={f.status} /></td>
                    <td><FileActions file={f} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
window.EFTAFiles = Files;
})();
