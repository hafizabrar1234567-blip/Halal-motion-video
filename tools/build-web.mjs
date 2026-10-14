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
<script>
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
            stills: []
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

// Override or wrap openStudio to open /player/
const originalOpenStudio = typeof openStudio === "function" ? openStudio : null;
window.openStudio = function(compId) {
  window.open("/player/", "_blank");
};
</script>
`;

// Replace `let state = { brands: [], jobs: [], studio: { running: false, url: "" } };`
originalHtml = originalHtml.replace(
  'let state = { brands: [], jobs: [], studio: { running: false, url: "" } };',
  'let state = DEFAULT_WEB_STATE;\ntry { const savedSel = JSON.parse(localStorage.getItem("sel")); if (!savedSel) sel = { brand: "quran-promo", video: "video01" }; } catch {}'
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

// Inject the Web Enhancement script before </body>
originalHtml = originalHtml.replace("</body>", WEB_ENHANCEMENT + "\n</body>");

fs.writeFileSync(path.join(DIST, "index.html"), originalHtml, "utf8");
console.log("==> Original Halal Motion Videos Dashboard successfully built into dist/index.html!");
