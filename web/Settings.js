/* Settings — preferences */
(function () {
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const CSS = `
.st { padding: 20px; max-width: 880px; display: flex; flex-direction: column; gap: 16px; }
.st__rows { display: flex; flex-direction: column; }
.st__row { display: flex; align-items: center; gap: 16px; padding: 13px 0; border-bottom: 1px solid var(--border-faint); }
.st__row:last-child { border-bottom: none; }
.st__row__txt { flex: 1; min-width: 0; }
.st__row__t { font-size: 13px; font-weight: 500; color: var(--text-primary); }
.st__row__d { font-size: 12px; color: var(--text-faint); margin-top: 2px; }
.st__row__ctl { flex: none; width: 180px; }
.st__saved { font-family: var(--font-mono); font-size: 11px; color: var(--state-downloaded); padding: 4px 0; }
`;
if (!document.getElementById("efta-st-css")) { const s = document.createElement("style"); s.id = "efta-st-css"; s.textContent = CSS; document.head.appendChild(s); }

function Row({ t, d, children }) {
  return (
    <div className="st__row">
      <div className="st__row__txt"><div className="st__row__t">{t}</div><div className="st__row__d">{d}</div></div>
      <div className="st__row__ctl">{children}</div>
    </div>
  );
}

function Settings({ status }) {
  const [httpx, setHttpx] = React.useState(true);
  const [pw, setPw] = React.useState(true);
  const [workers, setWorkers] = React.useState(10);
  const [delay, setDelay] = React.useState(0.4);
  const [maxForbidden, setMaxForbidden] = React.useState(3);
  const [maxRetries, setMaxRetries] = React.useState(3);
  const [dbState, setDbState] = React.useState(true);
  const [fsFallback, setFsFallback] = React.useState(true);
  const [csv, setCsv] = React.useState(false);
  const [debug, setDebug] = React.useState(false);
  const [downloadDir, setDownloadDir] = React.useState("downloads/");
  const [saved, setSaved] = React.useState(false);
  const [rescanning, setRescanning] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (d.use_httpx != null) setHttpx(d.use_httpx);
      if (d.use_playwright != null) setPw(d.use_playwright);
      if (d.workers != null) setWorkers(d.workers);
      if (d.delay != null) setDelay(d.delay);
      if (d.max_forbidden != null) setMaxForbidden(d.max_forbidden);
      if (d.max_retries != null) setMaxRetries(d.max_retries);
      if (d.db_state != null) setDbState(d.db_state);
      if (d.fs_fallback != null) setFsFallback(d.fs_fallback);
      if (d.csv != null) setCsv(d.csv);
      if (d.debug != null) setDebug(d.debug);
      if (d.download_dir != null) setDownloadDir(d.download_dir);
    }).catch(() => {});
  }, []);

  const save = () => {
    const payload = { use_httpx: httpx, use_playwright: pw, workers, delay, max_forbidden: maxForbidden, max_retries: maxRetries, db_state: dbState, fs_fallback: fsFallback, csv, debug, download_dir: downloadDir };
    fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(r => r.json()).then(() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }).catch(() => {});
  };

  const handleRescan = () => {
    if (!window.confirm("Rescan will rebuild the SQLite index from files on disk. This may take a while. Continue?")) return;
    setRescanning(true);
    fetch("/api/rescan", { method: "POST" }).then(r => r.json()).then(d => {
      alert(d.message || "Rescan complete.");
    }).catch(() => alert("Rescan error.")).finally(() => setRescanning(false));
  };

  return (
    <div className="st">
      <DS.Card eyebrow="Fetch strategy" title="How pages are fetched" actions={<IC.Server size={18} style={{ color: "var(--text-faint)" }} />}>
        <div className="st__rows">
          <Row t="httpx (HTTP/2)" d="Primary fetcher. Fastest and bypasses most anti-bot 403s.">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={httpx} onChange={setHttpx} /></div>
          </Row>
          <Row t="Playwright fallback" d="Launch a real browser after repeated 403s. Slower but reliable.">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={pw} onChange={setPw} /></div>
          </Row>
        </div>
      </DS.Card>

      <DS.Card eyebrow="Performance & networking" title="Concurrency & retries" actions={<IC.Zap size={18} style={{ color: "var(--text-faint)" }} />}>
        <div className="st__rows">
          <Row t="Max workers" d="Parallel downloads. 10–25 is respectful; 50 is aggressive.">
            <DS.NumberField value={workers} min={1} max={64} unit="parallel" onChange={setWorkers} />
          </Row>
          <Row t="Request delay" d="Seconds to wait between page fetches.">
            <DS.NumberField value={delay} min={0} max={5} step={0.1} unit="s" onChange={setDelay} />
          </Row>
          <Row t="Max consecutive 403s" d="Stop after this many forbidden responses in a row.">
            <DS.NumberField value={maxForbidden} min={1} max={20} unit="hits" onChange={setMaxForbidden} />
          </Row>
          <Row t="Max retries" d="Retry attempts per failed page fetch.">
            <DS.NumberField value={maxRetries} min={0} max={10} unit="tries" onChange={setMaxRetries} />
          </Row>
          <Row t="Download directory" d="Where to save files on disk.">
            <DS.TextField value={downloadDir} onChange={e => setDownloadDir(e.target.value)} mono />
          </Row>
        </div>
      </DS.Card>

      <DS.Card eyebrow="State, database & logging" title="Tracking & index" actions={<IC.Database size={18} style={{ color: "var(--text-faint)" }} />}>
        <div className="st__rows">
          <Row t="Persist state in database" d="Resume position lives in downloads.db (recommended).">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={dbState} onChange={setDbState} /></div>
          </Row>
          <Row t="Filesystem fallback" d="Scan disk when the DB index misses a file.">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={fsFallback} onChange={setFsFallback} /></div>
          </Row>
          <Row t="CSV log" d="Append every action to downloads.csv.">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={csv} onChange={setCsv} /></div>
          </Row>
          <Row t="Debug HTTP" d="Print verbose diagnostics for 403s and errors.">
            <div style={{ display: "flex", justifyContent: "flex-end" }}><DS.Switch checked={debug} onChange={setDebug} /></div>
          </Row>
          <Row t="Index database" d="Rebuild the SQLite index from files on disk.">
            <DS.Button variant="secondary" size="sm" fullWidth iconLeft={<IC.Refresh size={15} />} onClick={handleRescan} disabled={rescanning}>
              {rescanning ? "Rescanning…" : "Rescan now"}
            </DS.Button>
          </Row>
        </div>
      </DS.Card>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <DS.Button variant="primary" iconLeft={<IC.Check size={16} />} onClick={save}>Save settings</DS.Button>
        {saved && <span className="st__saved">Settings saved.</span>}
      </div>
    </div>
  );
}
window.EFTASettings = Settings;
})();
