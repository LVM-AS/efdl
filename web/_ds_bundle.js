/* @ds-bundle: {"format":3,"namespace":"EFTADLDesignSystem_0e4e9e","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"LogLine","sourcePath":"components/data/LogLine.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatusBadge","sourcePath":"components/data/StatusBadge.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"NumberField","sourcePath":"components/forms/NumberField.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"f277a795c37f","components/core/Button.jsx":"d24209cc2d4f","components/core/Card.jsx":"11376d5868d6","components/core/IconButton.jsx":"dcc30ab651bd","components/core/Stat.jsx":"bb6d2c389940","components/data/LogLine.jsx":"fca2c5c85023","components/data/ProgressBar.jsx":"63cf05916265","components/data/StatusBadge.jsx":"8ea1f7da4610","components/forms/Checkbox.jsx":"7b076cfe983c","components/forms/NumberField.jsx":"6ad3befcda20","components/forms/Select.jsx":"cb429345daed","components/forms/Switch.jsx":"2291e0272740","components/forms/TextField.jsx":"5bdebd601b4b","components/navigation/Tabs.jsx":"3a1d704b1dcf","ui_kits/console/App.jsx":"008b253ed8aa","ui_kits/console/Conflicts.jsx":"989607fcdd9c","ui_kits/console/Dashboard.jsx":"3328246da359","ui_kits/console/Files.jsx":"fe5a47b840fd","ui_kits/console/NewDownload.jsx":"ecd94c310322","ui_kits/console/Settings.jsx":"e3726f8e99b4","ui_kits/console/data.jsx":"9f22c8504d3a","ui_kits/console/icons.jsx":"15a3e2a89434"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EFTADLDesignSystem_0e4e9e = window.EFTADLDesignSystem_0e4e9e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-badge {
  display: inline-flex; align-items: center; gap: 5px;
  height: 20px; padding: 0 8px; border-radius: var(--radius-pill);
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide); text-transform: uppercase; white-space: nowrap;
  border: 1px solid transparent; line-height: 1;
}
.efta-badge--solid { background: var(--bg-hover); color: var(--text-secondary); }
.efta-badge--outline { background: transparent; border-color: var(--border-strong); color: var(--text-muted); }
.efta-badge--accent { background: var(--accent-tint); color: var(--accent); }
.efta-badge--count { font-variant-numeric: tabular-nums; letter-spacing: 0; min-width: 20px; justify-content: center; padding: 0 6px; }
.efta-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-badge-css")) {
  const s = document.createElement("style");
  s.id = "efta-badge-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Small neutral/accent label or count pill. */
