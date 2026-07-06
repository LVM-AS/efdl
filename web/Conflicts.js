/* Conflicts — side-by-side compare review */
(function () {
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const CF_LIST_W_KEY         = "efta-cf-list-w";
const CF_LIST_COLLAPSED_KEY = "efta-cf-list-collapsed";
const CF_LIST_DEFAULT_W     = 280;
const CF_LIST_MIN_W         = 44;

const CSS = `
.cf { display: grid; grid-template-columns: var(--cf-list-w, 280px) 1fr; height: 100%; }

/* ── sidebar ── */
.cf__list { border-right: 1px solid var(--border-default); background: var(--bg-sunken);
  position: relative; overflow: hidden; display: flex; flex-direction: column; min-width: 0; }
.cf__list__drag { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; z-index: 10; }
.cf__list__drag:hover, .cf__list__drag--active { background: var(--accent); opacity: .4; }
/* collapsed */
.cf__list--collapsed .cf__list__drag  { display: none; }
.cf__list--collapsed { min-width: ${CF_LIST_MIN_W}px; max-width: ${CF_LIST_MIN_W}px; overflow: hidden; }
.cf__list--collapsed .cf__list__body  { display: none; }
.cf__list--collapsed .cf__head { border-bottom: none; justify-content: center; padding: 13px 0; }

/* header — same visual style as Files tree header */
.cf__head { display: flex; align-items: center; gap: 8px; padding: 13px 12px;
  border-bottom: 1px solid var(--border-default); cursor: pointer; user-select: none; flex-shrink: 0; }
.cf__head:hover { background: var(--bg-hover); }
.cf__head__label { flex: 1; font-weight: 600; font-size: 13px; overflow: hidden; white-space: nowrap; }
.cf__head__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin-left: 8px; }
.cf__head__arrow { color: var(--text-disabled); display: flex; align-items: center; flex-shrink: 0;
  transition: transform 110ms; }
.cf__list--collapsed .cf__head__arrow { transform: rotate(-90deg); }

/* ── page tree (inside body) ── */
.cf__list__body { display: flex; flex-direction: column; flex: 1; overflow: hidden; min-height: 0; }
.cf__tree { flex-shrink: 0; border-bottom: 1px solid var(--border-default); padding: 6px 8px; }
.cf__node { display: flex; align-items: center; gap: 7px; padding: 5px 8px; border-radius: var(--radius-sm);
  cursor: pointer; font-size: 13px; color: var(--text-secondary); width: 100%; }
.cf__node:hover { background: var(--bg-hover); color: var(--text-primary); }
.cf__node--on { background: var(--accent-tint); color: var(--accent); }
.cf__node--on svg { color: var(--accent); }
.cf__node__label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cf__node__c { margin-left: auto; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); flex-shrink: 0; }
.cf__node--on .cf__node__c { color: var(--accent); }

/* ── items list ── */
.cf__items { flex: 1; overflow: auto; }
.cf__item { padding: 12px 16px; border-bottom: 1px solid var(--border-faint); cursor: pointer; }
.cf__item:hover { background: var(--bg-hover); }
.cf__item--on { background: var(--accent-tint); box-shadow: inset 2px 0 0 var(--accent); }
.cf__item__nm { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); }
.cf__item__meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin-top: 3px; }
.cf__item__note { font-size: 12px; color: var(--text-muted); margin-top: 5px; }

/* ── main panel ── */
.cf__main { display: flex; flex-direction: column; min-width: 0; overflow: auto; }
.cf__bar { padding: 14px 20px; border-bottom: 1px solid var(--border-default); display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cf__legend { display: flex; gap: 14px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.cf__legend span { display: flex; align-items: center; gap: 5px; }
.cf__legend i { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }
.cf__compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 20px; }
.cf__doc { border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-lg); }
.cf__doc__bar { display: flex; align-items: center; gap: 8px; padding: 9px 13px; font-family: var(--font-mono); font-size: 11px; }
.cf__page { background: var(--bg-panel); padding: 22px 24px; min-height: 360px; }
.cf__diff { font-family: var(--font-mono); font-size: 11px; line-height: 1.7; white-space: pre-wrap; word-break: break-all; }
.cf__diff .add { color: var(--state-downloaded); background: var(--green-tint); display: block; }
.cf__diff .del { color: var(--state-conflict); background: var(--orange-tint); display: block; text-decoration: line-through; }
.cf__diff .ctx { color: var(--text-muted); display: block; }
.cf__empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 100%; color: var(--text-faint); font-family: var(--font-mono); font-size: 13px; }
`;
const _old = document.getElementById("efta-cf-css");
if (_old) _old.remove();
const _s = document.createElement("style"); _s.id = "efta-cf-css"; _s.textContent = CSS; document.head.appendChild(_s);

function Conflicts() {
  const [items, setItems]       = React.useState([]);
  const [sel, setSel]           = React.useState(null);   // index into filteredItems
  const [diff, setDiff]         = React.useState(null);
  const [total, setTotal]       = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState(null); // null = all

  const [listCollapsed, setListCollapsed] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(CF_LIST_COLLAPSED_KEY)) === true; } catch { return false; }
  });
  const [listW, setListW] = React.useState(() => {
    try { return parseInt(localStorage.getItem(CF_LIST_W_KEY)) || CF_LIST_DEFAULT_W; } catch { return CF_LIST_DEFAULT_W; }
  });
  const dragRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const w = listCollapsed ? CF_LIST_MIN_W : listW;
    document.documentElement.style.setProperty("--cf-list-w", w + "px");
  }, [listCollapsed, listW]);

  const toggleList = () => setListCollapsed(prev => {
    const next = !prev;
    try { localStorage.setItem(CF_LIST_COLLAPSED_KEY, JSON.stringify(next)); } catch {}
    return next;
  });

  const startDrag = (e) => {
    if (listCollapsed) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW = listW;
    const handle = dragRef.current;
    if (handle) handle.classList.add("cf__list__drag--active");
    const onMove = (ev) => {
      const w = Math.max(140, Math.min(600, startW + ev.clientX - startX));
      setListW(w);
      document.documentElement.style.setProperty("--cf-list-w", w + "px");
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (handle) handle.classList.remove("cf__list__drag--active");
      setListW(prev => {
        try { localStorage.setItem(CF_LIST_W_KEY, String(prev)); } catch {}
        return prev;
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  React.useEffect(() => {
    fetch("/api/conflicts").then(r => r.json()).then(d => {
      setItems(d.items || []);
      setTotal(d.total || 0);
    }).catch(() => {});
  }, []);

  // Derive page counts from loaded items
  const pages = React.useMemo(() => {
    const map = {};
    items.forEach(item => {
      const p = item.page != null ? String(item.page) : "?";
      map[p] = (map[p] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => {
      const na = Number(a[0]), nb = Number(b[0]);
      return isNaN(na) || isNaN(nb) ? a[0].localeCompare(b[0]) : na - nb;
    });
  }, [items]);

  // Filter items by selected page
  const filteredItems = React.useMemo(() =>
    selectedPage === null ? items : items.filter(item => String(item.page) === selectedPage),
  [items, selectedPage]);

  // Reset sel when filter changes
  React.useEffect(() => { setSel(null); setDiff(null); }, [selectedPage]);

  // Load diff for selected item
  React.useEffect(() => {
    if (sel === null || !filteredItems[sel]) { setDiff(null); return; }
    fetch(`/api/conflicts/${encodeURIComponent(filteredItems[sel].filename)}/diff`)
      .then(r => r.json()).then(setDiff).catch(() => setDiff(null));
  }, [sel, filteredItems]);

  const c = sel !== null ? filteredItems[sel] : null;

  return (
    <div className="cf">
      <aside className={"cf__list" + (listCollapsed ? " cf__list--collapsed" : "")}>

        {/* Header — toggles collapse */}
        <div className="cf__head" onClick={toggleList} title={listCollapsed ? "Expand panel" : "Collapse panel"}>
          <IC.Compare size={16} style={{ color: "var(--state-conflict)", flexShrink: 0 }} />
          {!listCollapsed && (
            <span className="cf__head__label">
              Conflict review
              {total > 0 && <span className="cf__head__count">{total}</span>}
            </span>
          )}
          <span className="cf__head__arrow"><IC.ChevronDown size={13} /></span>
        </div>

        {/* Body: page tree + item list */}
        <div className="cf__list__body">

          {/* Page tree */}
          <div className="cf__tree">
            {/* All conflicts */}
            <div className={"cf__node" + (selectedPage === null ? " cf__node--on" : "")}
              onClick={() => setSelectedPage(null)}>
              <span style={{width:13, flexShrink:0}} />
              <IC.Compare size={15} style={{flexShrink:0}} />
              <span className="cf__node__label">All conflicts</span>
              <span className="cf__node__c">{total.toLocaleString()}</span>
            </div>
            {/* Page entries */}
            {pages.map(([pg, count]) => (
              <div key={pg}
                className={"cf__node" + (selectedPage === pg ? " cf__node--on" : "")}
                onClick={() => setSelectedPage(selectedPage === pg ? null : pg)}>
                <span style={{width:13, flexShrink:0}} />
                <IC.FolderOpen size={15} style={{flexShrink:0}} />
                <span className="cf__node__label">page_{pg}</span>
                <span className="cf__node__c">{count}</span>
              </div>
            ))}
          </div>

          {/* Filtered items */}
          <div className="cf__items">
            {filteredItems.length === 0 && (
              <div style={{ padding: "20px 16px", color: "var(--text-disabled)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                No conflicts{selectedPage !== null ? ` on page_${selectedPage}` : ""}.
              </div>
            )}
            {filteredItems.map((cc, i) => (
              <div key={cc.filename + i}
                className={"cf__item" + (i === sel ? " cf__item--on" : "")}
                onClick={() => setSel(i === sel ? null : i)}>
                <div className="cf__item__nm">{cc.filename}</div>
                <div className="cf__item__meta">page {cc.page} · {cc.when || ""}</div>
                {cc.note && <div className="cf__item__note">{cc.note}</div>}
              </div>
            ))}
          </div>
        </div>

        {!listCollapsed && <div className="cf__list__drag" ref={dragRef} onMouseDown={startDrag} />}
      </aside>

      <section className="cf__main">
        {!c && (
          <div className="cf__empty">
            <IC.Check size={32} style={{ color: "var(--state-downloaded)" }} />
            <span>
              {filteredItems.length === 0
                ? "No conflicts to review."
                : "Select a conflict from the list."}
            </span>
          </div>
        )}
        {c && <>
          <div className="cf__bar">
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 500 }}>{c.filename}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", marginTop: 2 }}>
                conflicts/page_{c.page}/ {c.pages_changed ? `· ${c.pages_changed} pages changed` : ""}
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="cf__legend">
              <span><i style={{ background: "var(--state-conflict)" }} /> removed</span>
              <span><i style={{ background: "var(--state-downloaded)" }} /> added</span>
            </div>
            {c.visual_pdf && (
              <DS.Button variant="secondary" size="sm" iconLeft={<IC.External size={15} />}
                onClick={() => window.open(`/api/conflicts/${encodeURIComponent(c.filename)}/visual-pdf`, "_blank")}>
                Visual PDF
              </DS.Button>
            )}
          </div>

          <div className="cf__compare">
            <div className="cf__doc">
              <div className="cf__doc__bar" style={{ background: "var(--blue-tint)", color: "var(--state-info)" }}>
                <IC.FileText size={14} /> ORIGINAL · part_1/page_{c.page}/
              </div>
              <div className="cf__page">
                {diff ? (
                  <div className="cf__diff">
                    {diff.original_lines && diff.original_lines.map((line, i) => (
                      <span key={i} className={line.type === "del" ? "del" : "ctx"}>{line.text}</span>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: "var(--text-disabled)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                    {c.original_path || `Original: part_1/page_${c.page}/${c.filename}`}
                  </div>
                )}
              </div>
            </div>
            <div className="cf__doc">
              <div className="cf__doc__bar" style={{ background: "var(--orange-tint)", color: "var(--state-conflict)" }}>
                <IC.FileText size={14} /> CONFLICT · conflicts/page_{c.page}/
              </div>
              <div className="cf__page">
                {diff ? (
                  <div className="cf__diff">
                    {diff.conflict_lines && diff.conflict_lines.map((line, i) => (
                      <span key={i} className={line.type === "add" ? "add" : "ctx"}>{line.text}</span>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: "var(--text-disabled)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                    {c.conflict_path || `Conflict: conflicts/page_${c.page}/${c.filename}`}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ padding: "0 20px 20px", display: "flex", gap: 10, alignItems: "center" }}>
            {diff && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>
                <IC.Hash size={12} style={{ verticalAlign: "-2px" }} />
                {" "}{diff.hash_orig ? diff.hash_orig.slice(0, 8) : "?"} → {diff.hash_conf ? diff.hash_conf.slice(0, 8) : "?"}
                {diff.lines_removed != null ? ` · ${diff.lines_removed} lines removed, ${diff.lines_added} added` : ""}
              </span>
            )}
            <div style={{ flex: 1 }} />
            {c.compare_pdf && (
              <DS.Button variant="secondary" size="sm" iconLeft={<IC.FileText size={15} />}
                onClick={() => window.open(`/api/conflicts/${encodeURIComponent(c.filename)}/compare-pdf`, "_blank")}>
                Open text diff
              </DS.Button>
            )}
          </div>
        </>}
      </section>
    </div>
  );
}
window.EFTAConflicts = Conflicts;
})();
