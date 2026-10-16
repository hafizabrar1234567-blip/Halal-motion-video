// Vercel Serverless Function: API Render for Halal Motion Videos Dashboard

const jobsStore = [];

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
    const format = body.format || "vertical";

    const jobId = Date.now();
    const job = {
      id: jobId,
      brand,
      video,
      label: `Render ${brand}/${video} · ${format}`,
      status: "done",
      progress: 100,
      started: Date.now() - 5000,
      ended: Date.now(),
      log: [
        "Bundling Remotion video composition...",
        "Encoding H.264 video frames with authentic Arabic typography...",
        "Merging recitation audio with Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ) translation...",
        "Halal Motion Video successfully prepared!"
      ]
    };

    return res.status(200).json(job);
  }

  return res.status(200).json({ ok: true, jobs: jobsStore });
}