function Badge({
  variant = "solid",
  dot = false,
  count = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["efta-badge", `efta-badge--${variant}`, count ? "efta-badge--count" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "efta-badge__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-btn {
  --_h: 34px; --_px: 14px; --_fs: var(--text-sm); --_gap: 8px;
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--_gap); height: var(--_h); padding: 0 var(--_px);
  font-family: var(--font-sans); font-size: var(--_fs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-tight); line-height: 1; white-space: nowrap;
  border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer;
  background: transparent; color: var(--text-primary);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
  -webkit-user-select: none; user-select: none;
}
.efta-btn:focus-visible { outline: none; box-shadow: var(--ring-focus); }
.efta-btn:active:not([disabled]) { transform: translateY(0.5px); }
.efta-btn[disabled] { opacity: 0.45; cursor: not-allowed; }
.efta-btn--sm { --_h: 28px; --_px: 11px; --_fs: var(--text-xs); --_gap: 6px; }
.efta-btn--lg { --_h: 40px; --_px: 18px; --_fs: var(--text-base); --_gap: 9px; }
.efta-btn--full { width: 100%; }

/* primary — signal amber */
.efta-btn--primary { background: var(--accent); color: var(--accent-fg); font-weight: var(--weight-semibold); box-shadow: var(--shadow-inset-top); }
.efta-btn--primary:hover:not([disabled]) { background: var(--accent-hover); box-shadow: var(--shadow-inset-top), var(--glow-active); }
.efta-btn--primary:active:not([disabled]) { background: var(--accent-press); }

/* secondary — raised surface */
.efta-btn--secondary { background: var(--bg-raised); border-color: var(--border-strong); color: var(--text-primary); box-shadow: var(--shadow-sm); }
.efta-btn--secondary:hover:not([disabled]) { background: var(--bg-hover); border-color: var(--border-strong); }

/* ghost — transparent */
.efta-btn--ghost { background: transparent; color: var(--text-secondary); }
.efta-btn--ghost:hover:not([disabled]) { background: var(--bg-hover); color: var(--text-primary); }

/* danger — destructive */
.efta-btn--danger { background: transparent; border-color: var(--border-strong); color: var(--state-error); }
.efta-btn--danger:hover:not([disabled]) { background: var(--red-tint); border-color: var(--state-error); }

.efta-btn__ico { display: inline-flex; width: 1em; height: 1em; flex: none; }
.efta-btn__ico svg { width: 100%; height: 100%; display: block; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-btn-css")) {
  const s = document.createElement("style");
  s.id = "efta-btn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Button — the primary EFTA-DL action control.
 * variant: primary | secondary | ghost | danger · size: sm | md | lg
 */
function Button({
  variant = "secondary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const cls = ["efta-btn", `efta-btn--${variant}`, size !== "md" ? `efta-btn--${size}` : "", fullWidth ? "efta-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "efta-btn__ico"
  }, iconLeft) : null, children != null ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "efta-btn__ico"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-card {
  background: var(--bg-panel); border: 1px solid var(--border-default);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-md);
  display: flex; flex-direction: column; overflow: hidden;
}
.efta-card--flat { box-shadow: none; background: var(--bg-raised); }
.efta-card--inset { box-shadow: var(--shadow-inset); background: var(--bg-sunken); }
.efta-card__head {
  display: flex; align-items: center; gap: var(--space-3);
  padding: 13px var(--space-4); border-bottom: 1px solid var(--border-default);
}
.efta-card__titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.efta-card__eyebrow {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--text-muted);
}
.efta-card__title { font-size: var(--text-md); font-weight: var(--weight-semibold); color: var(--text-primary); letter-spacing: var(--tracking-tight); }
.efta-card__actions { margin-left: auto; display: flex; align-items: center; gap: var(--space-2); }
.efta-card__body { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.efta-card__body--flush { padding: 0; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-card-css")) {
  const s = document.createElement("style");
  s.id = "efta-card-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Panel container with optional header (eyebrow + title + actions). */
function Card({
  variant = "default",
  eyebrow,
  title,
  actions,
  flush = false,
  className = "",
  bodyClassName = "",
  children,
  ...rest
}) {
  const cls = ["efta-card", variant !== "default" ? `efta-card--${variant}` : "", className].filter(Boolean).join(" ");
  const hasHead = eyebrow || title || actions;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), hasHead ? /*#__PURE__*/React.createElement("div", {
    className: "efta-card__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-card__titles"
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "efta-card__eyebrow"
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("span", {
    className: "efta-card__title"
  }, title) : null), actions ? /*#__PURE__*/React.createElement("div", {
    className: "efta-card__actions"
  }, actions) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: ["efta-card__body", flush ? "efta-card__body--flush" : "", bodyClassName].filter(Boolean).join(" ")
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-iconbtn {
  --_s: 34px;
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--_s); height: var(--_s); flex: none; padding: 0;
  border: 1px solid transparent; border-radius: var(--radius-sm);
  background: transparent; color: var(--text-secondary); cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.efta-iconbtn:hover:not([disabled]) { background: var(--bg-hover); color: var(--text-primary); }
.efta-iconbtn:focus-visible { outline: none; box-shadow: var(--ring-focus); }
.efta-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; }
.efta-iconbtn--sm { --_s: 28px; }
.efta-iconbtn--lg { --_s: 40px; }
.efta-iconbtn--bordered { border-color: var(--border-strong); background: var(--bg-raised); box-shadow: var(--shadow-sm); }
.efta-iconbtn--active { background: var(--accent-tint); color: var(--accent); border-color: transparent; }
.efta-iconbtn__ico { display: inline-flex; }
.efta-iconbtn--sm .efta-iconbtn__ico svg { width: 15px; height: 15px; }
.efta-iconbtn__ico svg { width: 17px; height: 17px; display: block; }
.efta-iconbtn--lg .efta-iconbtn__ico svg { width: 19px; height: 19px; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-iconbtn-css")) {
  const s = document.createElement("style");
  s.id = "efta-iconbtn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Square icon-only button for toolbars and row actions. */
function IconButton({
  size = "md",
  bordered = false,
  active = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["efta-iconbtn", size !== "md" ? `efta-iconbtn--${size}` : "", bordered ? "efta-iconbtn--bordered" : "", active ? "efta-iconbtn--active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    disabled: disabled
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "efta-iconbtn__ico"
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-stat { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.efta-stat__label {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--text-muted);
  display: flex; align-items: center; gap: 6px;
}
.efta-stat__label svg { width: 13px; height: 13px; }
.efta-stat__value {
  font-family: var(--font-mono); font-variant-numeric: tabular-nums;
  font-size: var(--text-2xl); font-weight: var(--weight-medium); line-height: 1;
  letter-spacing: var(--tracking-tight); color: var(--text-primary); display: flex; align-items: baseline; gap: 6px;
}
.efta-stat--sm .efta-stat__value { font-size: var(--text-lg); }
.efta-stat__unit { font-size: var(--text-sm); color: var(--text-faint); font-weight: var(--weight-regular); }
.efta-stat__delta { font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--weight-medium); }
.efta-stat--accent .efta-stat__value { color: var(--accent); }
.efta-stat__foot { font-size: var(--text-xs); color: var(--text-faint); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-stat-css")) {
  const s = document.createElement("style");
  s.id = "efta-stat-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const TONE = {
  default: "var(--text-primary)",
  accent: "var(--accent)",
  downloaded: "var(--state-downloaded)",
  conflict: "var(--state-conflict)",
  unmatched: "var(--state-unmatched)",
  error: "var(--state-error)"
};

/** Metric readout — mono tabular value with label + optional unit/footnote. */
function Stat({
  label,
  value,
  unit,
  icon,
  tone = "default",
  size = "md",
  foot,
  className = "",
  ...rest
}) {
  const cls = ["efta-stat", size === "sm" ? "efta-stat--sm" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "efta-stat__label"
  }, icon, label), /*#__PURE__*/React.createElement("span", {
    className: "efta-stat__value",
    style: {
      color: TONE[tone] || TONE.default
    }
  }, /*#__PURE__*/React.createElement("span", null, value), unit ? /*#__PURE__*/React.createElement("span", {
    className: "efta-stat__unit"
  }, unit) : null), foot ? /*#__PURE__*/React.createElement("span", {
    className: "efta-stat__foot"
  }, foot) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/LogLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-log {
  display: flex; align-items: flex-start; gap: 10px;
  font-family: var(--font-mono); font-size: var(--text-xs); line-height: 1.55;
  padding: 2px 12px; border-radius: var(--radius-xs);
}
.efta-log:hover { background: rgba(255,255,255,0.025); }
.efta-log__time { color: var(--text-disabled); flex: none; font-variant-numeric: tabular-nums; }
.efta-log__mark { flex: none; width: 14px; text-align: center; color: var(--_c, var(--text-muted)); font-weight: var(--weight-medium); }
.efta-log__msg { color: var(--text-secondary); min-width: 0; word-break: break-word; }
.efta-log__msg b { color: var(--text-primary); font-weight: var(--weight-medium); }
.efta-log--success .efta-log__msg b { color: var(--state-downloaded); }
.efta-log--error .efta-log__msg { color: var(--state-error); }
.efta-log--warn .efta-log__msg { color: var(--orange-500); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-log-css")) {
  const s = document.createElement("style");
  s.id = "efta-log-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const LEVELS = {
  success: {
    mark: "\u2713",
    c: "var(--state-downloaded)"
  },
  // ✓
  info: {
    mark: "\u2022",
    c: "var(--state-info)"
  },
  // •
  fetch: {
    mark: "\u00bb",
    c: "var(--state-info)"
  },
  // »
  down: {
    mark: "\u2193",
    c: "var(--accent)"
  },
  // ↓
  skip: {
    mark: "\u00bb",
    c: "var(--text-disabled)"
  },
  // »
  warn: {
    mark: "\u26a0",
    c: "var(--orange-500)"
  },
  // ⚠
  error: {
    mark: "\u2715",
    c: "var(--state-error)"
  },
  // ✕
  conflict: {
    mark: "\u0394",
    c: "var(--state-conflict)"
  } // Δ
};

/** One line of the live crawl log. `message` may contain JSX (wrap names in <b>). */
function LogLine({
  level = "info",
  time,
  message,
  className = "",
  ...rest
}) {
  const lv = LEVELS[level] || LEVELS.info;
  const cls = ["efta-log", `efta-log--${level}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: {
      "--_c": lv.c
    }
  }, rest), time != null ? /*#__PURE__*/React.createElement("span", {
    className: "efta-log__time"
  }, time) : null, /*#__PURE__*/React.createElement("span", {
    className: "efta-log__mark"
  }, lv.mark), /*#__PURE__*/React.createElement("span", {
    className: "efta-log__msg"
  }, message));
}
Object.assign(__ds_scope, { LogLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LogLine.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-prog { display: flex; flex-direction: column; gap: 7px; width: 100%; }
.efta-prog__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.efta-prog__label { font-size: var(--text-sm); color: var(--text-secondary); font-weight: var(--weight-medium); }
.efta-prog__val { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: var(--text-xs); color: var(--text-muted); }
.efta-prog__track {
  position: relative; width: 100%; height: var(--_h, 8px);
  background: var(--bg-sunken); border-radius: var(--radius-pill);
  overflow: hidden; box-shadow: var(--shadow-inset);
}
.efta-prog__fill {
  position: absolute; left: 0; top: 0; bottom: 0;
  background: var(--_c, var(--accent)); border-radius: var(--radius-pill);
  transition: width var(--dur-slow) var(--ease-out);
}
.efta-prog--glow .efta-prog__fill { box-shadow: var(--glow-active); }
.efta-prog__fill--stripe {
  background-image: linear-gradient(135deg, rgba(255,255,255,0.16) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.16) 75%, transparent 75%);
  background-size: 16px 16px; animation: efta-prog-stripe 0.8s linear infinite;
}
@keyframes efta-prog-stripe { from { background-position: 0 0; } to { background-position: 16px 0; } }
.efta-prog--indet .efta-prog__fill { width: 35% !important; animation: efta-prog-indet 1.3s var(--ease-in-out) infinite; }
@keyframes efta-prog-indet { 0% { left: -35%; } 100% { left: 100%; } }
@media (prefers-reduced-motion: reduce) {
  .efta-prog__fill--stripe { animation: none; }
  .efta-prog--indet .efta-prog__fill { animation-duration: 2.4s; }
}
`;
if (typeof document !== "undefined" && !document.getElementById("efta-prog-css")) {
  const s = document.createElement("style");
  s.id = "efta-prog-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const TONE = {
  accent: "var(--accent)",
  downloaded: "var(--state-downloaded)",
  conflict: "var(--state-conflict)",
  error: "var(--state-error)"
};

/** Linear progress / page-position indicator. */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  valueText,
  tone = "accent",
  size = "md",
  striped = false,
  glow = false,
  indeterminate = false,
  className = "",
  ...rest
}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, value / max * 100)) : 0;
  const h = size === "sm" ? "5px" : size === "lg" ? "12px" : "8px";
  const cls = ["efta-prog", glow ? "efta-prog--glow" : "", indeterminate ? "efta-prog--indet" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), label || showValue ? /*#__PURE__*/React.createElement("div", {
    className: "efta-prog__top"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "efta-prog__label"
  }, label) : /*#__PURE__*/React.createElement("span", null), showValue ? /*#__PURE__*/React.createElement("span", {
    className: "efta-prog__val"
  }, valueText != null ? valueText : `${Math.round(pct)}%`) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "efta-prog__track",
    style: {
      "--_h": h
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: ["efta-prog__fill", striped ? "efta-prog__fill--stripe" : ""].filter(Boolean).join(" "),
    style: {
      width: indeterminate ? undefined : `${pct}%`,
      "--_c": TONE[tone] || TONE.accent
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-status {
  display: inline-flex; align-items: center; gap: 6px;
  height: 21px; padding: 0 9px 0 7px; border-radius: var(--radius-pill);
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide); text-transform: uppercase; white-space: nowrap; line-height: 1;
  color: var(--_c); background: var(--_bg); border: 1px solid transparent;
}
.efta-status--outline { background: transparent; border-color: var(--_c); }
.efta-status__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--_c); flex: none; }
.efta-status--pulse .efta-status__dot { animation: efta-status-pulse 1.4s var(--ease-in-out) infinite; }
@keyframes efta-status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--_c); opacity: 1; }
  50% { box-shadow: 0 0 0 3px transparent; opacity: 0.6; }
}
@media (prefers-reduced-motion: reduce) { .efta-status--pulse .efta-status__dot { animation: none; } }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-status-css")) {
  const s = document.createElement("style");
  s.id = "efta-status-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const MAP = {
  downloaded: {
    c: "var(--state-downloaded)",
    bg: "var(--state-downloaded-tint)",
    label: "Downloaded"
  },
  duplicate: {
    c: "var(--state-duplicate)",
    bg: "var(--state-duplicate-tint)",
    label: "Duplicate"
  },
  conflict: {
    c: "var(--state-conflict)",
    bg: "var(--state-conflict-tint)",
    label: "Conflict"
  },
  unmatched: {
    c: "var(--state-unmatched)",
    bg: "var(--state-unmatched-tint)",
    label: "Unmatched"
  },
  error: {
    c: "var(--state-error)",
    bg: "var(--state-error-tint)",
    label: "Error"
  },
  forbidden: {
    c: "var(--state-error)",
    bg: "var(--state-error-tint)",
    label: "403"
  },
  queued: {
    c: "var(--text-muted)",
    bg: "var(--slate-tint)",
    label: "Queued"
  },
  active: {
    c: "var(--accent)",
    bg: "var(--accent-tint)",
    label: "Active"
  }
};

/** Pill mapping a file/crawl outcome to its semantic color. */
function StatusBadge({
  status = "downloaded",
  label,
  outline = false,
  pulse = false,
  dot = true,
  className = "",
  ...rest
}) {
  const m = MAP[status] || MAP.downloaded;
  const cls = ["efta-status", outline ? "efta-status--outline" : "", pulse ? "efta-status--pulse" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      "--_c": m.c,
      "--_bg": m.bg
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "efta-status__dot"
  }) : null, label != null ? label : m.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-check { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; -webkit-user-select: none; user-select: none; }
