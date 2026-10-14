export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const state = {
    ok: true,
    claude: {
      ok: !!process.env.ANTHROPIC_API_KEY,
      model: "claude-3-7-sonnet-20250219",
      mode: process.env.ANTHROPIC_API_KEY ? "cloud-api" : "ready-for-key",
    },
    brands: [
      {
        brand: "quran-promo",
        title: "Quran Promo",
        videos: [
          {
            video: "video01",
            title: "Surah Aal-e-Imran (Verses 8-9)",
            durationSeconds: 72.3,
            formats: ["vertical", "horizontal"],
            audioUrl: "/public/quran-promo/video01/audio/recitation.mp3",
            scenes: ["Istiadha", "Basmalah", "Ayah 8", "Ayah 9", "Outro"],
          },
        ],
      },
      {
        brand: "_starter",
        title: "Starter Template",
        videos: [
          {
            video: "video01",
            title: "Promo Starter",
            durationSeconds: 30,
            formats: ["vertical", "horizontal"],
          },
        ],
      },
    ],
  };

  return res.status(200).json(state);
}
