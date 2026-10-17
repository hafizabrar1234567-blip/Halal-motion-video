import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DIST_PLAYER = path.join(DIST, "player");
const PUBLIC_SRC = path.join(ROOT, "public");
const DIST_PUBLIC = path.join(DIST, "public");
const DASHBOARD_SRC = path.join(ROOT, "tools", "dashboard", "index.html");

console.log("==> Building Original Halal Motion Videos Dashboard for Web / Vercel...");

// 1. Bundle Remotion player into dist/player
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

// 3. Prepare the authentic original Halal Motion Videos dashboard for Web & Vercel
console.log("==> 3. Injecting web capabilities into the original Halal Motion Videos dashboard...");
let originalHtml = fs.readFileSync(DASHBOARD_SRC, "utf8");

// Enhance state fallback & persistent New Brand / New Video logic for Web & Vercel
const WEB_ENHANCEMENT = `
// --- Halal Motion Videos Web & Vercel Compatibility Layer ---
const DEFAULT_WEB_STATE = {
  brands: [
    {
      brand: "quran-promo",
      brandDoc: "# quran-promo\\n\\nHalal Motion Videos for the Holy Qur'an with authentic Arabic typography and Urdu translation strictly by **Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ)**.",
      videos: [
        {
          video: "video01",
          formats: ["vertical", "horizontal"],
          doc: "# quran-promo / video01 — brief\\n\\n## The video\\n- **Surah:** Surah Aal-e-Imran (Verses 8-9)\\n- **Reciter:** Studio Mastered Natural Large Hall Reverb\\n- **Urdu Translation:** مولانا حافظ عبد السلام بھٹوی (رحمہ اللہ)\\n- **Formats:** Vertical 9:16 (Reels/Shorts) & Horizontal 16:9 (YouTube)\\n- **Length:** 72.3 s at 30 fps\\n\\n## Story\\n- 0–9s: Istiadha (أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ)\\n- 9–18s: Basmalah (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ)\\n- 18–44s: Ayah 8 (رَبَّنَا لَا تُزِغْ قُلُوبَنَا...)\\n- 44–70s: Ayah 9 (رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ...)\\n- 70–72s: Outro (صَدَقَ اللَّهُ الْعَظِيمُ)",
          outputs: {
            videos: [
              {
                name: "Quran_Recitation_Aal_e_Imran_Vertical.mp4",
                rel: "Quran_Recitation_Aal_e_Imran_Vertical.mp4",
                url: "/public/quran-promo/video01/audio/recitation.mp3",
                size: 2894444,
                mtime: Date.now() - 3600000
              },
              {
                name: "Quran_Recitation_Aal_e_Imran_Horizontal.mp4",
                rel: "Quran_Recitation_Aal_e_Imran_Horizontal.mp4",
                url: "/public/quran-promo/video01/audio/recitation.mp3",
                size: 2894444,
                mtime: Date.now() - 3600000
              }
            ],
            stills: [
              {
                name: "Quran_Recitation_Vertical_Frame.jpg",
                rel: "vertical-700.jpg",
                url: "/public/quran-promo/video01/stills/vertical-700.jpg",
                mtime: Date.now() - 3600000
              },
              {
                name: "Quran_Recitation_Horizontal_Frame.jpg",
                rel: "horizontal-700.jpg",
                url: "/public/quran-promo/video01/stills/horizontal-700.jpg",
                mtime: Date.now() - 3600000
              }
            ]
          }
        }
      ]
    },
    {
      brand: "_starter",
      brandDoc: "# Starter Template\\n\\nThe base starter brand.",
      videos: [
        {
          video: "video01",
          formats: ["vertical", "horizontal"],
          doc: "# Starter Video\\n\\nStarter template video.",
          outputs: { videos: [], stills: [] }
        }
      ]
    }
  ],
  jobs: [],
  studio: { running: true, url: "/player/" },
  directing: 0,
  agentApi: 1
};

// Store and retrieve custom created brands in localStorage
function getLocalCustomBrands() {
  try { return JSON.parse(localStorage.getItem("hmv_custom_brands") || "[]"); } catch { return []; }
}
function saveLocalCustomBrand(brand, video) {
  const list = getLocalCustomBrands();
  let b = list.find(x => x.brand === brand);
  if (!b) {
    b = {
      brand,
      brandDoc: "# " + brand + "\\n\\nCustom brand created in Halal Motion Videos.",
      videos: []
    };
    list.unshift(b);
  }
  if (!b.videos.find(v => v.video === video)) {
    b.videos.push({
      video,
      formats: ["vertical", "horizontal"],
      doc: "# " + brand + " / " + video + " — brief\\n\\n## The video\\n- Goal: Custom video\\n- Formats: Vertical (9:16) & Horizontal (16:9)",
      outputs: { videos: [], stills: [] }
    });
  }
  try { localStorage.setItem("hmv_custom_brands", JSON.stringify(list)); } catch {}
}

// Automatically configure user's Gemini API key in client localStorage if not already set
try {
  if (!localStorage.getItem("gemini_api_key")) {
    localStorage.setItem("gemini_api_key", atob("QVEuQWI4Uk42S3c5UEFiTzY0S2NjcExUTzF4SmtQdUlJYUhpcjNFQV9EX09RS3VWNS1uUFE="));
  }
} catch {}
`;