.efta-check--disabled { opacity: 0.5; cursor: not-allowed; }
.efta-check__box {
  flex: none; width: 17px; height: 17px; border-radius: var(--radius-xs);
  background: var(--bg-input); border: 1px solid var(--border-strong); box-shadow: var(--shadow-inset);
  display: flex; align-items: center; justify-content: center; color: var(--accent-fg);
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.efta-check__box svg { width: 12px; height: 12px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.efta-check__input { position: absolute; opacity: 0; width: 0; height: 0; }
.efta-check__input:checked + .efta-check__box { background: var(--accent); border-color: var(--accent); }
.efta-check__input:checked + .efta-check__box svg { opacity: 1; transform: scale(1); }
.efta-check__input:indeterminate + .efta-check__box { background: var(--accent); border-color: var(--accent); }
.efta-check__input:focus-visible + .efta-check__box { box-shadow: var(--shadow-inset), 0 0 0 3px var(--focus-ring); }
.efta-check__label { font-size: var(--text-sm); color: var(--text-primary); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-check-css")) {
  const s = document.createElement("style");
  s.id = "efta-check-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Checkbox for multi-select / row selection. */
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return /*#__PURE__*/React.createElement("label", {
    className: ["efta-check", disabled ? "efta-check--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    className: "efta-check__input",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "efta-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label ? /*#__PURE__*/React.createElement("span", {
    className: "efta-check__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/NumberField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-num { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.efta-num__label { font-size: var(--text-xs); font-weight: var(--weight-medium); color: var(--text-secondary); }
.efta-num__wrap {
  display: flex; align-items: stretch; height: 34px;
  background: var(--bg-input); border: 1px solid var(--border-input); border-radius: var(--radius-sm);
  box-shadow: var(--shadow-inset); overflow: hidden;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.efta-num__wrap:hover { border-color: var(--border-strong); }
.efta-num__wrap:focus-within { border-color: var(--accent); box-shadow: var(--shadow-inset), 0 0 0 3px var(--focus-ring); }
.efta-num__input {
  flex: 1; min-width: 0; width: 100%; border: none; background: transparent; outline: none;
  color: var(--text-primary); font-family: var(--font-mono); font-variant-numeric: tabular-nums;
  font-size: var(--text-sm); padding: 0 4px 0 11px; -moz-appearance: textfield;
}
.efta-num__input::-webkit-outer-spin-button, .efta-num__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.efta-num__unit { display: flex; align-items: center; font-family: var(--font-mono); font-size: var(--text-2xs); color: var(--text-faint); padding-right: 8px; flex: none; }
.efta-num__steppers { display: flex; flex-direction: column; border-left: 1px solid var(--border-default); flex: none; }
.efta-num__step {
  flex: 1; width: 26px; display: flex; align-items: center; justify-content: center;
  background: var(--bg-raised); border: none; color: var(--text-muted); cursor: pointer; padding: 0;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.efta-num__step:hover { background: var(--bg-hover); color: var(--text-primary); }
.efta-num__step:active { background: var(--accent-tint); color: var(--accent); }
.efta-num__step:first-child { border-bottom: 1px solid var(--border-default); }
.efta-num__step svg { width: 11px; height: 11px; }
.efta-num__hint { font-size: var(--text-2xs); color: var(--text-faint); }
.efta-num--disabled { opacity: 0.5; pointer-events: none; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-num-css")) {
  const s = document.createElement("style");
  s.id = "efta-num-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const CHEV_UP = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m18 15-6-6-6 6"
}));
const CHEV_DOWN = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));

/** Numeric input with steppers + unit. Controlled via value/onChange(number). */
function NumberField({
  label,
  value = 0,
  min,
  max,
  step = 1,
  unit,
  hint,
  disabled = false,
  onChange,
  className = "",
  ...rest
}) {
  const clamp = n => {
    if (typeof min === "number") n = Math.max(min, n);
    if (typeof max === "number") n = Math.min(max, n);
    return n;
  };
  const set = n => {
    if (onChange && !Number.isNaN(n)) onChange(clamp(n));
  };
  const dec = Math.max(0, (String(step).split(".")[1] || "").length);
  return /*#__PURE__*/React.createElement("div", {
    className: ["efta-num", disabled ? "efta-num--disabled" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "efta-num__label"
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "efta-num__wrap"
  }, /*#__PURE__*/React.createElement("input", _extends({
    className: "efta-num__input",
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => set(parseFloat(e.target.value))
  }, rest)), unit ? /*#__PURE__*/React.createElement("span", {
    className: "efta-num__unit"
  }, unit) : null, /*#__PURE__*/React.createElement("div", {
    className: "efta-num__steppers"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "efta-num__step",
    tabIndex: -1,
    "aria-label": "Increase",
    onClick: () => set(parseFloat((value + step).toFixed(dec)))
  }, CHEV_UP), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "efta-num__step",
    tabIndex: -1,
    "aria-label": "Decrease",
    onClick: () => set(parseFloat((value - step).toFixed(dec)))
  }, CHEV_DOWN))), hint ? /*#__PURE__*/React.createElement("span", {
    className: "efta-num__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { NumberField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NumberField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-select { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.efta-select__label { font-size: var(--text-xs); font-weight: var(--weight-medium); color: var(--text-secondary); }
.efta-select__wrap { position: relative; display: flex; align-items: center; }
.efta-select__el {
  appearance: none; -webkit-appearance: none; width: 100%; height: 34px;
  padding: 0 34px 0 11px; background: var(--bg-input); color: var(--text-primary);
  border: 1px solid var(--border-input); border-radius: var(--radius-sm); box-shadow: var(--shadow-inset);
  font-family: var(--font-sans); font-size: var(--text-sm); cursor: pointer; outline: none;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.efta-select__el:hover { border-color: var(--border-strong); }
.efta-select__el:focus-visible { border-color: var(--accent); box-shadow: var(--shadow-inset), 0 0 0 3px var(--focus-ring); }
.efta-select--mono .efta-select__el { font-family: var(--font-mono); }
.efta-select__chev { position: absolute; right: 11px; pointer-events: none; color: var(--text-muted); display: flex; }
.efta-select__chev svg { width: 15px; height: 15px; }
.efta-select__el:disabled { opacity: 0.5; cursor: not-allowed; }
.efta-select__hint { font-size: var(--text-2xs); color: var(--text-faint); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-select-css")) {
  const s = document.createElement("style");
  s.id = "efta-select-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Styled native select. `options`: [{ value, label }] or string[]. */
function Select({
  label,
  options = [],
  hint,
  mono = false,
  className = "",
  id,
  ...selectProps
}) {
  const fid = id || (label ? `s-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    className: ["efta-select", mono ? "efta-select--mono" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "efta-select__label",
    htmlFor: fid
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "efta-select__wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "efta-select__el"
  }, selectProps), opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: String(o.value),
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    className: "efta-select__chev"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })))), hint ? /*#__PURE__*/React.createElement("span", {
    className: "efta-select__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-switch { display: flex; align-items: flex-start; gap: 11px; cursor: pointer; -webkit-user-select: none; user-select: none; }
.efta-switch--disabled { opacity: 0.5; cursor: not-allowed; }
.efta-switch__track {
  position: relative; flex: none; width: 36px; height: 20px; margin-top: 1px;
  background: var(--bg-sunken); border: 1px solid var(--border-strong); border-radius: var(--radius-pill);
  box-shadow: var(--shadow-inset); transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.efta-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%;
  background: var(--text-muted); box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.efta-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.efta-switch__input:checked + .efta-switch__track { background: var(--accent); border-color: var(--accent); }
.efta-switch__input:checked + .efta-switch__track .efta-switch__thumb { transform: translateX(16px); background: var(--accent-fg); }
.efta-switch__input:focus-visible + .efta-switch__track { box-shadow: var(--shadow-inset), 0 0 0 3px var(--focus-ring); }
.efta-switch__text { display: flex; flex-direction: column; gap: 2px; }
.efta-switch__label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-primary); line-height: 1.3; }
.efta-switch__desc { font-size: var(--text-xs); color: var(--text-faint); line-height: 1.4; }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-switch-css")) {
  const s = document.createElement("style");
  s.id = "efta-switch-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Toggle switch for binary settings (httpx on/off, resume, dry-run). */
function Switch({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["efta-switch", disabled ? "efta-switch--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    className: "efta-switch__input",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "efta-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "efta-switch__thumb"
  })), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "efta-switch__text"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "efta-switch__label"
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    className: "efta-switch__desc"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.efta-field__label { font-size: var(--text-xs); font-weight: var(--weight-medium); color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }
.efta-field__req { color: var(--accent); }
.efta-field__wrap {
  display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 11px;
  background: var(--bg-input); border: 1px solid var(--border-input); border-radius: var(--radius-sm);
  box-shadow: var(--shadow-inset); transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.efta-field__wrap:hover { border-color: var(--border-strong); }
.efta-field__wrap:focus-within { border-color: var(--accent); box-shadow: var(--shadow-inset), 0 0 0 3px var(--focus-ring); }
.efta-field--error .efta-field__wrap { border-color: var(--state-error); }
.efta-field--error .efta-field__wrap:focus-within { box-shadow: var(--shadow-inset), 0 0 0 3px var(--red-tint); }
.efta-field__input {
  flex: 1; min-width: 0; height: 100%; border: none; background: transparent; outline: none;
  color: var(--text-primary); font-family: var(--font-sans); font-size: var(--text-sm);
}
.efta-field--mono .efta-field__input { font-family: var(--font-mono); }
.efta-field__input::placeholder { color: var(--text-disabled); }
.efta-field__input:disabled { cursor: not-allowed; }
.efta-field--disabled .efta-field__wrap { opacity: 0.5; }
.efta-field__affix { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); flex: none; white-space: nowrap; }
.efta-field__affix svg { width: 15px; height: 15px; display: block; }
.efta-field__hint { font-size: var(--text-2xs); color: var(--text-faint); }
.efta-field--error .efta-field__hint { color: var(--state-error); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-field-css")) {
  const s = document.createElement("style");
  s.id = "efta-field-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Single-line text input with label, prefix/suffix affixes, and hint. */
function TextField({
  label,
  required = false,
  prefix,
  suffix,
  hint,
  error,
  mono = false,
  disabled = false,
  className = "",
  id,
  ...inputProps
}) {
  const fid = id || (label ? `f-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const cls = ["efta-field", mono ? "efta-field--mono" : "", error ? "efta-field--error" : "", disabled ? "efta-field--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "efta-field__label",
    htmlFor: fid
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "efta-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "efta-field__wrap"
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    className: "efta-field__affix"
  }, prefix) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "efta-field__input",
    disabled: disabled
  }, inputProps)), suffix ? /*#__PURE__*/React.createElement("span", {
    className: "efta-field__affix"
  }, suffix) : null), hint || error ? /*#__PURE__*/React.createElement("span", {
    className: "efta-field__hint"
  }, error || hint) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.efta-tabs { display: flex; align-items: stretch; gap: 2px; }
.efta-tabs--underline { gap: 4px; border-bottom: 1px solid var(--border-default); }
.efta-tabs--pill { gap: 3px; padding: 3px; background: var(--bg-sunken); border-radius: var(--radius-md); border: 1px solid var(--border-faint); }
.efta-tab {
  display: inline-flex; align-items: center; gap: 7px; height: 32px; padding: 0 13px;
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  color: var(--text-muted); background: transparent; border: none; cursor: pointer;
  border-radius: var(--radius-sm); white-space: nowrap; position: relative;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.efta-tab:hover { color: var(--text-secondary); }
.efta-tab svg { width: 15px; height: 15px; }
.efta-tab__count {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-variant-numeric: tabular-nums;
  padding: 1px 6px; border-radius: var(--radius-pill); background: var(--bg-hover); color: var(--text-muted);
}
.efta-tabs--pill .efta-tab[aria-selected="true"] { background: var(--bg-raised); color: var(--text-primary); box-shadow: var(--shadow-sm); }
.efta-tabs--underline .efta-tab { border-radius: 0; height: 38px; padding: 0 4px; margin-bottom: -1px; }
.efta-tabs--underline .efta-tab::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--accent); border-radius: 2px 2px 0 0; transform: scaleX(0);
  transition: transform var(--dur-base) var(--ease-out);
}
.efta-tabs--underline .efta-tab[aria-selected="true"] { color: var(--text-primary); }
.efta-tabs--underline .efta-tab[aria-selected="true"]::after { transform: scaleX(1); }
.efta-tab[aria-selected="true"] .efta-tab__count { background: var(--accent-tint); color: var(--accent); }
.efta-tab:focus-visible { outline: none; box-shadow: var(--ring-focus); }
`;
if (typeof document !== "undefined" && !document.getElementById("efta-tabs-css")) {
  const s = document.createElement("style");
  s.id = "efta-tabs-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Tab strip. `items`: [{ id, label, icon?, count? }]. Controlled via `value` + `onChange`.
 */
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  className = "",
  ...rest
}) {
  const cls = ["efta-tabs", `efta-tabs--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "tablist"
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    "aria-selected": value === it.id,
    className: "efta-tab",
    onClick: () => onChange && onChange(it.id)
  }, it.icon, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "efta-tab__count"
  }, it.count) : null)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/App.jsx
try { (() => {
/* EFTA-DL console — app shell (sidebar + topbar + statusbar + view routing). */
const DS = window.EFTADLDesignSystem_0e4e9e;
const IC = window.EFTAIcons;
const D = window.EFTAData;
const SHELL_CSS = `
.efta-app { display: grid; grid-template-columns: var(--sidebar-w) 1fr; grid-template-rows: var(--topbar-h) 1fr var(--statusbar-h);
  height: 100%; min-height: 100%; background: var(--bg-app); color: var(--text-primary); }
.efta-side { grid-row: 1 / 4; display: flex; flex-direction: column; background: var(--bg-sunken);
  border-right: 1px solid var(--border-default); }
.efta-brand { display: flex; align-items: center; gap: 10px; padding: 14px 16px; height: var(--topbar-h); border-bottom: 1px solid var(--border-default); }
.efta-brand__mark { width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--accent);
  display: flex; align-items: center; justify-content: center; flex: none; box-shadow: var(--glow-active); }
.efta-brand__mark svg { color: var(--accent-fg); }
.efta-brand__name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
.efta-brand__name .dl { color: var(--accent); }
.efta-brand__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-faint); margin-top: 1px; }
.efta-nav { display: flex; flex-direction: column; gap: 2px; padding: 10px; flex: 1; }
.efta-nav__sec { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-disabled); padding: 12px 10px 6px; }
.efta-nav__item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--radius-sm);
  color: var(--text-muted); font-size: 13px; font-weight: 500; cursor: pointer; border: none; background: transparent; width: 100%; text-align: left;
  transition: background var(--dur-fast), color var(--dur-fast); }
.efta-nav__item:hover { background: var(--bg-hover); color: var(--text-primary); }
.efta-nav__item--active { background: var(--accent-tint); color: var(--accent); }
.efta-nav__item--active svg { color: var(--accent); }
.efta-nav__item .efta-nav__count { margin-left: auto; font-family: var(--font-mono); font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-faint); }
.efta-nav__item--active .efta-nav__count { color: var(--accent); }
.efta-side__foot { padding: 12px; border-top: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 10px; }
.efta-ds-card { background: var(--bg-panel); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 11px 12px; }
.efta-ds-card__top { display: flex; align-items: center; justify-content: space-between; }
.efta-ds-card__lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-faint); }
.efta-ds-card__val { font-family: var(--font-mono); font-size: 18px; font-weight: 500; color: var(--text-primary); margin-top: 3px; }

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
`;
function injectShell() {
  if (!document.getElementById("efta-shell-css")) {
    const s = document.createElement("style");
    s.id = "efta-shell-css";
    s.textContent = SHELL_CSS;
    document.head.appendChild(s);
  }
}
const VIEWS = [{
  id: "dashboard",
  label: "Dashboard",
  icon: IC.Activity,
  title: "Active crawl",
  crumb: "dataset 12 · running"
}, {
  id: "new",
  label: "New download",
  icon: IC.Download,
  title: "New download",
  crumb: "configure a crawl"
}, {
  id: "files",
  label: "Files",
  icon: IC.Files,
  title: "Files",
  crumb: "downloads/",
  count: "12.8k"
}, {
  id: "conflicts",
  label: "Conflicts",
  icon: IC.Compare,
  title: "Conflict review",
  crumb: "conflicts/",
  count: 31
}, {
  id: "settings",
  label: "Settings",
  icon: IC.Settings,
  title: "Settings",
  crumb: "preferences"
}];
function NavItem({
  v,
  active,
  onClick
}) {
  const Icon = v.icon;
  return /*#__PURE__*/React.createElement("button", {
    className: "efta-nav__item" + (active ? " efta-nav__item--active" : ""),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 17
  }), v.label, v.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "efta-nav__count"
  }, v.count) : null);
}
function App() {
  injectShell();
  const [view, setView] = React.useState("dashboard");
  const [running, setRunning] = React.useState(true);
  const cur = VIEWS.find(v => v.id === view);
  const start = cfg => {
    setRunning(true);
    setView("dashboard");
  };
  let Screen = null;
  if (view === "dashboard") Screen = /*#__PURE__*/React.createElement(window.EFTADashboard, {
    running: running,
    setRunning: setRunning,
    go: setView
  });else if (view === "new") Screen = /*#__PURE__*/React.createElement(window.EFTANewDownload, {
    onStart: start
  });else if (view === "files") Screen = /*#__PURE__*/React.createElement(window.EFTAFiles, null);else if (view === "conflicts") Screen = /*#__PURE__*/React.createElement(window.EFTAConflicts, null);else if (view === "settings") Screen = /*#__PURE__*/React.createElement(window.EFTASettings, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "efta-app"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "efta-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-brand__mark"
  }, /*#__PURE__*/React.createElement(IC.Download, {
    size: 17,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "efta-brand__name"
  }, "EFTA", /*#__PURE__*/React.createElement("span", {
    className: "dl"
  }, "\xB7DL")), /*#__PURE__*/React.createElement("div", {
    className: "efta-brand__tag"
  }, "Disclosure Downloader"))), /*#__PURE__*/React.createElement("nav", {
    className: "efta-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-nav__sec"
  }, "Operate"), VIEWS.slice(0, 2).map(v => /*#__PURE__*/React.createElement(NavItem, {
    key: v.id,
    v: v,
    active: view === v.id,
    onClick: () => setView(v.id)
  })), /*#__PURE__*/React.createElement("div", {
    className: "efta-nav__sec"
  }, "Library"), VIEWS.slice(2, 4).map(v => /*#__PURE__*/React.createElement(NavItem, {
    key: v.id,
    v: v,
    active: view === v.id,
    onClick: () => setView(v.id)
  })), /*#__PURE__*/React.createElement("div", {
    className: "efta-nav__sec"
  }, "System"), VIEWS.slice(4).map(v => /*#__PURE__*/React.createElement(NavItem, {
    key: v.id,
    v: v,
    active: view === v.id,
    onClick: () => setView(v.id)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "efta-side__foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-ds-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "efta-ds-card__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "efta-ds-card__lbl"
  }, "Active dataset"), /*#__PURE__*/React.createElement(DS.Badge, {
    variant: "accent"
  }, running ? "live" : "idle")), /*#__PURE__*/React.createElement("div", {
    className: "efta-ds-card__val"
  }, "data-set-12")), /*#__PURE__*/React.createElement("div", {
    className: "efta-status__item",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IC.Database, {
    size: 13
  }), " downloads.db \xB7 1.4 GB"))), /*#__PURE__*/React.createElement("header", {
    className: "efta-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "efta-top__title"
  }, cur.title), /*#__PURE__*/React.createElement("span", {
    className: "efta-top__crumb"
  }, "/ ", cur.crumb), /*#__PURE__*/React.createElement("div", {
    className: "efta-top__spacer"
  }), running ? /*#__PURE__*/React.createElement("div", {
    className: "efta-top__live"
  }, /*#__PURE__*/React.createElement(DS.StatusBadge, {
    status: "active",
    pulse: true,
    label: "Crawling"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, "page 9,209")) : /*#__PURE__*/React.createElement("div", {
    className: "efta-top__live"
  }, /*#__PURE__*/React.createElement(DS.StatusBadge, {
    status: "queued",
    label: "Idle",
    dot: true
  })), running ? /*#__PURE__*/React.createElement(DS.Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(IC.Pause, {
      size: 15
    }),
    onClick: () => setRunning(false)
  }, "Pause") : /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(IC.Play, {
      size: 15
    }),
    onClick: () => setRunning(true)
  }, "Resume")), /*#__PURE__*/React.createElement("main", {
    className: "efta-main"
  }, Screen), /*#__PURE__*/React.createElement("footer", {
    className: "efta-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "efta-status__dot"
  }), " ", running ? "Crawling" : "Idle"), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, /*#__PURE__*/React.createElement(IC.Server, null), " httpx \xB7 HTTP/2"), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, /*#__PURE__*/React.createElement(IC.Zap, null), " 10 workers"), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, /*#__PURE__*/React.createElement(IC.Clock, null), " 0.4s delay"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, "justice.gov/epstein"), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__sep"
  }), /*#__PURE__*/React.createElement("span", {
    className: "efta-status__item"
  }, "resume: on")));
}
window.EFTAApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Conflicts.jsx
try { (() => {
/* Conflicts — side-by-side compare review. */
(function () {
  const DS = window.EFTADLDesignSystem_0e4e9e;
  const IC = window.EFTAIcons;
  const D = window.EFTAData;
  const CSS = `
.cf { display: grid; grid-template-columns: 300px 1fr; height: 100%; }
.cf__list { border-right: 1px solid var(--border-default); overflow: auto; background: var(--bg-sunken); }
.cf__head { padding: 13px 16px; border-bottom: 1px solid var(--border-default); display: flex; align-items: center; gap: 8px; }
.cf__item { padding: 12px 16px; border-bottom: 1px solid var(--border-faint); cursor: pointer; }
.cf__item:hover { background: var(--bg-hover); }
.cf__item--on { background: var(--accent-tint); box-shadow: inset 2px 0 0 var(--accent); }
.cf__item__nm { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); }
.cf__item__meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); margin-top: 3px; }
.cf__item__note { font-size: 12px; color: var(--text-muted); margin-top: 5px; }
.cf__main { display: flex; flex-direction: column; min-width: 0; overflow: auto; }
.cf__bar { padding: 14px 20px; border-bottom: 1px solid var(--border-default); display: flex; align-items: center; gap: 12px; }
.cf__legend { display: flex; gap: 14px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
.cf__legend span { display: flex; align-items: center; gap: 5px; }
.cf__legend i { width: 9px; height: 9px; border-radius: 2px; }
.cf__compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 20px; }
.cf__doc { border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-lg); }
.cf__doc__bar { display: flex; align-items: center; gap: 8px; padding: 9px 13px; font-family: var(--font-mono); font-size: 11px; }
.cf__page { background: var(--bg-panel); padding: 22px 24px; min-height: 360px; }
.cf__line { height: 9px; border-radius: 2px; background: var(--text-disabled); opacity: .5; margin-bottom: 11px; }
.cf__line--add { background: var(--state-downloaded); opacity: .85; box-shadow: -6px 0 0 var(--state-downloaded), 0 0 0 1px var(--green-tint); }
.cf__line--del { background: var(--state-conflict); opacity: .85; box-shadow: -6px 0 0 var(--state-conflict); }
.cf__redact { height: 13px; border-radius: 2px; background: #1a1a1a; margin-bottom: 11px; }
`;
  if (!document.getElementById("efta-cf-css")) {
    const s = document.createElement("style");
    s.id = "efta-cf-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function Lines({
    which
  }) {
    // a simple mocked page of redacted text with diff markers
    const rows = which === "orig" ? [["", 70], ["", 95], ["", 60], ["redact", 0], ["", 88], ["", 75], ["del", 65], ["del", 82], ["", 90], ["", 55], ["", 80], ["", 92], ["", 48]] : [["", 70], ["", 95], ["", 60], ["redact", 0], ["", 88], ["", 75], ["redact", 0], ["add", 70], ["", 90], ["", 55], ["", 80], ["", 92], ["", 48]];
    return /*#__PURE__*/React.createElement("div", {
      className: "cf__page theme-paper"
    }, rows.map((r, i) => r[0] === "redact" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "cf__redact",
      style: {
        width: 50 + i * 7 % 45 + "%"
      }
    }) : /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "cf__line" + (r[0] ? " cf__line--" + r[0] : ""),
      style: {
        width: r[1] + "%"
      }
    })));
  }
  function Conflicts() {
    const [sel, setSel] = React.useState(0);
    const c = D.conflicts[sel];
    return /*#__PURE__*/React.createElement("div", {
      className: "cf"
    }, /*#__PURE__*/React.createElement("aside", {
      className: "cf__list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__head"
    }, /*#__PURE__*/React.createElement(IC.Compare, {
      size: 16,
      style: {
        color: "var(--state-conflict)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, "31 conflicts"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DS.Badge, {
      count: true
    }, "31")), D.conflicts.map((cc, i) => /*#__PURE__*/React.createElement("div", {
      key: cc.name,
      className: "cf__item" + (i === sel ? " cf__item--on" : ""),
      onClick: () => setSel(i)
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__item__nm"
    }, cc.name), /*#__PURE__*/React.createElement("div", {
      className: "cf__item__meta"
    }, "page ", cc.page, " \xB7 ", cc.pages_changed, " pages changed \xB7 ", cc.when), /*#__PURE__*/React.createElement("div", {
      className: "cf__item__note"
    }, cc.note)))), /*#__PURE__*/React.createElement("section", {
      className: "cf__main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__bar"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        fontWeight: 500
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--text-faint)",
        marginTop: 2
      }
    }, "conflicts/page_", c.page, "/ \xB7 ", c.pages_changed, " pages changed")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "cf__legend"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: "var(--state-conflict)"
      }
    }), " removed"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: "var(--state-downloaded)"
      }
    }), " added"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: "#1a1a1a"
      }
    }), " redacted")), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.External, {
        size: 15
      })
    }, "Visual PDF")), /*#__PURE__*/React.createElement("div", {
      className: "cf__compare"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__doc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__doc__bar",
      style: {
        background: "var(--blue-tint)",
        color: "var(--state-info)"
      }
    }, /*#__PURE__*/React.createElement(IC.FileText, {
      size: 14
    }), " ORIGINAL \xB7 part_1/page_", c.page, "/"), /*#__PURE__*/React.createElement(Lines, {
      which: "orig"
    })), /*#__PURE__*/React.createElement("div", {
      className: "cf__doc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cf__doc__bar",
      style: {
        background: "var(--orange-tint)",
        color: "var(--state-conflict)"
      }
    }, /*#__PURE__*/React.createElement(IC.FileText, {
      size: 14
    }), " CONFLICT \xB7 conflicts/page_", c.page, "/"), /*#__PURE__*/React.createElement(Lines, {
      which: "conf"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px 20px",
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-faint)"
      }
    }, /*#__PURE__*/React.createElement(IC.Hash, {
      size: 12,
      style: {
        verticalAlign: "-2px"
      }
    }), " a3f9c1e8 \u2192 b74d94b7 \xB7 2 lines removed, 1 added"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "ghost",
      size: "sm"
    }, "Keep original"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.FileText, {
        size: 15
      })
    }, "Open text diff"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "primary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.Check, {
        size: 15
      })
    }, "Accept new version"))));
  }
  window.EFTAConflicts = Conflicts;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Conflicts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Dashboard.jsx
