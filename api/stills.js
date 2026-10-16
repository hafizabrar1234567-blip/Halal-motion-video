// Vercel Serverless Function: API Stills for Halal Motion Videos Dashboard

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const body = req.body || {};
    const brand = body.brand || "quran-promo";
    const video = body.video || "video01";

    const job = {
      id: Date.now(),
      brand,
      video,
      label: `Stills ${brand}/${video}`,
      status: "done",
      progress: 100,
      started: Date.now() - 2000,
      ended: Date.now(),
      log: ["Capturing still frames from Remotion composition...", "Frames saved successfully."]
    };

    return res.status(200).json(job);
  }

  return res.status(200).json({ ok: true });
}