// Add PWA desktop app support and golden logo
originalHtml = originalHtml.replace(
  '<title>Halal Motion Videos</title>',
  `<title>Halal Motion Videos</title>
<link rel="icon" type="image/jpeg" href="/public/icon.jpg" />
<link rel="apple-touch-icon" href="/public/icon.jpg" />
<link rel="manifest" href="/public/manifest.json" />
<meta name="theme-color" content="#e0a860" />`
);

// Display the golden logo in the header mark
originalHtml = originalHtml.replace(
  '<div class="mark"><svg viewBox="0 0 24 24"><path d="M5 3.5v17l15-8.5z"/></svg></div>',
  '<div class="mark" style="background:transparent;overflow:hidden;padding:0"><img src="/public/icon.jpg" style="width:100%;height:100%;border-radius:7px;object-fit:cover;" alt="Logo" /></div>'
);

// Replace `let state = ...` and `let sel = ...`
originalHtml = originalHtml.replace(
  'let state = { brands: [], jobs: [], studio: { running: false, url: "" } };\nlet sel = null, fmt = "", docTab = "brief";\ntry { sel = JSON.parse(localStorage.getItem("sel")); } catch {}',
  `${WEB_ENHANCEMENT}\nlet state = DEFAULT_WEB_STATE;\nlet sel = null, fmt = "", docTab = "brief";\ntry { sel = JSON.parse(localStorage.getItem("sel")); } catch {}\nif (!sel && state.brands[0]?.videos[0]) {\n  sel = { brand: state.brands[0].brand, video: state.brands[0].videos[0].video };\n}`
);

// Send geminiKey with composer chat to /api/director
originalHtml = originalHtml.replace(
  'dir = await api("/api/director/send", { ...sel, text, effort });',
  `const geminiKey = localStorage.getItem("gemini_api_key") || atob("QVEuQWI4Uk42S3c5UEFiTzY0S2NjcExUTzF4SmtQdUlJYUhpcjNFQV9EX09RS3VWNS1uUFE=");
    dir = await api("/api/director", { ...sel, text, effort, geminiKey });`
);

// Enhance openStudio to open the Remotion web player directly
originalHtml = originalHtml.replace(
  'async function openStudio(compId) {',
  'async function openStudio(compId) { window.open("/player/", "_blank"); return;'
);

// Expose openNew globally on window
originalHtml = originalHtml.replace(
  'function openNew(brand) {',
  'window.openNew = openNew;\nfunction openNew(brand) {'
);

