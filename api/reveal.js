// Vercel Serverless Function: API Reveal for Halal Motion Videos Dashboard

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const body = req.body || {};
  const where = body.where || "out";
  const brand = body.brand || "_starter";
  const video = body.video || "video01";

  if (where === "out") {
    return res.status(200).json({
      ok: true,
      message: `Rendered outputs for ${brand}/${video} are ready in the right sidebar below.`,
      target: "outputs"
    });
  }

  if (where === "public" || where === "src") {
    return res.status(200).json({
      ok: true,
      message: `Project assets and materials are listed in the Materials section below.`,
      target: "materials"
    });
  }

  return res.status(200).json({ ok: true, message: "OK" });
}