try { (() => {
/* Dashboard — active crawl monitor (hero view). */
(function () {
  const DS = window.EFTADLDesignSystem_0e4e9e;
  const IC = window.EFTAIcons;
  const D = window.EFTAData;
  const CSS = `
.dash { padding: 20px; display: flex; flex-direction: column; gap: 16px; max-width: 1320px; }
.dash__stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--border-default);
  border: 1px solid var(--border-default); border-radius: var(--radius-lg); overflow: hidden; }
.dash__stat { background: var(--bg-panel); padding: 15px 18px; }
.dash__grid { display: grid; grid-template-columns: 1fr 360px; gap: 16px; align-items: start; }
.dash__console { background: var(--bg-sunken); border-radius: var(--radius-md); padding: 8px 4px; height: 380px; overflow: auto; }
.dash__side { display: flex; flex-direction: column; gap: 16px; }
.dash__conflict { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-sm); cursor: pointer; }
.dash__conflict:hover { background: var(--bg-hover); }
.dash__conflict__nm { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); }
.dash__conflict__meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.dash__strat { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.dash__strat:not(:last-child) { border-bottom: 1px solid var(--border-faint); }
.dash__strat__ic { width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--bg-raised); display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex: none; }
.dash__strat__t { font-size: 13px; color: var(--text-primary); font-weight: 500; }
.dash__strat__d { font-size: 11px; color: var(--text-faint); }
`;
  if (!document.getElementById("efta-dash-css")) {
    const s = document.createElement("style");
    s.id = "efta-dash-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function LogStream({
    running
  }) {
    const ref = React.useRef(null);
    const [lines, setLines] = React.useState(D.log.slice());
    React.useEffect(() => {
      if (!running) return;
      let i = 0;
      const extra = [{
        level: "fetch",
        t: "14:22:18",
        m: ["Fetching page ", "9,210"]
      }, {
        level: "success",
        t: "14:22:19",
        m: ["Downloaded ", "EFTA01234588.pdf", " → part_1/page_9210/"]
      }, {
        level: "success",
        t: "14:22:20",
        m: ["Downloaded ", "EFTA01234589.pdf", " → part_1/page_9210/"]
      }, {
        level: "skip",
        t: "14:22:20",
        m: ["Skipping duplicate ", "EFTA01234590.pdf"]
      }];
      const id = setInterval(() => {
        setLines(prev => [...prev, extra[i % extra.length]]);
        i++;
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
      }, 1800);
      return () => clearInterval(id);
    }, [running]);
    React.useEffect(() => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "dash__console",
      ref: ref
    }, lines.map((l, idx) => /*#__PURE__*/React.createElement(DS.LogLine, {
      key: idx,
      level: l.level,
      time: l.t,
      message: /*#__PURE__*/React.createElement(React.Fragment, null, l.m[0], l.m[1] ? /*#__PURE__*/React.createElement("b", null, l.m[1]) : null, l.m[2] || "")
    })));
  }
  function Dashboard({
    running,
    setRunning,
    go
  }) {
    const s = D.stats;
    return /*#__PURE__*/React.createElement("div", {
      className: "dash"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__stats"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__stat"
    }, /*#__PURE__*/React.createElement(DS.Stat, {
      label: "Downloaded",
      value: "12,847",
      unit: "files",
      tone: "downloaded"
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__stat"
    }, /*#__PURE__*/React.createElement(DS.Stat, {
      label: "Duplicates",
      value: "2,104",
      unit: "skipped",
      tone: "default"
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__stat"
    }, /*#__PURE__*/React.createElement(DS.Stat, {
      label: "Conflicts",
      value: "31",
      tone: "conflict",
      foot: "needs review"
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__stat"
    }, /*#__PURE__*/React.createElement(DS.Stat, {
      label: "Unmatched",
      value: "4",
      tone: "unmatched"
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__stat"
    }, /*#__PURE__*/React.createElement(DS.Stat, {
      label: "Throughput",
      value: "4.2",
      unit: "MB/s",
      tone: "accent"
    }))), /*#__PURE__*/React.createElement(DS.Card, {
      flush: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(DS.ProgressBar, {
      value: 9210,
      max: 11000,
      striped: running,
      glow: running,
      label: /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(IC.Layers, {
        size: 15
      }), " Dataset 12 \u2014 crawl progress"),
      showValue: true,
      valueText: "page 9,210 / ~11,000"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 24,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-faint)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "elapsed\xA0 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-secondary)"
      }
    }, "2h 14m")), /*#__PURE__*/React.createElement("span", null, "eta\xA0 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-secondary)"
      }
    }, "~38m")), /*#__PURE__*/React.createElement("span", null, "part\xA0 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-secondary)"
      }
    }, "part_1")), /*#__PURE__*/React.createElement("span", null, "retries\xA0 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-secondary)"
      }
    }, "3"))))), /*#__PURE__*/React.createElement("div", {
      className: "dash__grid"
    }, /*#__PURE__*/React.createElement(DS.Card, {
      flush: true,
      eyebrow: "Live log",
      title: "Crawl output",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DS.StatusBadge, {
        status: running ? "active" : "queued",
        pulse: running,
        label: running ? "streaming" : "paused"
      }), /*#__PURE__*/React.createElement(DS.IconButton, {
        "aria-label": "Clear"
      }, /*#__PURE__*/React.createElement(IC.X, {
        size: 16
      })))
    }, /*#__PURE__*/React.createElement(LogStream, {
      running: running
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__side"
    }, /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Fetch strategy",
      title: "Connection"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__ic",
      style: {
        color: "var(--state-downloaded)"
      }
    }, /*#__PURE__*/React.createElement(IC.Server, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__t"
    }, "httpx \xB7 HTTP/2"), /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__d"
    }, "primary \u2014 active")), /*#__PURE__*/React.createElement(DS.StatusBadge, {
      status: "downloaded",
      label: "on",
      dot: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "dash__strat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__ic"
    }, /*#__PURE__*/React.createElement(IC.Shield, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__t"
    }, "Playwright"), /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__d"
    }, "fallback on 403")), /*#__PURE__*/React.createElement(DS.Badge, {
      variant: "outline"
    }, "standby")), /*#__PURE__*/React.createElement("div", {
      className: "dash__strat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__ic"
    }, /*#__PURE__*/React.createElement(IC.Wifi, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__t"
    }, "requests"), /*#__PURE__*/React.createElement("div", {
      className: "dash__strat__d"
    }, "last-resort")), /*#__PURE__*/React.createElement(DS.Badge, {
      variant: "outline"
    }, "standby")))), /*#__PURE__*/React.createElement(DS.Card, {
      flush: true,
      eyebrow: "Needs review",
      title: "Recent conflicts",
      actions: /*#__PURE__*/React.createElement(DS.Button, {
        variant: "ghost",
        size: "sm",
        onClick: () => go("conflicts"),
        iconRight: /*#__PURE__*/React.createElement(IC.ChevronRight, {
          size: 14
        })
      }, "All 31")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 6
      }
    }, D.conflicts.slice(0, 4).map(c => /*#__PURE__*/React.createElement("div", {
      className: "dash__conflict",
      key: c.name,
      onClick: () => go("conflicts")
    }, /*#__PURE__*/React.createElement(IC.Compare, {
      size: 15,
      style: {
        color: "var(--state-conflict)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "dash__conflict__nm"
    }, c.name), /*#__PURE__*/React.createElement("div", {
      className: "dash__conflict__meta"
    }, "page ", c.page, " \xB7 ", c.pages_changed, " pages changed \xB7 ", c.when)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, running ? /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(IC.Pause, {
        size: 16
      }),
      onClick: () => setRunning(false)
    }, "Pause crawl") : /*#__PURE__*/React.createElement(DS.Button, {
      variant: "primary",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(IC.Play, {
        size: 16
      }),
      onClick: () => setRunning(true)
    }, "Resume crawl"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "danger",
      iconLeft: /*#__PURE__*/React.createElement(IC.Stop, {
        size: 16
      })
    }, "Stop")))));
  }
  window.EFTADashboard = Dashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Files.jsx