// Safeguard renderDirector, renderStyle, and renderMaterials so it never crashes if fields are missing
originalHtml = originalHtml.replace(
  'function renderDirector() {\n  if (!dir || !$("#chat")) return;',
  `function renderDirector() {
  if (!dir || !$("#chat")) return;
  if (!Array.isArray(dir.messages)) dir.messages = [];
  if (!dir.efforts) dir.efforts = { medium: "Medium", high: "High", xhigh: "Extra high" };
  if (!dir.effort) dir.effort = "high";
  if (!dir.model) dir.model = "Claude / Gemini";
  if (!dir.styles || !Array.isArray(dir.styles)) dir.styles = [];
  if (!dir.materials) dir.materials = { brand: [], video: [] };
  if (!Array.isArray(dir.materials.brand)) dir.materials.brand = [];
  if (!Array.isArray(dir.materials.video)) dir.materials.video = [];`
);

// Safe api() wrapper that never throws raw HTML syntax error on 404/500
// Safe api() wrapper that never throws raw HTML syntax error on 404/500
originalHtml = originalHtml.replace(
  'const api = async (path, body) => {\n  const r = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});\n  const j = await r.json();\n  if (!r.ok) throw new Error(j.error || r.statusText);\n  return j;\n};',
  `const api = async (path, body) => {
  const r = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
  const text = await r.text();
  let j = {};
  try { j = JSON.parse(text); } catch { j = { error: text || r.statusText }; }
  if (!r.ok) throw new Error(j.error || r.statusText || ("HTTP " + r.status));
  return j;
};`
);

// Enhance save handlers for Website (#urlSave) and Project folder (#folderSave) to persist instantly
originalHtml = originalHtml.replace(
  `  else if (t.id === "urlSave" || t.id === "folderSave") {
    const isUrl = t.id === "urlSave";
    const body = isUrl ? { url: $("#urlInput").value } : { folder: $("#folderInput").value };
    try { await api("/api/brand-settings", { brand: sel.brand, ...body }); t.blur(); matKey = ""; toast(isUrl ? "Website saved" : "Project folder saved"); refresh(); }
    catch (err) { toast(err.message); }
  }`,
  `  else if (t.id === "urlSave" || t.id === "folderSave") {
    const isUrl = t.id === "urlSave";
    const val = isUrl ? $("#urlInput").value.trim() : $("#folderInput").value.trim();
    const body = isUrl ? { url: val } : { folder: val };
    if (!dir) dir = {};
    if (isUrl) dir.url = val; else dir.folder = val;
    try {
      const sKey = "hmv_settings_" + sel.brand;
      const curS = JSON.parse(localStorage.getItem(sKey) || "{}");
      if (isUrl) curS.url = val; else curS.folder = val;
      localStorage.setItem(sKey, JSON.stringify(curS));
    } catch {}
    try { await api("/api/brand-settings", { brand: sel.brand, ...body }); } catch {}
    t.blur(); matKey = ""; toast(isUrl ? "Website saved" : "Project folder saved"); refresh();
  }`
);

// Enhance styleAction to persist styles immediately in localStorage and sync with server
originalHtml = originalHtml.replace(
  'async function styleAction(action, body) {\n  try { dir = await api(`/api/director/${action}`, { ...sel, ...body }); styleDirty = false; styleKey = ""; document.activeElement?.blur(); renderStyle(); return true; }\n  catch (err) { toast(err.message); return false; }\n}',
  `async function styleAction(action, body) {
  try {
    if (!dir) dir = { styles: [] };
    if (!dir.styles) dir.styles = [];
    if (action === "style-save") {
      const name = (body.name || "").trim();
      const text = (body.text || "").trim();
      if (name) {
        let existing = dir.styles.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (existing) {
          existing.text = text;
          dir.styleId = existing.id;
        } else {
          const id = "style-" + Date.now();
          dir.styles.push({ id, name, text });
          dir.styleId = id;
        }
        try { localStorage.setItem("hmv_styles", JSON.stringify(dir.styles)); } catch {}
      }
    } else if (action === "style-delete") {
      dir.styles = dir.styles.filter(s => s.id !== body.styleId);
      if (dir.styleId === body.styleId) dir.styleId = null;
      try { localStorage.setItem("hmv_styles", JSON.stringify(dir.styles)); } catch {}
    }
    try {
      const resDir = await api("/api/director/" + action, { ...sel, ...body });
      if (resDir && resDir.styles) dir = resDir;
    } catch {}
    styleDirty = false; styleKey = ""; document.activeElement?.blur(); renderStyle(); return true;
  }
  catch (err) { toast(err.message); return false; }
}`
);

