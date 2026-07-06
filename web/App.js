/* EFTA-DL console — app shell */
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const SIDEBAR_W_KEY  = "efta-sidebar-w";
const SIDEBAR_COLLAPSED_KEY = "efta-sidebar-collapsed";
const SIDEBAR_MIN_W  = 52;
const SIDEBAR_DEFAULT_W = 200;

const SHELL_CSS = `
:root { --sidebar-w: ${SIDEBAR_DEFAULT_W}px; }
.efta-app { display: grid; grid-template-columns: var(--sidebar-w) 1fr; grid-template-rows: var(--topbar-h) 1fr var(--statusbar-h);
  height: 100%; min-height: 100%; background: var(--bg-app); color: var(--text-primary); transition: grid-template-columns 160ms var(--ease-out); }
.efta-side { grid-row: 1 / 4; display: flex; flex-direction: column; background: var(--bg-sunken);
  border-right: 1px solid var(--border-default); position: relative; overflow: hidden; min-width: 0; }
/* drag handle on right edge of sidebar */
.efta-side__drag { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; z-index: 10; }
.efta-side__drag:hover, .efta-side__drag--active { background: var(--accent); opacity: .4; }
.efta-brand { display: flex; align-items: center; gap: 10px; padding: 14px 12px; height: var(--topbar-h); border-bottom: 1px solid var(--border-default); flex-shrink: 0; }
.efta-brand__mark { width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--accent);
  display: flex; align-items: center; justify-content: center; flex: none; box-shadow: var(--glow-active);
  cursor: pointer; transition: opacity 120ms; }
.efta-brand__mark:hover { opacity: .8; }
.efta-brand__mark svg { color: var(--accent-fg); }
.efta-brand__text { overflow: hidden; }
.efta-brand__name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; white-space: nowrap; }
.efta-brand__name .dl { color: var(--accent); }
.efta-brand__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-faint); margin-top: 1px; white-space: nowrap; }
.efta-nav { display: flex; flex-direction: column; gap: 2px; padding: 10px; flex: 1; overflow: hidden; }
.efta-nav__sec { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-disabled); padding: 12px 10px 6px; white-space: nowrap; overflow: hidden; }
.efta-nav__item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--radius-sm);
  color: var(--text-muted); font-size: 13px; font-weight: 500; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left;
  transition: background var(--dur-fast), color var(--dur-fast); white-space: nowrap; }
.efta-nav__item:hover { background: var(--bg-hover); color: var(--text-primary); }
.efta-nav__item--active { background: var(--accent-tint); color: var(--accent); }
.efta-nav__item--active svg { color: var(--accent); }
.efta-nav__item .efta-nav__count { margin-left: auto; font-family: var(--font-mono); font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-faint); }
.efta-nav__item--active .efta-nav__count { color: var(--accent); }
.efta-nav__item svg { flex-shrink: 0; }
.efta-side__foot { padding: 12px; border-top: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; overflow: hidden; }
.efta-ds-card { background: var(--bg-panel); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 11px 12px; }
.efta-ds-card__top { display: flex; align-items: center; justify-content: space-between; }
.efta-ds-card__lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-faint); white-space: nowrap; }
.efta-ds-card__val { font-family: var(--font-mono); font-size: 18px; font-weight: 500; color: var(--text-primary); margin-top: 3px; white-space: nowrap; }
.efta-top { grid-column: 2; grid-row: 1; height: var(--topbar-h); display: flex; align-items: center; gap: 16px; padding: 0 20px;
  border-bottom: 1px solid var(--border-default); background: var(--bg-app); }
.efta-top__title { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.efta-top__crumb { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
.efta-top__spacer { flex: 1; }
.efta-top__live { display: flex; align-items: center; gap: 8px; padding: 5px 11px 5px 9px; border-radius: var(--radius-pill);
  background: var(--bg-raised); border: 1px solid var(--border-default); font-family: var(--font-mono); font-size: 12px; }
.efta-main { grid-column: 2; grid-row: 2; overflow: auto; }
.efta-status { grid-column: 2; grid-row: 3; height: var(--statusbar-h); display: flex; align-items: center; gap: 18px; padding: 0 20px;
  border-top: 1px solid var(--border-default); background: var(--bg-sunken); font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.efta-status__item { display: flex; align-items: center; gap: 6px; }
.efta-status__item svg { width: 12px; height: 12px; }
.efta-status__sep { width: 1px; height: 13px; background: var(--border-default); }
.efta-status__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--state-downloaded); }
/* collapsed sidebar — icon-only */
.efta-side--collapsed .efta-brand__text,
.efta-side--collapsed .efta-nav__sec,
.efta-side--collapsed .efta-nav__item span:not([class]),
.efta-side--collapsed .efta-nav__count,
.efta-side--collapsed .efta-ds-card,
.efta-side--collapsed .efta-status__item { display: none; }
.efta-side--collapsed .efta-nav__item { justify-content: center; padding: 8px; }
.efta-side--collapsed .efta-side__foot { padding: 8px 6px; }
`;

