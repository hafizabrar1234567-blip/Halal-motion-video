export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { brand, video } = req.body || {};
    const NAME = /^[a-z][a-z0-9-]*$/;

    if (!NAME.test(brand ?? "") || (video && !NAME.test(video))) {
      return res.status(400).json({ error: "Names are lowercase letters, numbers and dashes, starting with a letter." });
    }

    const vidName = video || "video01";

    return res.status(200).json({
      ok: true,
      output: `New video: ${brand}/${vidName}`,
      brand,
      video: vidName
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to create video." });
  }
}