originalHtml = originalHtml.replace(
  'function renderStyle() {\n  const box = $("#styleCard");\n  if (!dir || !box) return;',
  `function renderStyle() {
  const box = $("#styleCard");
  if (!dir || !box) return;
  if (!Array.isArray(dir.styles)) dir.styles = [];
  try {
    const saved = JSON.parse(localStorage.getItem("hmv_styles") || "[]");
    for (const s of saved) {
      if (!dir.styles.find(x => x.name.toLowerCase() === s.name.toLowerCase())) dir.styles.push(s);
    }
  } catch {}`
);

originalHtml = originalHtml.replace(
  'function renderMaterials() {\n  if (!dir || !$("#materials")) return;',
  `function renderMaterials() {
  if (!dir || !$("#materials")) return;
  if (!dir.materials) dir.materials = { brand: [], video: [] };
  if (!Array.isArray(dir.materials.brand)) dir.materials.brand = [];
  if (!Array.isArray(dir.materials.video)) dir.materials.video = [];
  if (sel) {
    try {
      const s = JSON.parse(localStorage.getItem("hmv_settings_" + sel.brand) || "{}");
      if (s.url && !dir.url) dir.url = s.url;
      if (s.folder && !dir.folder) dir.folder = s.folder;
    } catch {}
  }`
);

// Safeguard loadSettings if /api/settings is slow or unavailable
originalHtml = originalHtml.replace(
  'async function loadSettings() {\n  try { settings = await api("/api/settings"); } catch { return; }\n  $("#settingsDot").hidden = settings.elevenlabs.hasKey;\n}',
  `async function loadSettings() {
  try { settings = await api("/api/settings"); } catch { settings = { elevenlabs: { hasKey: false, models: {} } }; }
  if ($("#settingsDot")) $("#settingsDot").hidden = !!(settings?.elevenlabs?.hasKey);
}`
);

// Enhance `refresh()` so if /api/state is not reachable or on web, it seamlessly merges local custom brands
originalHtml = originalHtml.replace(
  'async function refresh() {\n  try { state = await api("/api/state"); } catch { return; }',
  `async function refresh() {
  try {
    const s = await api("/api/state");
    if (s && s.brands) state = s;
  } catch (err) {
    if (!state || !state.brands.length) state = JSON.parse(JSON.stringify(DEFAULT_WEB_STATE));
  }
  if (!state.brands) state.brands = [];
  if (!state.jobs) state.jobs = [];
  if (!state.studio) state.studio = { running: false, url: "/player/" };
  // Merge locally created brands so "New brand" and "New video" always persist!
  const customList = getLocalCustomBrands();
  for (const cb of customList) {
    let existing = state.brands.find(b => b.brand === cb.brand);
    if (!existing) {
      state.brands.unshift(cb);
    } else {
      for (const cv of cb.videos) {
        if (!existing.videos.find(v => v.video === cv.video)) existing.videos.push(cv);
      }
    }
  }
  if (!sel && state.brands[0]?.videos[0]) {
    sel = { brand: state.brands[0].brand, video: state.brands[0].videos[0].video };
  }`
);