function injectShell() {
  const old = document.getElementById("efta-shell-css");
  if (old) old.remove();
  const s = document.createElement("style"); s.id = "efta-shell-css"; s.textContent = SHELL_CSS; document.head.appendChild(s);
}

const VIEWS = [
  { id: "dashboard", label: "Dashboard", icon: IC.Activity, title: "Active crawl", crumb: "monitor" },
  { id: "new", label: "New download", icon: IC.Download, title: "New download", crumb: "configure a crawl" },
  { id: "files", label: "Files", icon: IC.Files, title: "Files", crumb: "downloads/" },
  { id: "conflicts", label: "Conflicts", icon: IC.Compare, title: "Conflict review", crumb: "conflicts/" },
  { id: "settings", label: "Settings", icon: IC.Settings, title: "Settings", crumb: "preferences" },
];

function NavItem({ v, active, onClick, count, collapsed }) {
  const Icon = v.icon;
  return (
    <button className={"efta-nav__item" + (active ? " efta-nav__item--active" : "")} onClick={onClick}
      title={collapsed ? v.label : undefined}>
      <Icon size={17} />
      {!collapsed && <span>{v.label}</span>}
      {!collapsed && count != null && <span className="efta-nav__count">{count}</span>}
    </button>
  );
}

function App() {
  injectShell();
  const [view, setView] = React.useState("dashboard");
  const [status, setStatus] = React.useState({ running: false, dataset: null, page: 0, workers: 10, delay: 0.4, strategy: "httpx", db_size: null });
  const [navCounts, setNavCounts] = React.useState({ files: null, conflicts: null });
  const [collapsed, setCollapsed] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(SIDEBAR_COLLAPSED_KEY)) === true; } catch { return false; }
  });
  const [sidebarW, setSidebarW] = React.useState(() => {
    try { return parseInt(localStorage.getItem(SIDEBAR_W_KEY)) || SIDEBAR_DEFAULT_W; } catch { return SIDEBAR_DEFAULT_W; }
  });
  const dragRef = React.useRef(null);

  // Keep CSS variable in sync
  React.useLayoutEffect(() => {
    const w = collapsed ? SIDEBAR_MIN_W : sidebarW;
    document.documentElement.style.setProperty("--sidebar-w", w + "px");
  }, [collapsed, sidebarW]);

  React.useEffect(() => {
    const poll = () => {
      fetch("/api/status").then(r => r.json()).then(d => {
        setStatus(d);
        setNavCounts({ files: d.total_files, conflicts: d.conflicts });
      }).catch(() => {});
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const startSidebarDrag = (e) => {
    if (collapsed) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW = sidebarW;
    const handle = dragRef.current;
    if (handle) handle.classList.add("efta-side__drag--active");
    const onMove = (ev) => {
      const w = Math.max(120, Math.min(400, startW + ev.clientX - startX));
      setSidebarW(w);
      document.documentElement.style.setProperty("--sidebar-w", w + "px");
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (handle) handle.classList.remove("efta-side__drag--active");
      setSidebarW(prev => {
        try { localStorage.setItem(SIDEBAR_W_KEY, String(prev)); } catch {}
        return prev;
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleStart = () => setView("dashboard");
  const cur = VIEWS.find(v => v.id === view);
  const crumbExtra = view === "dashboard" && status.dataset
    ? `dataset ${status.dataset} · ${status.running ? "running" : "idle"}`
    : cur.crumb;
  const fmt = (n) => n != null ? n.toLocaleString() : "—";

  let Screen = null;
  if (view === "dashboard") Screen = <window.EFTADashboard status={status} setStatus={setStatus} go={setView} />;
  else if (view === "new") Screen = <window.EFTANewDownload onStart={handleStart} />;
  else if (view === "files") Screen = <window.EFTAFiles />;
  else if (view === "conflicts") Screen = <window.EFTAConflicts />;
  else if (view === "settings") Screen = <window.EFTASettings status={status} />;

  return (
    <div className="efta-app">
      <aside className={"efta-side" + (collapsed ? " efta-side--collapsed" : "")}>
        <div className="efta-brand">
          <div className="efta-brand__mark" onClick={toggleCollapsed} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <IC.Download size={17} strokeWidth={2.4} />
          </div>
          <div className="efta-brand__text">
            <div className="efta-brand__name">EFTA<span className="dl">·DL</span></div>
            <div className="efta-brand__tag">Disclosure Downloader</div>
          </div>
        </div>
        <nav className="efta-nav">
          {!collapsed && <div className="efta-nav__sec">Operate</div>}
          {VIEWS.slice(0, 2).map(v => (
            <NavItem key={v.id} v={v} active={view === v.id} onClick={() => setView(v.id)} collapsed={collapsed} />
          ))}
          {!collapsed && <div className="efta-nav__sec">Library</div>}
          <NavItem v={VIEWS[2]} active={view === "files"} onClick={() => setView("files")}
            count={navCounts.files != null ? fmt(navCounts.files) : null} collapsed={collapsed} />
          <NavItem v={VIEWS[3]} active={view === "conflicts"} onClick={() => setView("conflicts")}
            count={navCounts.conflicts || null} collapsed={collapsed} />
          {!collapsed && <div className="efta-nav__sec">System</div>}
          <NavItem v={VIEWS[4]} active={view === "settings"} onClick={() => setView("settings")} collapsed={collapsed} />
        </nav>
        {!collapsed && (
          <div className="efta-side__foot">
            <div className="efta-ds-card">
              <div className="efta-ds-card__top">
                <span className="efta-ds-card__lbl">Active dataset</span>
                <DS.Badge variant={status.running ? "accent" : "outline"}>{status.running ? "live" : "idle"}</DS.Badge>
              </div>
              <div className="efta-ds-card__val">{status.dataset ? `data-set-${status.dataset}` : "—"}</div>
            </div>
            {status.db_size && (
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-faint)', display:'flex', gap:8, alignItems:'center'}}>
                <IC.Database size={13} /> downloads.db · {status.db_size}
              </div>
            )}
          </div>
        )}
        {/* Drag handle — only when expanded */}
        {!collapsed && <div className="efta-side__drag" ref={dragRef} onMouseDown={startSidebarDrag} />}
      </aside>

      <header className="efta-top">
        <span className="efta-top__title">{cur.title}</span>
        <span className="efta-top__crumb">/ {crumbExtra}</span>
        <div className="efta-top__spacer" />
        {status.running ? (
          <div className="efta-top__live">
            <DS.StatusBadge status="active" pulse label="Crawling" />
            <span style={{color:'var(--text-faint)'}}>page {status.page ? status.page.toLocaleString() : "—"}</span>
          </div>
        ) : (
          <div className="efta-top__live"><DS.StatusBadge status="queued" label="Idle" dot /></div>
        )}
        {status.running
          ? <DS.Button variant="secondary" size="sm" iconLeft={<IC.Pause size={15} />}
              onClick={() => fetch("/api/pause", {method:"POST"}).then(() => setStatus(s => ({...s, running: false})))}>Pause</DS.Button>
          : status.dataset
            ? <DS.Button variant="primary" size="sm" iconLeft={<IC.Play size={15} />}
                onClick={() => fetch("/api/resume", {method:"POST"}).then(r => r.json()).then(() => setStatus(s => ({...s, running: true})))}>Resume</DS.Button>
            : null}
      </header>

      <main className="efta-main">{Screen}</main>

      <footer className="efta-status">
        <span className="efta-status__item">
          <span className="efta-status__dot" style={{background: status.running ? 'var(--state-downloaded)' : 'var(--text-disabled)'}} />
          {status.running ? "Crawling" : "Idle"}
        </span>
        <span className="efta-status__sep" />
        <span className="efta-status__item"><IC.Server /> {status.strategy || "httpx"} · HTTP/2</span>
        <span className="efta-status__item"><IC.Zap /> {status.workers || 10} workers</span>
        <span className="efta-status__item"><IC.Clock /> {status.delay != null ? status.delay : 0.4}s delay</span>
        <div style={{flex:1}} />
        <span className="efta-status__item">justice.gov/epstein</span>
        <span className="efta-status__sep" />
        <span className="efta-status__item">resume: {status.resume !== false ? "on" : "off"}</span>
      </footer>
    </div>
  );
}
window.EFTAApp = App;