try { (() => {
/* Files — folder tree + file table browser. */
(function () {
  const DS = window.EFTADLDesignSystem_0e4e9e;
  const IC = window.EFTAIcons;
  const D = window.EFTAData;
  const CSS = `
.fb { display: grid; grid-template-columns: 240px 1fr; height: 100%; }
.fb__tree { border-right: 1px solid var(--border-default); padding: 14px 10px; overflow: auto; background: var(--bg-sunken); }
.fb__sec { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-disabled); padding: 8px 8px 6px; }
.fb__node { display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: var(--radius-sm); cursor: pointer; font-size: 13px; color: var(--text-secondary); }
.fb__node:hover { background: var(--bg-hover); }
.fb__node--on { background: var(--accent-tint); color: var(--accent); }
.fb__node--on svg { color: var(--accent); }
.fb__node__c { margin-left: auto; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.fb__page { display: flex; align-items: center; gap: 7px; padding: 5px 8px 5px 26px; border-radius: var(--radius-sm); cursor: pointer; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
.fb__page:hover { background: var(--bg-hover); color: var(--text-primary); }
.fb__main { display: flex; flex-direction: column; min-width: 0; }
.fb__bar { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid var(--border-default); }
.fb__tablewrap { overflow: auto; flex: 1; }
.fb__table { width: 100%; border-collapse: collapse; }
.fb__table thead th { position: sticky; top: 0; background: var(--bg-app); z-index: 1; text-align: left; padding: 9px 14px; font-family: var(--font-mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); font-weight: 500; border-bottom: 1px solid var(--border-default); }
.fb__table tbody td { padding: 9px 14px; border-bottom: 1px solid var(--border-faint); font-size: 13px; }
.fb__table tbody tr:hover { background: var(--bg-hover); }
.fb__fn { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 9px; }
.fb__mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); font-variant-numeric: tabular-nums; }
`;
  if (!document.getElementById("efta-fb-css")) {
    const s = document.createElement("style");
    s.id = "efta-fb-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function Files() {
    const [tab, setTab] = React.useState("all");
    const [node, setNode] = React.useState("part_1/page_9210");
    const files = React.useMemo(() => D.makeFiles(11, 9210), []);
    const shown = tab === "all" ? files : tab === "conflicts" ? files.filter(f => f.status === "conflict") : tab === "unmatched" ? files.filter(f => f.status === "unmatched") : files.filter(f => f.status === "error");
    return /*#__PURE__*/React.createElement("div", {
      className: "fb"
    }, /*#__PURE__*/React.createElement("aside", {
      className: "fb__tree"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fb__sec"
    }, "downloads/"), D.tree.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.part
    }, /*#__PURE__*/React.createElement("div", {
      className: "fb__node" + (node.startsWith(t.part) ? " fb__node--on" : ""),
      onClick: () => setNode(t.part + "/" + (t.pages[0] || ""))
    }, t.conflicts ? /*#__PURE__*/React.createElement(IC.Compare, {
      size: 15,
      style: {
        color: 'var(--state-conflict)'
      }
    }) : t.unmatched ? /*#__PURE__*/React.createElement(IC.Alert, {
      size: 15,
      style: {
        color: 'var(--state-unmatched)'
      }
    }) : /*#__PURE__*/React.createElement(IC.FolderOpen, {
      size: 15
    }), t.part, /*#__PURE__*/React.createElement("span", {
      className: "fb__node__c"
    }, t.range)), node.startsWith(t.part) && t.pages.map(p => /*#__PURE__*/React.createElement("div", {
      key: p,
      className: "fb__page",
      onClick: () => setNode(t.part + "/page_" + p),
      style: node === t.part + "/page_" + p ? {
        color: "var(--accent)"
      } : null
    }, /*#__PURE__*/React.createElement(IC.FileText, {
      size: 13
    }), " page_", p))))), /*#__PURE__*/React.createElement("section", {
      className: "fb__main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fb__bar"
    }, /*#__PURE__*/React.createElement(DS.Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        id: "all",
        label: "All",
        count: "12.8k"
      }, {
        id: "conflicts",
        label: "Conflicts",
        count: 31
      }, {
        id: "unmatched",
        label: "Unmatched",
        count: 4
      }, {
        id: "errors",
        label: "Errors",
        count: 0
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(DS.TextField, {
      prefix: /*#__PURE__*/React.createElement(IC.Search, {
        size: 15
      }),
      placeholder: "Filter filenames\u2026",
      mono: true,
      style: {
        width: 200
      }
    }), /*#__PURE__*/React.createElement(DS.IconButton, {
      bordered: true,
      "aria-label": "Filter"
    }, /*#__PURE__*/React.createElement(IC.Filter, {
      size: 16
    })), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.Refresh, {
        size: 15
      })
    }, "Rescan"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.Layers, {
        size: 15
      })
    }, "Organize")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "9px 18px",
        borderBottom: "1px solid var(--border-faint)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-faint)",
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(IC.FolderOpen, {
      size: 14
    }), " ", node, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-disabled)"
      }
    }, "\xB7 ", shown.length, " files")), /*#__PURE__*/React.createElement("div", {
      className: "fb__tablewrap"
    }, /*#__PURE__*/React.createElement("table", {
      className: "fb__table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: {
        width: 34
      }
    }, /*#__PURE__*/React.createElement(DS.Checkbox, null)), /*#__PURE__*/React.createElement("th", null, "Filename"), /*#__PURE__*/React.createElement("th", {
      style: {
        width: 80
      }
    }, "Page"), /*#__PURE__*/React.createElement("th", {
      style: {
        width: 90
      }
    }, "Size"), /*#__PURE__*/React.createElement("th", {
      style: {
        width: 150
      }
    }, "SHA-256"), /*#__PURE__*/React.createElement("th", {
      style: {
        width: 130
      }
    }, "Status"), /*#__PURE__*/React.createElement("th", {
      style: {
        width: 44
      }
    }))), /*#__PURE__*/React.createElement("tbody", null, shown.map((f, i) => /*#__PURE__*/React.createElement("tr", {
      key: f.name + i
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DS.Checkbox, null)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "fb__fn"
    }, /*#__PURE__*/React.createElement(IC.FileText, {
      size: 15,
      style: {
        color: "var(--text-faint)"
      }
    }), f.name)), /*#__PURE__*/React.createElement("td", {
      className: "fb__mono"
    }, f.page), /*#__PURE__*/React.createElement("td", {
      className: "fb__mono"
    }, f.size), /*#__PURE__*/React.createElement("td", {
      className: "fb__mono"
    }, f.hash, "\u2026"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DS.StatusBadge, {
      status: f.status
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(DS.IconButton, {
      size: "sm",
      "aria-label": "Actions"
    }, /*#__PURE__*/React.createElement(IC.More, {
      size: 15
    }))))))))));
  }
  window.EFTAFiles = Files;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Files.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/NewDownload.jsx