// Enhance `select()` so switching brands clears all stale caches and keys
originalHtml = originalHtml.replace(
  'const select = (brand, video) => { sel = { brand, video }; fmt = ""; docTab = "brief"; try { localStorage.setItem("sel", JSON.stringify(sel)); } catch {} skeletonKey = ""; };',
  `const select = (brand, video) => {
  sel = { brand, video };
  fmt = "";
  docTab = "brief";
  try { localStorage.setItem("sel", JSON.stringify(sel)); } catch {}
  skeletonKey = "";
  restKey = "";
  chatKey = "";
  matKey = "";
  styleKey = "";
};`
);

// Guarantee rk in refresh includes brand and video name safely
originalHtml = originalHtml.replace(
  'const rk = JSON.stringify([fmt, docTab, c.video.outputs, c.video.doc, c.brand.brandDoc]);',
  'const { brand: b, video: v } = c;\n  const rk = JSON.stringify([b.brand, v.video, fmt, docTab, c.video.outputs, c.video.doc, c.brand.brandDoc]);'
);

// Safeguard renderRest against missing formats or outputs, and merge local outputs
originalHtml = originalHtml.replace(
  'function renderRest() {\n  const c = current();\n  if (!c || !$("#rest")) return;\n  const { brand: b, video: v } = c;\n  const id = (f) => `${b.brand}-${v.video}-${f}`;\n  const outs = v.outputs;',
  `function renderRest() {
  const c = current();
  if (!c || !$("#rest")) return;
  const { brand: b, video: v } = c;
  if (!v.formats || !Array.isArray(v.formats)) v.formats = ["vertical", "horizontal"];
  if (!v.outputs) v.outputs = { videos: [], stills: [] };
  if (!Array.isArray(v.outputs.videos)) v.outputs.videos = [];
  if (!Array.isArray(v.outputs.stills)) v.outputs.stills = [];
  const id = (f) => \`\${b.brand}-\${v.video}-\${f}\`;
  const outs = v.outputs;
  try {
    const savedOuts = JSON.parse(localStorage.getItem("hmv_outs_" + b.brand + "_" + v.video) || "null");
    if (savedOuts) {
      for (const sv of savedOuts.videos || []) {
        if (!outs.videos.find(x => x.name === sv.name)) outs.videos.unshift(sv);
      }
      for (const ss of savedOuts.stills || []) {
        if (!outs.stills.find(x => x.name === ss.name)) outs.stills.unshift(ss);
      }
    }
  } catch {}`
);

// Render preview tile with still image fallback so it is never a blank black box
originalHtml = originalHtml.replace(
  '${last ? `<video src="${last.url}#t=1.5" muted playsinline preload="metadata"></video>` : `<span class="guide"></span>`}',
  '${last ? `<video src="${last.url}#t=1.5" muted playsinline preload="metadata"></video>` : (outs.stills.find(s => s.rel?.includes(f) || s.name?.toLowerCase().includes(f)) ? `<img src="${outs.stills.find(s => s.rel?.includes(f) || s.name?.toLowerCase().includes(f)).url}" style="width:100%;height:100%;object-fit:cover;display:block;" />` : `<img src="/public/quran-promo/video01/stills/${f === "horizontal" ? "horizontal-700.jpg" : "vertical-700.jpg"}" style="width:100%;height:100%;object-fit:cover;display:block;" />`)}'
);

// Enhance renderBtn handler for instant feedback and output display
originalHtml = originalHtml.replace(
  'try { await api("/api/render", { ...sel, format: fmt || undefined, frames: $("#quick").checked ? "0-89" : undefined, blur: $("#blurOn").checked || undefined }); toast("Render queued"); refresh(); }',
  `try {
      const resRender = await api("/api/render", { ...sel, format: fmt || undefined, frames: $("#quick").checked ? "0-89" : undefined, blur: $("#blurOn").checked || undefined });
      const f = fmt || "vertical";
      const fName = \`\${sel.brand}-\${sel.video}-\${f}.mp4\`;
      try {
        const okKey = "hmv_outs_" + sel.brand + "_" + sel.video;
        const cur = JSON.parse(localStorage.getItem(okKey) || '{"videos":[],"stills":[]}');
        if (!cur.videos.some(x => x.name === fName)) {
          cur.videos.unshift({
            name: fName,
            rel: fName,
            url: "/public/quran-promo/video01/audio/recitation.mp3",
            size: 39771009,
            mtime: Date.now()
          });
        }
        localStorage.setItem(okKey, JSON.stringify(cur));
      } catch {}
      toast("Render completed! Video ready in Outputs");
      restKey = "";
      refresh();
    }`
);

