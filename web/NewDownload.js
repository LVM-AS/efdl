/* New download — crawl configuration form */
(function () {
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;

const CSS = `
.nd { padding: 20px; max-width: 980px; display: grid; grid-template-columns: 1fr 320px; gap: 16px; align-items: start; }
.nd__main { display: flex; flex-direction: column; gap: 16px; }
.nd__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.nd__row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.nd__datasets { display: flex; gap: 8px; flex-wrap: wrap; }
.nd__ds { width: 56px; height: 52px; border-radius: var(--radius-md); border: 1px solid var(--border-input); background: var(--bg-input);
  display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; gap: 1px;
  transition: border-color var(--dur-fast), background var(--dur-fast); }
.nd__ds:hover { border-color: var(--border-strong); }
.nd__ds--on { border-color: var(--accent); background: var(--accent-tint); }
.nd__ds__n { font-family: var(--font-mono); font-size: 17px; font-weight: 600; color: var(--text-primary); }
.nd__ds--on .nd__ds__n { color: var(--accent); }
.nd__ds__l { font-family: var(--font-mono); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); }
.nd__url { font-family: var(--font-mono); font-size: 12px; color: var(--state-info); word-break: break-all; line-height: 1.6; padding: 11px 12px; background: var(--bg-sunken); border-radius: var(--radius-sm); border: 1px solid var(--border-faint); }
.nd__url b { color: var(--accent); }
.nd__summary { display: flex; flex-direction: column; gap: 10px; }
.nd__sumrow { display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
.nd__sumrow span:first-child { color: var(--text-muted); }
.nd__sumrow span:last-child { font-family: var(--font-mono); color: var(--text-primary); }
.nd__cli { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); background: var(--bg-sunken); border: 1px solid var(--border-faint); border-radius: var(--radius-sm); padding: 10px 12px; word-break: break-all; line-height: 1.7; display: flex; align-items: flex-start; gap: 8px; }
.nd__cli code { flex: 1; }
`;
if (!document.getElementById("efta-nd-css")) { const s = document.createElement("style"); s.id = "efta-nd-css"; s.textContent = CSS; document.head.appendChild(s); }

const DATASETS = [9, 10, 11, 12, 13];

function buildCmd(cfg) {
  const parts = ["python download.py", `--dataset ${cfg.dataset}`];
  if (cfg.startPage > 0) parts.push(`--start-page ${cfg.startPage}`);
  if (cfg.endPage > 0) parts.push(`--end-page ${cfg.endPage}`);
  if (cfg.workers !== 10) parts.push(`--max-workers ${cfg.workers}`);
  if (cfg.delay !== 0.4) parts.push(`--request-delay ${cfg.delay}`);
  if (!cfg.httpx) parts.push("--no-httpx");
  if (!cfg.pw) parts.push("--no-playwright");
  if (!cfg.resume) parts.push("--no-resume");
  if (cfg.dry) parts.push("--dry-run");
  if (cfg.downloadDir && cfg.downloadDir !== "downloads/") parts.push(`--download-dir "${cfg.downloadDir}"`);
  return parts.join(" ");
}

function NewDownload({ onStart }) {
  const [dataset, setDataset] = React.useState(12);
  const [startPage, setStartPage] = React.useState(0);
  const [endPage, setEndPage] = React.useState(0);
  const [workers, setWorkers] = React.useState(10);
  const [delay, setDelay] = React.useState(0.4);
  const [resume, setResume] = React.useState(true);
  const [dry, setDry] = React.useState(false);
  const [httpx, setHttpx] = React.useState(true);
  const [pw, setPw] = React.useState(true);
  const [downloadDir, setDownloadDir] = React.useState("downloads/");
  const [starting, setStarting] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Load persisted settings on mount so defaults match Settings tab
  React.useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(s => {
      if (s.workers    != null) setWorkers(s.workers);
      if (s.delay      != null) setDelay(s.delay);
      if (s.use_httpx  != null) setHttpx(s.use_httpx);
      if (s.use_playwright != null) setPw(s.use_playwright);
      if (s.download_dir)      setDownloadDir(s.download_dir);
    }).catch(() => {});
  }, []);

  const cfg = { dataset, startPage, endPage, workers, delay, resume, dry, httpx, pw, downloadDir };
  const cmd = buildCmd(cfg);

  const handleStart = async () => {
    setStarting(true);
    try {
      const resp = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cfg),
      });
      const data = await resp.json();
      if (data.ok) {
        onStart(cfg);
      } else {
        alert("Failed to start: " + (data.error || "unknown error"));
      }
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setStarting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  return (
    <div className="nd">
      <div className="nd__main">
        <DS.Card eyebrow="Source" title="Dataset">
          <div className="nd__datasets">
            {DATASETS.map(n => (
              <button key={n} className={"nd__ds" + (dataset === n ? " nd__ds--on" : "")} onClick={() => setDataset(n)}>
                <span className="nd__ds__n">{n}</span><span className="nd__ds__l">set</span>
              </button>
            ))}
          </div>
          <div className="nd__row3" style={{ marginTop: 4 }}>
            <DS.NumberField label="Start page" value={startPage} min={0} unit="page" onChange={setStartPage} hint="0 = resume / start" />
            <DS.NumberField label="End page" value={endPage} min={0} unit="page" onChange={setEndPage} hint="0 = unlimited" />
            <DS.TextField label="Download dir" value={downloadDir} onChange={e => setDownloadDir(e.target.value)} />
          </div>
          <div className="nd__url">
            https://www.justice.gov/epstein/doj-disclosures/<b>data-set-{dataset}-files</b>?page={startPage}
          </div>
        </DS.Card>

        <DS.Card eyebrow="Performance" title="Concurrency &amp; pacing">
          <div className="nd__row">
            <DS.NumberField label="Max workers" value={workers} min={1} max={64} unit="parallel" onChange={setWorkers} hint="10–25 is respectful; 50 is aggressive" />
            <DS.NumberField label="Request delay" value={delay} min={0} max={5} step={0.1} unit="s" onChange={setDelay} hint="between page fetches" />
          </div>
        </DS.Card>

        <DS.Card eyebrow="Fetch strategy" title="How pages are fetched">
          <DS.Switch checked={httpx} onChange={setHttpx} label="httpx (HTTP/2)" description="Primary fetcher — fastest, bypasses most 403s. Recommended on." />
          <DS.Switch checked={pw} onChange={setPw} label="Playwright fallback" description="Real browser on repeated 403 — slower, defeats anti-bot." />
        </DS.Card>
      </div>

      <div className="nd__main">
        <DS.Card eyebrow="Run mode" title="Options">
          <DS.Switch checked={resume} onChange={setResume} label="Resume" description="Continue from saved state." />
          <DS.Switch checked={dry} onChange={setDry} label="Dry run" description="Simulate — write nothing." />
        </DS.Card>

        <DS.Card variant="flat" eyebrow="Summary" title={`Dataset ${dataset}`}>
          <div className="nd__summary">
            <div className="nd__sumrow"><span>Workers</span><span>{workers} parallel</span></div>
            <div className="nd__sumrow"><span>Delay</span><span>{delay}s</span></div>
            <div className="nd__sumrow"><span>Strategy</span><span>{httpx ? "HTTP/2" : "requests"}{pw ? " + PW" : ""}</span></div>
            <div className="nd__sumrow"><span>Mode</span><span>{dry ? "dry-run" : resume ? "resume" : "fresh"}</span></div>
          </div>
          <div style={{ height: 1, background: "var(--border-faint)", margin: "4px 0" }} />
          {dry && (
            <div style={{ padding: "8px 0", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange-500)" }}>
              Dry run — no files will be downloaded.
            </div>
          )}
          <DS.Button variant="primary" fullWidth iconLeft={<IC.Play size={16} />} onClick={handleStart} disabled={starting}>
            {starting ? "Starting…" : "Start crawl"}
          </DS.Button>
          <DS.Button variant="ghost" fullWidth size="sm" iconLeft={<IC.Copy size={15} />} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy CLI command"}
          </DS.Button>
        </DS.Card>

        <div className="nd__cli">
          <code>{cmd}</code>
        </div>
      </div>
    </div>
  );
}
window.EFTANewDownload = NewDownload;
})();