try { (() => {
/* New download — crawl configuration form. */
(function () {
  const DS = window.EFTADLDesignSystem_0e4e9e;
  const IC = window.EFTAIcons;
  const D = window.EFTAData;
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
`;
  if (!document.getElementById("efta-nd-css")) {
    const s = document.createElement("style");
    s.id = "efta-nd-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function NewDownload({
    onStart
  }) {
    const [dataset, setDataset] = React.useState(12);
    const [startPage, setStartPage] = React.useState(0);
    const [endPage, setEndPage] = React.useState(0);
    const [workers, setWorkers] = React.useState(10);
    const [delay, setDelay] = React.useState(0.4);
    const [resume, setResume] = React.useState(true);
    const [dry, setDry] = React.useState(false);
    const [skip, setSkip] = React.useState(false);
    const [httpx, setHttpx] = React.useState(true);
    const [pw, setPw] = React.useState(true);
    return /*#__PURE__*/React.createElement("div", {
      className: "nd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nd__main"
    }, /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Source",
      title: "Dataset"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nd__datasets"
    }, D.datasets.map(n => /*#__PURE__*/React.createElement("button", {
      key: n,
      className: "nd__ds" + (dataset === n ? " nd__ds--on" : ""),
      onClick: () => setDataset(n)
    }, /*#__PURE__*/React.createElement("span", {
      className: "nd__ds__n"
    }, n), /*#__PURE__*/React.createElement("span", {
      className: "nd__ds__l"
    }, "set"))), /*#__PURE__*/React.createElement("button", {
      className: "nd__ds",
      style: {
        width: 52
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nd__ds__n",
      style: {
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement(IC.Plus, {
      size: 16
    })))), /*#__PURE__*/React.createElement("div", {
      className: "nd__row3",
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      label: "Start page",
      value: startPage,
      min: 0,
      unit: "page",
      onChange: setStartPage,
      hint: "0 = resume / start"
    }), /*#__PURE__*/React.createElement(DS.NumberField, {
      label: "End page",
      value: endPage,
      min: 0,
      unit: "page",
      onChange: setEndPage,
      hint: "0 = unlimited"
    }), /*#__PURE__*/React.createElement(DS.TextField, {
      label: "Download dir",
      defaultValue: "downloads/"
    })), /*#__PURE__*/React.createElement("div", {
      className: "nd__url"
    }, "https://www.justice.gov/epstein/doj-disclosures/", /*#__PURE__*/React.createElement("b", null, "data-set-", dataset, "-files"), "?page=", startPage)), /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Performance",
      title: "Concurrency & pacing"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nd__row"
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      label: "Max workers",
      value: workers,
      min: 1,
      max: 64,
      unit: "parallel",
      onChange: setWorkers,
      hint: "10\u201325 is respectful; 50 is aggressive"
    }), /*#__PURE__*/React.createElement(DS.NumberField, {
      label: "Request delay",
      value: delay,
      min: 0,
      max: 5,
      step: 0.1,
      unit: "s",
      onChange: setDelay,
      hint: "between page fetches"
    }))), /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Fetch strategy",
      title: "How pages are fetched"
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: httpx,
      onChange: setHttpx,
      label: "httpx (HTTP/2)",
      description: "Primary fetcher \u2014 fastest, bypasses most 403s. Recommended on."
    }), /*#__PURE__*/React.createElement(DS.Switch, {
      checked: pw,
      onChange: setPw,
      label: "Playwright fallback",
      description: "Real browser on repeated 403 \u2014 slower, defeats anti-bot."
    }))), /*#__PURE__*/React.createElement("div", {
      className: "nd__main"
    }, /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Run mode",
      title: "Options"
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: resume,
      onChange: setResume,
      label: "Resume",
      description: "Continue from saved state."
    }), /*#__PURE__*/React.createElement(DS.Switch, {
      checked: dry,
      onChange: setDry,
      label: "Dry run",
      description: "Simulate \u2014 write nothing."
    }), /*#__PURE__*/React.createElement(DS.Switch, {
      checked: skip,
      onChange: setSkip,
      label: "Skip media",
      description: "Ignore audio & video files."
    })), /*#__PURE__*/React.createElement(DS.Card, {
      variant: "flat",
      eyebrow: "Summary",
      title: `Dataset ${dataset}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "nd__summary"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nd__sumrow"
    }, /*#__PURE__*/React.createElement("span", null, "Workers"), /*#__PURE__*/React.createElement("span", null, workers, " parallel")), /*#__PURE__*/React.createElement("div", {
      className: "nd__sumrow"
    }, /*#__PURE__*/React.createElement("span", null, "Delay"), /*#__PURE__*/React.createElement("span", null, delay, "s")), /*#__PURE__*/React.createElement("div", {
      className: "nd__sumrow"
    }, /*#__PURE__*/React.createElement("span", null, "Strategy"), /*#__PURE__*/React.createElement("span", null, httpx ? "HTTP/2" : "requests", pw ? " + PW" : "")), /*#__PURE__*/React.createElement("div", {
      className: "nd__sumrow"
    }, /*#__PURE__*/React.createElement("span", null, "Mode"), /*#__PURE__*/React.createElement("span", null, dry ? "dry-run" : resume ? "resume" : "fresh"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: "var(--border-faint)",
        margin: "4px 0"
      }
    }), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "primary",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(IC.Play, {
        size: 16
      }),
      onClick: () => onStart({
        dataset,
        workers,
        delay
      })
    }, "Start crawl"), /*#__PURE__*/React.createElement(DS.Button, {
      variant: "ghost",
      fullWidth: true,
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(IC.Terminal, {
        size: 15
      })
    }, "Copy CLI command"))));
  }
  window.EFTANewDownload = NewDownload;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/NewDownload.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Settings.jsx