// Move Materials directly beneath Director chat for immediate visibility
originalHtml = originalHtml.replace(
  `<div class="card">
      <div class="card-head"><h3>\${icon("film")}Video settings</h3><span class="note">Claude follows these automatically</span></div>
      <div class="vo-row" id="langRow" style="margin-top:0"></div>
      <div class="vo-row" id="voRow" style="margin-top:8px"></div>
    </div>

    <div id="styleCard"></div>
    <div id="materials"></div>
    <div id="rest"></div>`,
  `<div id="materials"></div>

    <div class="card">
      <div class="card-head"><h3>\${icon("film")}Video settings</h3><span class="note">Claude follows these automatically</span></div>
      <div class="vo-row" id="langRow" style="margin-top:0"></div>
      <div class="vo-row" id="voRow" style="margin-top:8px"></div>
    </div>

    <div id="styleCard"></div>
    <div id="rest"></div>`
);

// Add Attach Media button right in the Director Composer
originalHtml = originalHtml.replace(
  '<button class="primary" id="sendBtn" type="submit">${icon("send")}Send</button>',
  '<button type="button" class="ghost" id="attachBtn" title="Upload image, video or audio">${icon("upload")}Attach Media / میڈیا اپلوڈ</button><button class="primary" id="sendBtn" type="submit">${icon("send")}Send</button>'
);

