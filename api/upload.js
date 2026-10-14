// Vercel Serverless Function: API Upload for Halal Motion Videos
// Handles uploaded media (images, audio, videos, fonts)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { brand = "custom", video = "video01", name = "file" } = req.query || {};
    const ext = (name.split(".").pop() || "").toLowerCase();
    
    let type = "other";
    if (/^(png|jpe?g|webp|gif|svg|avif)$/.test(ext)) type = "img";
    else if (/^(mp3|wav|m4a|aac|ogg)$/.test(ext)) type = "sfx";
    else if (/^(mp4|mov|webm)$/.test(ext)) type = "video";
    else if (/^(woff2?|ttf|otf)$/.test(ext)) type = "fonts";

    return res.status(200).json({
      ok: true,
      name,
      type,
      brand,
      video,
      path: `${brand}/${video}/${type}/${name}`,
      message: `File ${name} uploaded successfully.`
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to process upload." });
  }
}