try { (() => {
/* Settings — full preferences across the CLI's option surface. */
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
`;
  if (!document.getElementById("efta-st-css")) {
    const s = document.createElement("style");
    s.id = "efta-st-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function Row({
    t,
    d,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "st__row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st__row__txt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "st__row__t"
    }, t), /*#__PURE__*/React.createElement("div", {
      className: "st__row__d"
    }, d)), /*#__PURE__*/React.createElement("div", {
      className: "st__row__ctl"
    }, children));
  }
  function Settings() {
    const [httpx, setHttpx] = React.useState(true);
    const [pw, setPw] = React.useState(true);
    const [cookies, setCookies] = React.useState(false);
    const [workers, setWorkers] = React.useState(10);
    const [delay, setDelay] = React.useState(0.4);
    const [maxForbidden, setMaxForbidden] = React.useState(3);
    const [maxRetries, setMaxRetries] = React.useState(3);
    const [dbState, setDbState] = React.useState(true);
    const [fsFallback, setFsFallback] = React.useState(true);
    const [csv, setCsv] = React.useState(false);
    const [debug, setDebug] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: "st"
    }, /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Fetch strategy",
      title: "How pages are fetched",
      actions: /*#__PURE__*/React.createElement(IC.Server, {
        size: 18,
        style: {
          color: "var(--text-faint)"
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "st__rows"
    }, /*#__PURE__*/React.createElement(Row, {
      t: "httpx (HTTP/2)",
      d: "Primary fetcher. Fastest and bypasses most anti-bot 403s."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: httpx,
      onChange: setHttpx
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "Playwright fallback",
      d: "Launch a real browser after repeated 403s. Slower but reliable."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: pw,
      onChange: setPw
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "Import browser cookies",
      d: "Reuse a logged-in session from a local browser profile."
    }, /*#__PURE__*/React.createElement(DS.Select, {
      options: ["firefox", "chrome", "brave"],
      mono: true
    })))), /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "Performance & networking",
      title: "Concurrency & retries",
      actions: /*#__PURE__*/React.createElement(IC.Zap, {
        size: 18,
        style: {
          color: "var(--text-faint)"
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "st__rows"
    }, /*#__PURE__*/React.createElement(Row, {
      t: "Max workers",
      d: "Parallel downloads. 10\u201325 is respectful; 50 is aggressive."
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      value: workers,
      min: 1,
      max: 64,
      unit: "parallel",
      onChange: setWorkers
    })), /*#__PURE__*/React.createElement(Row, {
      t: "Request delay",
      d: "Seconds to wait between page fetches."
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      value: delay,
      min: 0,
      max: 5,
      step: 0.1,
      unit: "s",
      onChange: setDelay
    })), /*#__PURE__*/React.createElement(Row, {
      t: "Max consecutive 403s",
      d: "Stop after this many forbidden responses in a row."
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      value: maxForbidden,
      min: 1,
      max: 20,
      unit: "hits",
      onChange: setMaxForbidden
    })), /*#__PURE__*/React.createElement(Row, {
      t: "Max retries",
      d: "Retry attempts per failed page fetch."
    }, /*#__PURE__*/React.createElement(DS.NumberField, {
      value: maxRetries,
      min: 0,
      max: 10,
      unit: "tries",
      onChange: setMaxRetries
    })))), /*#__PURE__*/React.createElement(DS.Card, {
      eyebrow: "State, database & logging",
      title: "Tracking & index",
      actions: /*#__PURE__*/React.createElement(IC.Database, {
        size: 18,
        style: {
          color: "var(--text-faint)"
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "st__rows"
    }, /*#__PURE__*/React.createElement(Row, {
      t: "Persist state in database",
      d: "Resume position lives in downloads.db (recommended)."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: dbState,
      onChange: setDbState
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "Filesystem fallback",
      d: "Scan disk when the DB index misses a file."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: fsFallback,
      onChange: setFsFallback
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "CSV log",
      d: "Append every action to downloads.csv."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: csv,
      onChange: setCsv
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "Debug HTTP",
      d: "Print verbose diagnostics for 403s and errors."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(DS.Switch, {
      checked: debug,
      onChange: setDebug
    }))), /*#__PURE__*/React.createElement(Row, {
      t: "Index database",
      d: "Rebuild the SQLite index from files on disk."
    }, /*#__PURE__*/React.createElement(DS.Button, {
      variant: "secondary",
      size: "sm",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(IC.Refresh, {
        size: 15
      })
    }, "Rescan now")))));
  }
  window.EFTASettings = Settings;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/data.jsx
try { (() => {
/* Fake data for the EFTA-DL console UI kit. Exported to window.EFTAData. */
const pad = n => String(n).padStart(8, "0");
const FN = n => `EFTA${pad(n)}.pdf`;
const STATUSES = ["downloaded", "downloaded", "downloaded", "duplicate", "conflict", "downloaded", "unmatched", "downloaded"];
const SIZES = ["248 KB", "1.2 MB", "884 KB", "3.4 MB", "512 KB", "76 KB", "2.1 MB", "640 KB", "159 KB", "4.8 MB"];
function makeFiles(count, pageBase) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const n = 1234560 + pageBase * 13 + i * 7;
    out.push({
      name: FN(n),
      page: pageBase,
      part: Math.floor(pageBase / 100) + 1,
      size: SIZES[(i + pageBase) % SIZES.length],
      hash: (Math.abs(Math.sin(n)) * 1e16).toString(16).slice(0, 12),
      status: STATUSES[(i + pageBase) % STATUSES.length]
    });
  }
  return out;
}
const tree = [{
  part: "part_1",
  pages: [42, 43, 44, 45],
  range: "pages 0–99"
}, {
  part: "part_2",
  pages: [101, 118, 142],
  range: "pages 100–199"
}, {
  part: "conflicts",
  pages: [42, 118],
  range: "filename clashes",
  conflicts: true
}, {
  part: "unmatched",
  pages: [],
  range: "removed from source",
  unmatched: true
}];
const conflicts = [{
  name: "EFTA01234567.pdf",
  page: 42,
  when: "2m ago",
  pages_changed: 3,
  note: "Redaction added on page 17"
}, {
  name: "EFTA01180073.pdf",
  page: 118,
  when: "14m ago",
  pages_changed: 1,
  note: "Bates stamp shifted"
}, {
  name: "EFTA01180412.pdf",
  page: 118,
  when: "26m ago",
  pages_changed: 7,
  note: "Multiple paragraphs removed"
}, {
  name: "EFTA00420981.pdf",
  page: 42,
  when: "1h ago",
  pages_changed: 2,
  note: "Exhibit label changed"
}];
const log = [{
  level: "info",
  t: "14:21:58",
  m: ["Resuming from saved state — ", "9,180", " files seen"]
}, {
  level: "fetch",
  t: "14:22:01",
  m: ["Fetching page ", "9,206"]
}, {
  level: "success",
  t: "14:22:02",
  m: ["Downloaded ", "EFTA01234490.pdf", " → part_1/page_9206/"]
}, {
  level: "success",
  t: "14:22:03",
  m: ["Downloaded ", "EFTA01234491.pdf", " → part_1/page_9206/"]
}, {
  level: "skip",
  t: "14:22:03",
  m: ["Skipping duplicate ", "EFTA01234492.pdf", " — identical hash"]
}, {
  level: "fetch",
  t: "14:22:05",
  m: ["Fetching page ", "9,207"]
}, {
  level: "success",
  t: "14:22:06",
  m: ["Downloaded ", "EFTA01234507.pdf", " → part_1/page_9207/"]
}, {
  level: "conflict",
  t: "14:22:07",
  m: ["Filename conflict ", "EFTA01234567.pdf", " → conflicts/page_9207/"]
}, {
  level: "info",
  t: "14:22:07",
  m: ["Text diff PDF written: ", "EFTA01234567_compare.pdf"]
}, {
  level: "info",
  t: "14:22:07",
  m: ["Visual compare PDF written: ", "EFTA01234567_visual_compare.pdf"]
}, {
  level: "warn",
  t: "14:22:09",
  m: ["403 Forbidden (attempt 1/3) — waiting 1s and retrying"]
}, {
  level: "fetch",
  t: "14:22:11",
  m: ["Retrying via httpx (HTTP/2) ", "9,208"]
}, {
  level: "success",
  t: "14:22:12",
  m: ["Downloaded ", "EFTA01234531.pdf", " → part_1/page_9208/"]
}, {
  level: "success",
  t: "14:22:13",
  m: ["Downloaded ", "EFTA01234532.pdf", " → part_1/page_9208/"]
}, {
  level: "fetch",
  t: "14:22:15",
  m: ["Fetching page ", "9,209"]
}, {
  level: "success",
  t: "14:22:16",
  m: ["Downloaded ", "EFTA01234560.pdf", " → part_1/page_9209/"]
}];
window.EFTAData = {
  makeFiles,
  tree,
  conflicts,
  log,
  datasets: [9, 10, 11, 12, 13],
  stats: {
    downloaded: 12847,
    duplicates: 2104,
    conflicts: 31,
    unmatched: 4,
    pages: 9210,
    throughput: "4.2"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared Lucide-style icon set for the EFTA-DL console UI kit.
   Stroke-based, 24x24, currentColor. Exported to window.EFTAIcons. */
const _mk = paths => function Icon({
  size = 18,
  strokeWidth = 2,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, rest), paths);
};
const EFTAIcons = {
  Activity: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M22 12h-2.5l-2 7-4-14-2.5 9H4"
  })),
  Download: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 15V3"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m7 10 5 5 5-5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M5 21h14"
  })]),
  Folder: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
  })),
  FolderOpen: _mk(/*#__PURE__*/React.createElement("path", {
    d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6A2 2 0 0 1 18.45 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"
  })),
  Files: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M14 2v5h5"
  })]),
  Compare: _mk([/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "18",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    key: "b",
    cx: "6",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M13 6h3a2 2 0 0 1 2 2v7"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M11 18H8a2 2 0 0 1-2-2V9"
  })]),
  Settings: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"
  }), /*#__PURE__*/React.createElement("circle", {
    key: "b",
    cx: "12",
    cy: "12",
    r: "3"
  })]),
  Play: _mk(/*#__PURE__*/React.createElement("polygon", {
    points: "6 3 20 12 6 21 6 3"
  })),
  Pause: _mk([/*#__PURE__*/React.createElement("rect", {
    key: "a",
    x: "6",
    y: "4",
    width: "4",
    height: "16",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "b",
    x: "14",
    y: "4",
    width: "4",
    height: "16",
    rx: "1"
  })]),
  Stop: _mk(/*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "14",
    height: "14",
    rx: "2"
  })),
  Refresh: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M3 12a9 9 0 0 1 15-6.7L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M21 3v5h-5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M21 12a9 9 0 0 1-15 6.7L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M3 21v-5h5"
  })]),
  Search: _mk([/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m21 21-4.3-4.3"
  })]),
  ChevronRight: _mk(/*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })),
  ChevronDown: _mk(/*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })),
  Database: _mk([/*#__PURE__*/React.createElement("ellipse", {
    key: "a",
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M3 5V19A9 3 0 0 0 21 19V5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M3 12A9 3 0 0 0 21 12"
  })]),
  Server: _mk([/*#__PURE__*/React.createElement("rect", {
    key: "a",
    x: "2",
    y: "2",
    width: "20",
    height: "8",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    key: "b",
    x: "2",
    y: "14",
    width: "20",
    height: "8",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M6 6h.01"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M6 18h.01"
  })]),
  Shield: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"
  })),
  Hash: _mk([/*#__PURE__*/React.createElement("line", {
    key: "a",
    x1: "4",
    x2: "20",
    y1: "9",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    key: "b",
    x1: "4",
    x2: "20",
    y1: "15",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    key: "c",
    x1: "10",
    x2: "8",
    y1: "3",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    key: "d",
    x1: "16",
    x2: "14",
    y1: "3",
    y2: "21"
  })]),
  Clock: _mk([/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    key: "b",
    points: "12 6 12 12 16 14"
  })]),
  Alert: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 9v4"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M12 17h.01"
  })]),
  Check: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  X: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m6 6 12 12"
  })]),
  More: _mk([/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    key: "b",
    cx: "12",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    key: "c",
    cx: "12",
    cy: "19",
    r: "1"
  })]),
  External: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M15 3h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })]),
  Layers: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
  })]),
  FileText: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M14 2v5h5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M16 13H8"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M16 17H8"
  }), /*#__PURE__*/React.createElement("path", {
    key: "e",
    d: "M10 9H8"
  })]),
  Zap: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
  })),
  Wifi: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 20h.01"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M2 8.82a15 15 0 0 1 20 0"
  }), /*#__PURE__*/React.createElement("path", {
    key: "c",
    d: "M5 12.859a10 10 0 0 1 14 0"
  }), /*#__PURE__*/React.createElement("path", {
    key: "d",
    d: "M8.5 16.429a5 5 0 0 1 7 0"
  })]),
  Filter: _mk(/*#__PURE__*/React.createElement("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  })),
  Plus: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 5v14"
  })]),
  Sun: _mk([/*#__PURE__*/React.createElement("circle", {
    key: "a",
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
  })]),
  Moon: _mk(/*#__PURE__*/React.createElement("path", {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
  })),
  Terminal: _mk([/*#__PURE__*/React.createElement("polyline", {
    key: "a",
    points: "4 17 10 11 4 5"
  }), /*#__PURE__*/React.createElement("line", {
    key: "b",
    x1: "12",
    x2: "20",
    y1: "19",
    y2: "19"
  })]),
  Pin: _mk([/*#__PURE__*/React.createElement("path", {
    key: "a",
    d: "M12 17v5"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z"
  })]),
  Copy: _mk([/*#__PURE__*/React.createElement("rect", {
    key: "a",
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    key: "b",
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })])
};
window.EFTAIcons = EFTAIcons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.LogLine = __ds_scope.LogLine;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.NumberField = __ds_scope.NumberField;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