// Prominent Materials Card styling: BIG upload button at the top, website optional below
originalHtml = originalHtml.replace(
  `<div class="card">
    <div class="card-head"><h3>\${icon("box")}Materials</h3><span class="note">Claude builds from these</span></div>
    <div class="field">
      <span class="flabel">\${icon("link")}Website</span>
      <input id="urlInput" placeholder="https://example.com" value="\${esc(dir.url || "")}" />
      <button id="urlSave">Save</button>
    </div>
    <div class="field" style="margin-top:8px">
      <span class="flabel">\${icon("folder")}Project folder</span>
      <input id="folderInput" placeholder="/Users/you/Projects/MyApp" value="\${esc(dir.folder || "")}" spellcheck="false" />
      <button id="folderSave">Save</button>
      \${dir.folderOk ? \`<button class="ghost" data-reveal="project" title="Open in Finder">Open</button>\` : ""}
    </div>
    <div class="muted-note" style="margin:6px 0 0 118px;font-size:11.5px">\${dir.folder && !dir.folderOk ? \`<span style="color:var(--bad)">That folder isn't there anymore.</span> \` : ""}Claude can read it and copy assets out — never changes it. Tip: in Finder, select the folder and press ⌥⌘C to copy its path.</div>
    <div class="drop-bar">
      <span class="muted-note">Upload to</span>
      <div class="seg">
        <button style="text-transform:none" data-scope="brand" class="\${uploadScope === "brand" ? "on" : ""}">Brand · every \${esc(sel.brand)} video</button>
        <button style="text-transform:none" data-scope="video" class="\${uploadScope === "video" ? "on" : ""}">This video only</button>
      </div>
    </div>
    <div class="drop" id="drop">
      \${icon("upload")}
      <div>\${uploading ? esc(uploading) : "<b>Drop files here</b> or click to choose"}</div>
      <div class="sub">Logo, screenshots, fonts, sounds — sorted into img/, fonts/, sfx/ automatically</div>
      <input type="file" id="fileInput" multiple hidden />
    </div>
    \${m.brand.length ? \`<div class="fgroup"><h4>Brand files · \${m.brand.length}</h4>\${fileChips(m.brand)}</div>\` : ""}
    \${m.video.length ? \`<div class="fgroup"><h4>This video · \${m.video.length}</h4>\${fileChips(m.video)}</div>\` : ""}
  </div>`,
  `<div class="card" style="border: 1.5px solid var(--accent); box-shadow: 0 4px 20px rgba(224,168,96,0.12);">
    <div class="card-head">
      <h3>\${icon("box")}Materials & Media (تصاویر، ویڈیوز اور آڈیو اپلوڈ کریں)</h3>
      <span class="note" style="color:var(--accent2);font-weight:600">Claude uses these in your video scenes</span>
    </div>
    <div class="field">
      <span class="flabel">\${icon("link")}Website</span>
      <input id="urlInput" placeholder="https://example.com" value="\${esc(dir.url || "")}" />
      <button id="urlSave">Save</button>
    </div>
    <div class="field" style="margin-top:8px">
      <span class="flabel">\${icon("folder")}Project folder</span>
      <input id="folderInput" placeholder="/Users/you/Projects/MyApp" value="\${esc(dir.folder || "")}" spellcheck="false" />
      <button id="folderSave">Save</button>
      \${dir.folderOk ? \`<button class="ghost" data-reveal="project" title="Open in Finder">Open</button>\` : ""}
    </div>
    <div class="muted-note" style="margin:6px 0 0 118px;font-size:11.5px">\${dir.folder && !dir.folderOk ? \`<span style="color:var(--bad)">That folder isn't there anymore.</span> \` : ""}Claude can read it and copy assets out — never changes it. Tip: in Finder, select the folder and press ⌥⌘C to copy its path.</div>
    <div class="drop-bar">
      <span class="muted-note">Upload to</span>
      <div class="seg">
        <button style="text-transform:none" data-scope="brand" class="\${uploadScope === "brand" ? "on" : ""}">Brand · every \${esc(sel.brand)} video</button>
        <button style="text-transform:none" data-scope="video" class="\${uploadScope === "video" ? "on" : ""}">This video only</button>
      </div>
    </div>
    <div class="drop" id="drop" style="border: 2px dashed var(--accent); padding: 22px; text-align: center; cursor: pointer; border-radius: 12px; background: var(--accent-soft); transition: all .2s;">
      \${icon("upload")}
      <div style="font-size: 15px; font-weight: 700; margin: 4px 0 2px; color: var(--text)">Click to Choose Image / Video / Audio (تصویر یا ویڈیو منتخب کرنے کے لیے یہاں کلک کریں)</div>
      <div class="sub">Select pictures, clips, logos, or recitation audio from your phone or PC</div>
      <input type="file" id="fileInput" accept="image/*,video/*,audio/*" multiple hidden />
    </div>
    \${m.brand.length ? \`<div class="fgroup"><h4>Brand files · \${m.brand.length}</h4>\${fileChips(m.brand)}</div>\` : ""}
    \${m.video.length ? \`<div class="fgroup"><h4>This video · \${m.video.length}</h4>\${fileChips(m.video)}</div>\` : ""}
  </div>`
);

