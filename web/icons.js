/* Lucide-style icon set for EFTA-DL console. window.EFTAIcons */
const _mk = (paths) => function Icon({ size = 18, strokeWidth = 2, style, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} {...rest}>
      {paths}
    </svg>
  );
};

window.EFTAIcons = {
  Activity: _mk(<path d="M22 12h-2.5l-2 7-4-14-2.5 9H4" />),
  Download: _mk([<path key="a" d="M12 15V3" />, <path key="b" d="m7 10 5 5 5-5" />, <path key="c" d="M5 21h14" />]),
  Folder: _mk(<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />),
  FolderOpen: _mk(<path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6A2 2 0 0 1 18.45 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />),
  Files: _mk([<path key="a" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />, <path key="b" d="M14 2v5h5" />]),
  Compare: _mk([<circle key="a" cx="18" cy="18" r="3" />, <circle key="b" cx="6" cy="6" r="3" />, <path key="c" d="M13 6h3a2 2 0 0 1 2 2v7" />, <path key="d" d="M11 18H8a2 2 0 0 1-2-2V9" />]),
  Settings: _mk([<path key="a" d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />, <circle key="b" cx="12" cy="12" r="3" />]),
  Play: _mk(<polygon points="6 3 20 12 6 21 6 3" />),
  Pause: _mk([<rect key="a" x="6" y="4" width="4" height="16" rx="1" />, <rect key="b" x="14" y="4" width="4" height="16" rx="1" />]),
  Stop: _mk(<rect x="5" y="5" width="14" height="14" rx="2" />),
  Refresh: _mk([<path key="a" d="M3 12a9 9 0 0 1 15-6.7L21 8" />, <path key="b" d="M21 3v5h-5" />, <path key="c" d="M21 12a9 9 0 0 1-15 6.7L3 16" />, <path key="d" d="M3 21v-5h5" />]),
  Search: _mk([<circle key="a" cx="11" cy="11" r="8" />, <path key="b" d="m21 21-4.3-4.3" />]),
  ChevronRight: _mk(<path d="m9 18 6-6-6-6" />),
  ChevronDown: _mk(<path d="m6 9 6 6 6-6" />),
  Database: _mk([<ellipse key="a" cx="12" cy="5" rx="9" ry="3" />, <path key="b" d="M3 5V19A9 3 0 0 0 21 19V5" />, <path key="c" d="M3 12A9 3 0 0 0 21 12" />]),
  Server: _mk([<rect key="a" x="2" y="2" width="20" height="8" rx="2" />, <rect key="b" x="2" y="14" width="20" height="8" rx="2" />, <path key="c" d="M6 6h.01" />, <path key="d" d="M6 18h.01" />]),
  Shield: _mk(<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />),
  Hash: _mk([<line key="a" x1="4" x2="20" y1="9" y2="9" />, <line key="b" x1="4" x2="20" y1="15" y2="15" />, <line key="c" x1="10" x2="8" y1="3" y2="21" />, <line key="d" x1="16" x2="14" y1="3" y2="21" />]),
  Clock: _mk([<circle key="a" cx="12" cy="12" r="10" />, <polyline key="b" points="12 6 12 12 16 14" />]),
  Alert: _mk([<path key="a" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />, <path key="b" d="M12 9v4" />, <path key="c" d="M12 17h.01" />]),
  Check: _mk(<path d="M20 6 9 17l-5-5" />),
  X: _mk([<path key="a" d="M18 6 6 18" />, <path key="b" d="m6 6 12 12" />]),
  More: _mk([<circle key="a" cx="12" cy="12" r="1" />, <circle key="b" cx="12" cy="5" r="1" />, <circle key="c" cx="12" cy="19" r="1" />]),
  External: _mk([<path key="a" d="M15 3h6v6" />, <path key="b" d="M10 14 21 3" />, <path key="c" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />]),
  Layers: _mk([<path key="a" d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />, <path key="b" d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />, <path key="c" d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />]),
  FileText: _mk([<path key="a" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />, <path key="b" d="M14 2v5h5" />, <path key="c" d="M16 13H8" />, <path key="d" d="M16 17H8" />, <path key="e" d="M10 9H8" />]),
  Zap: _mk(<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />),
  Wifi: _mk([<path key="a" d="M12 20h.01" />, <path key="b" d="M2 8.82a15 15 0 0 1 20 0" />, <path key="c" d="M5 12.859a10 10 0 0 1 14 0" />, <path key="d" d="M8.5 16.429a5 5 0 0 1 7 0" />]),
  Filter: _mk(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />),
  Plus: _mk([<path key="a" d="M5 12h14" />, <path key="b" d="M12 5v14" />]),
  Terminal: _mk([<polyline key="a" points="4 17 10 11 4 5" />, <line key="b" x1="12" x2="20" y1="19" y2="19" />]),
  Copy: _mk([<rect key="a" x="9" y="9" width="13" height="13" rx="2" />, <path key="b" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />]),
};
