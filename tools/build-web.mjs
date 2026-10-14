import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DIST_PLAYER = path.join(DIST, "player");
const PUBLIC_SRC = path.join(ROOT, "public");
const DIST_PUBLIC = path.join(DIST, "public");

console.log("==> Building Halal Motion Videos (Phase 1: Video Creator Studio)...");

// 1. Bundle Remotion player into dist/player (if needed)
console.log("==> 1. Bundling Remotion video engine into dist/player...");
try {
  execSync(`npx remotion bundle src/index.ts --out-dir="${DIST_PLAYER}"`, {
    cwd: ROOT,
    stdio: "inherit",
  });
} catch (err) {
  console.warn("Remotion bundle warning (continuing):", err.message);
}

// 2. Ensure public assets are copied to dist/public
console.log("==> 2. Copying public assets to dist/public...");
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
copyDirSync(PUBLIC_SRC, DIST_PUBLIC);

if (fs.existsSync(path.join(DIST_PLAYER, "public"))) {
  copyDirSync(path.join(DIST_PLAYER, "public"), DIST_PUBLIC);
}

// 3. Generate Enhanced Web Dashboard with Phase 1 "Video Creator Studio"
console.log("==> 3. Generating Halal Motion Videos Web Studio in dist/index.html...");

const DASHBOARD_HTML = `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Halal Motion Videos · Islamic Video Creator Studio</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23d9a35f'/%3E%3Cpath d='M12 9.5v13l11-6.5z' fill='%23140f0a'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0d0c0b; --bg2: #141312; --panel: #181614; --panel2: #211e1a; --line: #2d2924; --line2: #3a342e;
    --text: #f5f0e6; --muted: #9e958a; --faint: #6e675d;
    --accent: #d9a35f; --accent2: #f3ca8e; --accent-ink: #140f0a; --accent-soft: rgba(217, 163, 95, 0.12);
    --good: #8cc152; --bad: #f0715f; --warn: #e8b76c;
    --radius: 14px; --radius-sm: 8px;
    --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    --font-quran: 'Amiri', 'Traditional Arabic', serif;
    --font-urdu: 'Noto Nastaliq Urdu', serif;
  }
  [data-theme="light"] {
    --bg: #f7f4ee; --bg2: #efeae0; --panel: #ffffff; --panel2: #faf7f2; --line: #e3dcd1; --line2: #d6ccbe;
    --text: #1a1714; --muted: #787064; --faint: #a69c8e;
    --accent: #b87a28; --accent2: #d49540; --accent-ink: #ffffff; --accent-soft: rgba(184, 122, 40, 0.12);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg); color: var(--text);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); text-decoration: none; }
  button {
    font: inherit; color: inherit; cursor: pointer; border: 1px solid var(--line2);
    background: var(--panel2); border-radius: var(--radius-sm); padding: 7px 14px;
    display: inline-flex; align-items: center; gap: 8px; transition: all .15s ease;
  }
  button:hover { border-color: var(--accent); }
  button.primary {
    background: linear-gradient(180deg, var(--accent2), var(--accent));
    border-color: transparent; color: var(--accent-ink); font-weight: 600;
    box-shadow: 0 4px 14px var(--accent-soft);
  }
  button.primary:hover { filter: brightness(1.08); }
  button.ghost { border-color: transparent; background: transparent; color: var(--muted); }
  button.ghost:hover { color: var(--text); background: var(--panel2); }
  button.active { background: var(--accent-soft); border-color: var(--accent); color: var(--accent2); font-weight: 600; }
  input, textarea, select {
    font: inherit; color: inherit; border: 1px solid var(--line2); background: var(--bg2);
    border-radius: var(--radius-sm); padding: 8px 12px; outline: none; width: 100%;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

  /* Header */
  header {
    height: 60px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--line); background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100;
  }
  .brand-logo { display: flex; align-items: center; gap: 12px; }
  .logo-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    display: grid; place-items: center; box-shadow: 0 4px 14px var(--accent-soft);
  }
  .logo-icon svg { width: 16px; height: 16px; fill: var(--accent-ink); }
  .logo-title b { font-size: 15px; font-weight: 700; letter-spacing: -0.02em; }
  .logo-title span { color: var(--faint); font-size: 12px; margin-left: 6px; }

  .nav-tabs { display: flex; gap: 6px; background: var(--bg2); padding: 4px; border-radius: 10px; border: 1px solid var(--line); }
  .tab-btn { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; border: none; background: transparent; color: var(--muted); }
  .tab-btn.active { background: var(--panel); color: var(--accent2); font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

  .header-actions { display: flex; align-items: center; gap: 12px; }
  .pill {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12px;
    color: var(--muted); padding: 5px 12px; border: 1px solid var(--line);
    border-radius: 99px; background: var(--panel);
  }
  .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--good); box-shadow: 0 0 0 3px color-mix(in srgb, var(--good) 25%, transparent); }

  /* Layout */
  .layout { display: grid; grid-template-columns: 260px 1fr 340px; min-height: calc(100vh - 60px); }
  @media (max-width: 1200px) { .layout { grid-template-columns: 240px 1fr; } aside { display: none; } }
  @media (max-width: 768px) { .layout { grid-template-columns: 1fr; } nav { display: none; } }

  /* Sidebar */
  nav { border-right: 1px solid var(--line); padding: 20px 14px; background: var(--bg2); }
  .nav-heading { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--faint); margin: 0 8px 12px; }
  .brand-card {
    padding: 10px 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--panel);
    margin-bottom: 14px; cursor: pointer; transition: all .15s ease;
  }
  .brand-card.active { border-color: var(--accent); background: var(--panel2); box-shadow: 0 4px 12px var(--accent-soft); }
  .brand-head { display: flex; align-items: center; gap: 10px; }
  .brand-badge { width: 28px; height: 28px; border-radius: 8px; background: var(--accent-soft); color: var(--accent2); font-weight: 700; display: grid; place-items: center; font-size: 12px; }
  .brand-info b { display: block; font-size: 13px; font-weight: 600; }
  .brand-info span { font-size: 11px; color: var(--muted); }

  .action-banner {
    background: linear-gradient(135deg, rgba(217,163,95,0.15), rgba(217,163,95,0.05));
    border: 1px solid rgba(217,163,95,0.3); border-radius: 10px; padding: 12px; margin-bottom: 16px;
  }
  .action-banner b { font-size: 13px; color: var(--accent2); display: block; margin-bottom: 4px; }
  .action-banner p { font-size: 11.5px; color: var(--muted); margin-bottom: 8px; }

  /* Main Area */
  main { padding: 24px 32px 60px; overflow-y: auto; }
  .hero { margin-bottom: 20px; }
  .crumbs { font-size: 13px; color: var(--muted); margin-bottom: 4px; }
  .hero h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
  .hero p { color: var(--muted); font-size: 13.5px; margin-top: 4px; }

  /* Creator Studio Section */
  .creator-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; margin-bottom: 28px; }
  @media (max-width: 1000px) { .creator-grid { grid-template-columns: 1fr; } }

  .creator-card {
    background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 20px; box-shadow: 0 8px 24px rgba(0,0,0,.25);
  }
  .creator-step-title {
    font-size: 14px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--accent2);
  }
  .step-number {
    width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: var(--accent-ink);
    font-size: 12px; font-weight: 700; display: grid; place-items: center;
  }

  .preset-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .preset-pill {
    padding: 6px 12px; border-radius: 99px; background: var(--panel2); border: 1px solid var(--line);
    font-size: 12px; cursor: pointer; transition: all .15s ease;
  }
  .preset-pill:hover, .preset-pill.active {
    background: var(--accent-soft); border-color: var(--accent); color: var(--accent2); font-weight: 600;
  }

  .theme-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
  .theme-option {
    border: 2px solid var(--line); border-radius: 10px; padding: 10px 8px; text-align: center;
    cursor: pointer; transition: all .15s ease; background: var(--bg2);
  }
  .theme-option:hover { border-color: var(--accent); }
  .theme-option.active { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-soft); }
  .theme-swatch { width: 28px; height: 28px; border-radius: 50%; margin: 0 auto 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
  .theme-label { font-size: 11px; font-weight: 600; }

  /* Motion Screen Simulator */
  .simulator-screen {
    border: 1px solid var(--line2); border-radius: 14px; position: relative;
    overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 24px; transition: all .3s ease; box-shadow: inset 0 0 50px rgba(0,0,0,0.85);
  }
  .simulator-screen.vertical { aspect-ratio: 9/16; min-height: 480px; }
  .simulator-screen.horizontal { aspect-ratio: 16/9; min-height: 300px; width: 100%; }

  /* Islamic Themes */
  .theme-gold { background: radial-gradient(circle at center, #21190f 0%, #0d0c0b 100%); border-color: rgba(217,163,95,0.4); }
  .theme-emerald { background: radial-gradient(circle at center, #092415 0%, #030d07 100%); border-color: rgba(46,125,50,0.5); }
  .theme-navy { background: radial-gradient(circle at center, #0f1a30 0%, #070c17 100%); border-color: rgba(30,136,229,0.5); }
  .theme-sand { background: radial-gradient(circle at center, #2e2114 0%, #171009 100%); border-color: rgba(245,158,11,0.5); }

  .ornate-border {
    position: absolute; inset: 12px; border: 1px solid rgba(217,163,95,0.3);
    border-radius: 10px; pointer-events: none;
  }
  .screen-surah-badge {
    display: inline-block; padding: 4px 14px; border-radius: 99px;
    background: rgba(217,163,95,0.15); border: 1px solid rgba(217,163,95,0.4);
    color: var(--accent2); font-size: 11px; font-weight: 600; margin-bottom: 16px; z-index: 2;
  }
  .screen-arabic {
    font-family: var(--font-quran); font-size: 25px; line-height: 1.85;
    color: #fff9ed; text-shadow: 0 2px 18px rgba(217,163,95,0.5);
    margin: 10px 0; direction: rtl; z-index: 2;
  }
  .screen-urdu {
    font-family: var(--font-urdu); font-size: 14.5px; color: var(--accent2);
    margin-top: 10px; line-height: 1.8; direction: rtl; z-index: 2;
  }
  .screen-english {
    font-size: 11.5px; color: #d0c8be; margin-top: 8px; z-index: 2; max-width: 90%;
  }

  /* Audio Bar */
  .player-bar {
    margin-top: 14px; background: var(--bg2); border: 1px solid var(--line);
    border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; gap: 14px;
  }
  .play-btn {
    width: 36px; height: 36px; border-radius: 50%; background: var(--accent);
    color: var(--accent-ink); border: 0; display: grid; place-items: center; flex: none;
  }
  .play-btn:hover { transform: scale(1.05); }
  .time-slider { flex: 1; accent-color: var(--accent); cursor: pointer; }
  .time-display { font-size: 12px; font-family: var(--mono); color: var(--muted); flex: none; }

  /* Director Chat Sidebar */
  aside { border-left: 1px solid var(--line); background: var(--bg2); display: flex; flex-direction: column; height: calc(100vh - 60px); position: sticky; top: 60px; }
  .aside-head { padding: 18px 20px; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; }
  .aside-head h2 { font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .aside-head .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--good); }

  .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .chat-bubble { max-width: 90%; border-radius: 12px; padding: 10px 14px; font-size: 13px; line-height: 1.5; }
  .chat-bubble.user { align-self: flex-end; background: var(--accent-soft); border: 1px solid rgba(217,163,95,0.3); color: #fff; }
  .chat-bubble.ai { align-self: flex-start; background: var(--panel); border: 1px solid var(--line); color: var(--text); }
  .chat-bubble.ai b { color: var(--accent2); }

  .chat-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px; border-top: 1px solid var(--line); background: var(--bg); }
  .chip { font-size: 11.5px; padding: 4px 10px; border-radius: 99px; background: var(--panel2); border: 1px solid var(--line); cursor: pointer; color: var(--muted); }
  .chip:hover { border-color: var(--accent); color: var(--text); }

  .chat-input-bar { padding: 12px 16px; border-top: 1px solid var(--line); display: flex; gap: 8px; background: var(--bg); }
  .chat-input-bar input { flex: 1; }

  /* Settings Modal */
  dialog {
    margin: auto; border: 1px solid var(--line2); border-radius: 16px;
    background: var(--panel); color: var(--text); padding: 24px; max-width: 480px; width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }
  dialog::backdrop { background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
  .dialog-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .dialog-head h3 { font-size: 16px; font-weight: 700; }
  .form-group { margin-bottom: 14px; }
  .form-group label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 6px; }
</style>
</head>
<body>

<header>
  <div class="brand-logo">
    <div class="logo-icon">
      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </div>
    <div class="logo-title">
      <b>Halal Motion Videos</b>
      <span>Quran Video Creator Studio</span>
    </div>
  </div>

  <div class="nav-tabs">
    <button class="tab-btn active" id="tabCreator" onclick="switchView('creator')">✨ Video Creator Studio</button>
    <button class="tab-btn" id="tabShowcase" onclick="switchView('showcase')">🎬 Aal-e-Imran Showcase</button>
  </div>

  <div class="header-actions">
    <div class="pill">
      <div class="dot"></div>
      <span>Studio Engine: Active</span>
    </div>
    <a href="/player/" target="_blank">
      <button class="ghost">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Remotion Player
      </button>
    </a>
    <button id="openSettingsBtn" class="ghost">Settings</button>
    <button id="themeToggle" class="ghost">🌓</button>
  </div>
</header>

<div class="layout">
  <!-- Sidebar -->
  <nav>
    <div class="action-banner">
      <b>🌟 Phase 1: Video Creator</b>
      <p>Customize Quranic verses, upload recitation audio, and create reels or YouTube videos.</p>
      <button class="primary" style="width:100%; justify-content:center; font-size:12px; padding:6px 10px;" onclick="switchView('creator')">
        + Create New Video
      </button>
    </div>

    <div class="nav-heading">Saved Presets</div>
    <div class="brand-card active" onclick="switchView('showcase')">
      <div class="brand-head">
        <div class="brand-badge">3:8</div>
        <div class="brand-info">
          <b>Surah Aal-e-Imran</b>
          <span>Verses 8-9 · Mastered</span>
        </div>
      </div>
    </div>

    <div class="brand-card" onclick="loadPreset('fatihah')">
      <div class="brand-head">
        <div class="brand-badge" style="background:#1b2d1d; color:#8cc152;">1:1</div>
        <div class="brand-info">
          <b>Surah Al-Fatihah</b>
          <span>7 Verses · Umm al-Kitab</span>
        </div>
      </div>
    </div>

    <div class="brand-card" onclick="loadPreset('kursi')">
      <div class="brand-head">
        <div class="brand-badge" style="background:#17223b; color:#5c9df5;">2:255</div>
        <div class="brand-info">
          <b>Ayat al-Kursi</b>
          <span>The Greatest Verse</span>
        </div>
      </div>
    </div>

    <div class="brand-card" onclick="loadPreset('ikhlas')">
      <div class="brand-head">
        <div class="brand-badge" style="background:#2b1d15; color:#e0a860;">112</div>
        <div class="brand-info">
          <b>Surah Al-Ikhlas</b>
          <span>Pure Monotheism</span>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main View -->
  <main>
    <!-- VIEW 1: VIDEO CREATOR STUDIO -->
    <div id="viewCreator">
      <div class="hero">
        <div class="crumbs">Studio / Video Creator</div>
        <h1>Islamic Motion Video Studio</h1>
        <p>Pick a Quranic Surah, customize typography and translations, or upload your own audio.</p>
      </div>

      <div class="creator-grid">
        <!-- Controls Column -->
        <div class="creator-card">
          <!-- Step 1: Text & Presets -->
          <div class="creator-step-title">
            <span class="step-number">1</span>
            Select Surah or Enter Custom Text
          </div>

          <div class="preset-pills">
            <div class="preset-pill active" onclick="loadPreset('fatihah', this)">سورة الفاتحة</div>
            <div class="preset-pill" onclick="loadPreset('kursi', this)">آية الكرسي</div>
            <div class="preset-pill" onclick="loadPreset('ikhlas', this)">سورة الإخلاص</div>
            <div class="preset-pill" onclick="loadPreset('falaq', this)">سورة الفلق</div>
            <div class="preset-pill" onclick="loadPreset('nas', this)">سورة الناس</div>
            <div class="preset-pill" onclick="loadPreset('aalimran', this)">سورة آل عمران</div>
          </div>

          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">Surah Title Badge</label>
            <input type="text" id="inputBadge" value="سُورَةُ الْفَاتِحَة" oninput="updateLiveSimulator()">
          </div>

          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">Arabic Verse Text (العربية)</label>
            <textarea id="inputArabic" rows="3" style="font-family:var(--font-quran); font-size:18px; direction:rtl;" oninput="updateLiveSimulator()">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝</textarea>
          </div>

          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">Urdu Translation (اردو ترجمہ)</label>
            <textarea id="inputUrdu" rows="2" style="font-family:var(--font-urdu); font-size:14px; direction:rtl;" oninput="updateLiveSimulator()">شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔</textarea>
          </div>

          <div style="margin-bottom:16px;">
            <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">English Translation</label>
            <textarea id="inputEnglish" rows="2" style="font-size:12.5px;" oninput="updateLiveSimulator()">In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.</textarea>
          </div>

          <!-- Step 2: Visual Themes -->
          <div class="creator-step-title" style="margin-top:20px;">
            <span class="step-number">2</span>
            Choose Islamic Visual Theme
          </div>

          <div class="theme-grid">
            <div class="theme-option active" onclick="setTheme('gold', this)">
              <div class="theme-swatch" style="background:linear-gradient(135deg, #d9a35f, #140f0a);"></div>
              <div class="theme-label">Royal Gold</div>
            </div>
            <div class="theme-option" onclick="setTheme('emerald', this)">
              <div class="theme-swatch" style="background:linear-gradient(135deg, #2e7d32, #051408);"></div>
              <div class="theme-label">Emerald</div>
            </div>
            <div class="theme-option" onclick="setTheme('navy', this)">
              <div class="theme-swatch" style="background:linear-gradient(135deg, #1e88e5, #081121);"></div>
              <div class="theme-label">Celestial Navy</div>
            </div>
            <div class="theme-option" onclick="setTheme('sand', this)">
              <div class="theme-swatch" style="background:linear-gradient(135deg, #f59e0b, #211306);"></div>
              <div class="theme-label">Desert Amber</div>
            </div>
          </div>

          <!-- Step 3: Audio Upload -->
          <div class="creator-step-title" style="margin-top:20px;">
            <span class="step-number">3</span>
            Recitation Audio
          </div>

          <div style="display:flex; gap:10px; align-items:center;">
            <label style="flex:1; cursor:pointer;">
              <input type="file" id="audioUpload" accept="audio/*" style="display:none;" onchange="handleAudioUpload(this)">
              <div style="padding:10px; border:1px dashed var(--accent); border-radius:8px; text-align:center; background:var(--accent-soft); color:var(--accent2); font-weight:600; font-size:12.5px;">
                📁 Upload Custom Audio (.mp3, .wav)
              </div>
            </label>
            <button class="ghost" onclick="resetToDefaultAudio()" style="font-size:12px;">Reset Audio</button>
          </div>
          <div id="audioFileName" style="font-size:11.5px; color:var(--muted); margin-top:6px;">Current Audio: Default Studio Recitation</div>
        </div>

        <!-- Live Preview Simulator Column -->
        <div class="creator-card" style="display:flex; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-size:13px; font-weight:700;">Live Motion Screen</div>
            <div style="display:flex; gap:6px;">
              <button class="ghost active" id="btnVertical" onclick="setFormat('vertical')">9:16</button>
              <button class="ghost" id="btnHorizontal" onclick="setFormat('horizontal')">16:9</button>
            </div>
          </div>

          <div class="simulator-screen vertical theme-gold" id="customScreen">
            <div class="ornate-border"></div>
            <div class="screen-surah-badge" id="previewBadge">سُورَةُ الْفَاتِحَة</div>
            <div class="screen-arabic" id="previewArabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝</div>
            <div class="screen-urdu" id="previewUrdu">شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں۔</div>
            <div class="screen-english" id="previewEnglish">In the name of Allah, the Entirely Merciful, the Especially Merciful.</div>
          </div>

          <!-- Audio Player Bar -->
          <div class="player-bar">
            <button class="play-btn" id="customPlayBtn" onclick="toggleCustomPlay()">▶</button>
            <input type="range" class="time-slider" id="customSlider" min="0" max="72.3" step="0.1" value="0" oninput="seekCustom(this.value)">
            <div class="time-display" id="customTime">0:00</div>
          </div>

          <audio id="customAudio" src="/public/quran-promo/video01/audio/recitation.mp3" preload="auto"></audio>

          <div style="display:flex; gap:8px; margin-top:16px;">
            <button class="primary" style="flex:1; justify-content:center;" onclick="downloadPresetCard()">
              💾 Save Video Preset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 2: ORIGINAL SHOWCASE -->
    <div id="viewShowcase" style="display:none;">
      <div class="hero">
        <div class="crumbs">quran-promo / video01</div>
        <h1>Surah Aal-e-Imran (Verses 8-9)</h1>
        <p>Mastered Quran recitation with synchronized Tajweed typography and Islamic motion graphics.</p>
      </div>

      <div style="display:grid; grid-template-columns:280px 1fr; gap:24px; margin-bottom:24px;">
        <div class="creator-card">
          <div style="font-size:13px; font-weight:700; margin-bottom:8px;">Vertical (9:16 Reels)</div>
          <div class="simulator-screen vertical theme-gold" style="min-height:380px;">
            <div class="ornate-border"></div>
            <div class="screen-surah-badge">سُورَةُ آلِ عِمْرَان</div>
            <div class="screen-arabic" id="scArabic">أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</div>
            <div class="screen-urdu" id="scUrdu">میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں</div>
            <div class="screen-english" id="scEnglish">I seek refuge in Allah from Satan, the accursed</div>
          </div>
        </div>

        <div class="creator-card">
          <div style="font-size:13px; font-weight:700; margin-bottom:8px;">Horizontal (16:9 Widescreen)</div>
          <div class="simulator-screen horizontal theme-gold" style="min-height:260px;">
            <div class="ornate-border"></div>
            <div class="screen-surah-badge">سُورَةُ آلِ عِمْرَان · الآيات ٨ - ٩</div>
            <div class="screen-arabic" id="scArabicH" style="font-size:28px;">أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</div>
            <div class="screen-urdu" id="scUrduH">میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں</div>
          </div>

          <div class="player-bar">
            <button class="play-btn" id="scPlayBtn" onclick="toggleScPlay()">▶</button>
            <input type="range" class="time-slider" id="scSlider" min="0" max="72.3" step="0.1" value="0" oninput="seekSc(this.value)">
            <div class="time-display" id="scTime">0:00 / 1:12</div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Director Chat Sidebar -->
  <aside>
    <div class="aside-head">
      <h2>
        <span class="status-dot"></span>
        Director AI (Assistant)
      </h2>
      <button class="ghost" style="padding:4px;" onclick="clearChat()">Clear</button>
    </div>

    <div class="chat-messages" id="chatMessages">
      <div class="chat-bubble ai">
        <b>Assalamu Alaikum!</b> Welcome to Halal Motion Videos Studio.
      </div>
      <div class="chat-bubble ai">
        You can customize verses in the <b>Video Creator</b> tab, pick themes, upload your recitation, or ask me for advice on Tajweed motion design!
      </div>
    </div>

    <div class="chat-chips">
      <div class="chip" onclick="sendSuggestion('Recommend best typography layout for Ayat al-Kursi')">Ayat al-Kursi Tip</div>
      <div class="chip" onclick="sendSuggestion('How to optimize audio for Reels and TikTok?')">Reels Audio</div>
      <div class="chip" onclick="sendSuggestion('Give me Arabic color palettes for Ramadan')">Color Palettes</div>
    </div>

    <div class="chat-input-bar">
      <input type="text" id="promptInput" placeholder="Message Director..." onkeydown="if(event.key==='Enter') sendMessage()">
      <button class="primary" onclick="sendMessage()">Send</button>
    </div>
  </aside>
</div>

<!-- Settings Dialog -->
<dialog id="settingsDialog">
  <div class="dialog-head">
    <h3>Director & API Settings</h3>
    <button class="ghost" onclick="document.getElementById('settingsDialog').close()">✕</button>
  </div>
  <div class="form-group">
    <label>Anthropic Claude API Key (Optional)</label>
    <input type="password" id="apiKeyInput" placeholder="sk-ant-api03-...">
    <span style="font-size:11px; color:var(--muted); margin-top:4px; display:block;">
      You can also leave this empty to use built-in Studio templates for free.
    </span>
  </div>
  <div class="form-group">
    <label>Model Engine</label>
    <select id="modelSelect">
      <option value="claude-3-7-sonnet-20250219" selected>Claude 3.7 Sonnet</option>
      <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
      <option value="claude-3-5-haiku-20241022">Claude 3.5 Haiku (Fast)</option>
    </select>
  </div>
  <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:20px;">
    <button class="ghost" onclick="document.getElementById('settingsDialog').close()">Cancel</button>
    <button class="primary" onclick="saveSettings()">Save Settings</button>
  </div>
</dialog>

<script>
// Preset Library
const PRESETS = {
  fatihah: {
    badge: "سُورَةُ الْفَاتِحَة",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝",
    urdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
    en: "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds."
  },
  kursi: {
    badge: "آيَةُ الْكُرْسِيِّ · سُورَةُ الْبَقَرَة",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۝",
    urdu: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ ہے اور سب کو تھامنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند، جو کچھ آسمانوں اور زمین میں ہے اسی کا ہے۔",
    en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep."
  },
  ikhlas: {
    badge: "سُورَةُ الْإِخْلَاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۝",
    urdu: "کہہ دیجیے کہ وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے، اور کوئی اس کا ہمسر نہیں۔",
    en: "Say, He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."
  },
  falaq: {
    badge: "سُورَةُ الْفَلَق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝",
    urdu: "کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں، اس کی تمام مخلوقات کے شر سے، اور رات کے اندھیرے کے شر سے جب وہ چھا جائے۔",
    en: "Say, I seek refuge in the Lord of daybreak From the evil of that which He created And from the evil of darkness when it settles."
  },
  nas: {
    badge: "سُورَةُ النَّاس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝",
    urdu: "کہہ دیجیے کہ میں انسانوں کے رب کی پناہ مانگتا ہوں، انسانوں کے بادشاہ کی، انسانوں کے معبود کی، وسوسہ ڈالنے والے کے شر سے۔",
    en: "Say, I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer."
  },
  aalimran: {
    badge: "سُورَةُ آلِ عِمْرَان · آية ٨",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ ۝",
    urdu: "اے ہمارے رب! ہمارے دلوں کو ٹیڑھا نہ کر بعد اس کے کہ تو نے ہمیں ہدایت بخشی، اور ہمیں اپنے پاس سے خاص رحمت عطا فرما۔",
    en: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower."
  }
};

function loadPreset(key, el) {
  const p = PRESETS[key];
  if (!p) return;
  document.getElementById("inputBadge").value = p.badge;
  document.getElementById("inputArabic").value = p.arabic;
  document.getElementById("inputUrdu").value = p.urdu;
  document.getElementById("inputEnglish").value = p.en;
  updateLiveSimulator();

  document.querySelectorAll(".preset-pill").forEach(pill => pill.classList.remove("active"));
  if (el) el.classList.add("active");
  switchView('creator');
}

function updateLiveSimulator() {
  document.getElementById("previewBadge").textContent = document.getElementById("inputBadge").value;
  document.getElementById("previewArabic").textContent = document.getElementById("inputArabic").value;
  document.getElementById("previewUrdu").textContent = document.getElementById("inputUrdu").value;
  document.getElementById("previewEnglish").textContent = document.getElementById("inputEnglish").value;
}

function setTheme(themeName, el) {
  const screen = document.getElementById("customScreen");
  screen.className = "simulator-screen " + currentFormat + " theme-" + themeName;
  document.querySelectorAll(".theme-option").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
}

let currentFormat = "vertical";
function setFormat(fmt) {
  currentFormat = fmt;
  const screen = document.getElementById("customScreen");
  const curTheme = Array.from(screen.classList).find(c => c.startsWith("theme-")) || "theme-gold";
  screen.className = "simulator-screen " + fmt + " " + curTheme;
  document.getElementById("btnVertical").classList.toggle("active", fmt === "vertical");
  document.getElementById("btnHorizontal").classList.toggle("active", fmt === "horizontal");
}

// Custom Audio
const customAudio = document.getElementById("customAudio");
const customPlayBtn = document.getElementById("customPlayBtn");
const customSlider = document.getElementById("customSlider");
const customTime = document.getElementById("customTime");

function toggleCustomPlay() {
  if (customAudio.paused) {
    customAudio.play();
    customPlayBtn.textContent = "⏸";
  } else {
    customAudio.pause();
    customPlayBtn.textContent = "▶";
  }
}

function seekCustom(val) {
  customAudio.currentTime = parseFloat(val);
}

customAudio.addEventListener("timeupdate", () => {
  customSlider.value = customAudio.currentTime;
  const m = Math.floor(customAudio.currentTime / 60);
  const s = Math.floor(customAudio.currentTime % 60).toString().padStart(2, "0");
  customTime.textContent = m + ":" + s;
});

customAudio.addEventListener("ended", () => {
  customPlayBtn.textContent = "▶";
});

function handleAudioUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  customAudio.src = url;
  document.getElementById("audioFileName").textContent = "Uploaded: " + file.name;
  customAudio.play();
  customPlayBtn.textContent = "⏸";
}

function resetToDefaultAudio() {
  customAudio.src = "/public/quran-promo/video01/audio/recitation.mp3";
  document.getElementById("audioFileName").textContent = "Current Audio: Default Studio Recitation";
}

function downloadPresetCard() {
  const data = {
    badge: document.getElementById("inputBadge").value,
    arabic: document.getElementById("inputArabic").value,
    urdu: document.getElementById("inputUrdu").value,
    english: document.getElementById("inputEnglish").value,
    format: currentFormat,
    timestamp: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "quran-video-preset.json";
  a.click();
  appendChat("ai", "✓ Video Preset saved as <b>quran-video-preset.json</b>!");
}

// View Switching
function switchView(view) {
  document.getElementById("viewCreator").style.display = view === "creator" ? "block" : "none";
  document.getElementById("viewShowcase").style.display = view === "showcase" ? "block" : "none";
  document.getElementById("tabCreator").classList.toggle("active", view === "creator");
  document.getElementById("tabShowcase").classList.toggle("active", view === "showcase");
}

// Showcase Playback
const scAudio = customAudio;
function toggleScPlay() {
  toggleCustomPlay();
  document.getElementById("scPlayBtn").textContent = customPlayBtn.textContent;
}
function seekSc(val) {
  seekCustom(val);
}

// Director Chat Logic
async function sendMessage() {
  const input = document.getElementById("promptInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  appendChat("user", text);
  const thinkingId = appendChat("ai", "Thinking with Director...");

  try {
    const apiKey = localStorage.getItem("anthropic_key") || "";
    const model = localStorage.getItem("anthropic_model") || "claude-3-7-sonnet-20250219";

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text, apiKey, model, brand: "quran-promo", video: "video01" }),
    });

    const data = await res.json();
    document.getElementById(thinkingId).remove();

    if (data.reply) {
      appendChat("ai", data.reply.replace(/\\n/g, "<br>"));
    } else {
      appendChat("ai", "Error: " + (data.error || "Could not reach Director."));
    }
  } catch (err) {
    document.getElementById(thinkingId).remove();
    appendChat("ai", "Director: Received your message. To connect live Claude API, add your key in Settings.");
  }
}

function sendSuggestion(text) {
  document.getElementById("promptInput").value = text;
  sendMessage();
}

let msgCount = 0;
function appendChat(role, html) {
  msgCount++;
  const id = "msg-" + msgCount;
  const container = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.id = id;
  div.className = "chat-bubble " + (role === "user" ? "user" : "ai");
  div.innerHTML = html;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function clearChat() {
  document.getElementById("chatMessages").innerHTML = '<div class="chat-bubble ai">Chat reset. Ask me anything!</div>';
}

// Settings
document.getElementById("openSettingsBtn").onclick = () => {
  document.getElementById("apiKeyInput").value = localStorage.getItem("anthropic_key") || "";
  document.getElementById("modelSelect").value = localStorage.getItem("anthropic_model") || "claude-3-7-sonnet-20250219";
  document.getElementById("settingsDialog").showModal();
};

function saveSettings() {
  const key = document.getElementById("apiKeyInput").value.trim();
  const model = document.getElementById("modelSelect").value;
  localStorage.setItem("anthropic_key", key);
  localStorage.setItem("anthropic_model", model);
  document.getElementById("settingsDialog").close();
  appendChat("ai", "✓ Settings saved.");
}

// Theme
document.getElementById("themeToggle").onclick = () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
};
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(DIST, "index.html"), DASHBOARD_HTML, "utf8");
console.log("==> Phase 1 Video Creator Studio build complete!");