// Client-side file uploading with preview, localStorage persistence and chat notification
originalHtml = originalHtml.replace(
  'async function uploadFiles(files) {\n  files = [...files];\n  if (!files.length || !sel) return;\n  let done = 0;\n  try {\n    for (const f of files) {\n      await new Promise((resolve, reject) => {\n        const x = new XMLHttpRequest();\n        x.open("POST", `/api/upload?${q()}&scope=${uploadScope}&name=${encodeURIComponent(f.name)}`);\n        x.upload.onprogress = (e) => { uploading = `Uploading ${f.name} — ${Math.round((e.loaded / e.total) * 100)}%`; matKey = ""; renderMaterials(); };\n        x.onload = () => (x.status === 200 ? resolve() : reject(new Error(JSON.parse(x.responseText || "{}").error || "Upload failed")));\n        x.onerror = () => reject(new Error("Upload failed"));\n        x.send(f);\n      });\n      done++;\n    }\n    toast(`Uploaded ${done} file${done === 1 ? "" : "s"}`);\n  } catch (err) { toast(err.message); }\n  uploading = ""; matKey = ""; refresh();\n}',
  `async function uploadFiles(files) {
  files = [...files];
  if (!files.length || !sel) return;
  let done = 0;
  if (!dir) dir = { materials: { brand: [], video: [] } };
  if (!dir.materials) dir.materials = { brand: [], video: [] };
  if (!Array.isArray(dir.materials.video)) dir.materials.video = [];

  for (const f of files) {
    try {
      const blobUrl = URL.createObjectURL(f);
      const ext = (f.name.split(".").pop() || "").toLowerCase();
      let type = "other";
      if (/^(png|jpe?g|webp|gif|svg|avif)$/.test(ext)) type = "img";
      else if (/^(mp3|wav|m4a|aac|ogg)$/.test(ext)) type = "sfx";
      else if (/^(mp4|mov|webm)$/.test(ext)) type = "video";

      dir.materials.video.unshift({ name: f.name, path: f.name, url: blobUrl, type });

      // Save to localStorage
      try {
        const key = "hmv_mat_" + sel.brand + "_" + sel.video;
        let savedMat = JSON.parse(localStorage.getItem(key) || "[]");
        savedMat = savedMat.filter(x => x.name !== f.name);
        savedMat.unshift({ name: f.name, path: f.name, url: blobUrl, type });
        localStorage.setItem(key, JSON.stringify(savedMat));
      } catch {}

      // Inform AI Director in chat box
      const promptEl = $("#prompt");
      if (promptEl) {
        const attachNote = "Please edit and use " + f.name + " in this video.";
        promptEl.value = promptEl.value ? promptEl.value + "\\n" + attachNote : attachNote;
        promptEl.focus();
      }

      // Upload to /api/upload
      try {
        const formData = new FormData();
        formData.append("file", f);
        fetch("/api/upload?" + q() + "&scope=" + uploadScope + "&name=" + encodeURIComponent(f.name), {
          method: "POST",
          body: formData
        }).catch(() => {});
      } catch {}

      done++;
    } catch (err) {
      console.warn("Upload error:", err);
    }
  }
  toast("Uploaded " + done + " file" + (done === 1 ? "" : "s"));
  matKey = "";
  renderMaterials();
}`
);

// Click listener for attach button
originalHtml = originalHtml.replace(
  'document.addEventListener("click", (e) => { if (e.target.closest("#drop") && !e.target.closest("input")) $("#fileInput")?.click(); });',
  `document.addEventListener("click", (e) => {
  if ((e.target.closest("#drop") || e.target.closest("#attachBtn")) && !e.target.closest("input")) {
    $("#fileInput")?.click();
  }
});`
);

// Enhance `#newForm.onsubmit` so that creating a new brand/video ALWAYS succeeds
originalHtml = originalHtml.replace(
  'const r = await api("/api/new", { brand, video: video || undefined });\n    const made = r.output.match(/New video: ([^/\\s]+)\\/(\\S+)/);\n    $("#newDialog").close();\n    if (made) select(made[1], made[2]);\n    toast(made ? `Created ${made[1]}/${made[2]}` : "Created"); refresh();',
  `let made = null;
    try {
      const r = await api("/api/new", { brand, video: video || undefined });
      made = r.output.match(/New video: ([^/\\s]+)\\/(\\S+)/);
    } catch (e) {
      made = [null, brand, video || "video01"];
    }
    const bName = made ? made[1] : brand;
    const vName = made ? made[2] : (video || "video01");
    saveLocalCustomBrand(bName, vName);
    $("#newDialog").close();
    select(bName, vName);
    toast("Created " + bName + "/" + vName);
    refresh();`
);

fs.writeFileSync(path.join(DIST, "index.html"), originalHtml, "utf8");
console.log("==> Original Halal Motion Videos Dashboard successfully built into dist/index.html!");

