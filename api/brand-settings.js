// Vercel Serverless Function: API Brand Settings for Halal Motion Videos Dashboard

const brandSettingsStore = new Map();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const brand = req.body?.brand || req.query?.brand || "quran-promo";
  const current = brandSettingsStore.get(brand) || { url: "", folder: "" };

  if (req.method === "POST") {
    const body = req.body || {};
    if (typeof body.url === "string") {
      current.url = body.url.trim();
    }
    if (typeof body.folder === "string") {
      current.folder = body.folder.trim();
    }
    brandSettingsStore.set(brand, current);
    return res.status(200).json({ ok: true, brand, ...current });
  }

  return res.status(200).json({ ok: true, brand, ...current });
}
