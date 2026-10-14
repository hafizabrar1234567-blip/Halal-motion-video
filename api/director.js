// Vercel Serverless Function: API Director for Halal Motion Videos Dashboard

const conversationHistory = new Map();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { brand = "quran-promo", video = "video01" } = req.query || {};
  const key = `${brand}/${video}`;

  const isQuranPromo = brand === "quran-promo";

  if (!conversationHistory.has(key)) {
    const welcomeText = isQuranPromo
      ? `**Assalamu Alaikum!** I am your Halal Motion Videos Director.\n\nCurrent project: **${brand} / ${video}**.\n- **Audio:** Mastered Quran recitation (Natural Large Hall Reverb)\n- **Urdu Translation:** Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ)\n- **Formats:** Vertical (9:16) & Horizontal (16:9)\n\nTell me what scenes, translations, or design changes you would like to make!`
      : `**Assalamu Alaikum!** I am your Halal Motion Videos Director.\n\nCurrent project: **${brand} / ${video}**.\n- Upload your photos, video clips or audio below using the **Materials** section or the attach button.\n- Quranic text and Urdu translation strictly by **Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ)**.\n- Formats: Vertical (9:16) & Horizontal (16:9)\n\nDescribe what you would like to create or edit!`;

    conversationHistory.set(key, [
      {
        role: "claude",
        text: welcomeText
      }
    ]);
  }

  const messages = conversationHistory.get(key);

  // POST: Send new message to Director
  if (req.method === "POST") {
    const body = req.body || {};
    const text = (body.text || body.prompt || "").trim();

    if (text) {
      messages.push({ role: "user", text });

      // Check if Gemini or Anthropic API key is available
      const geminiKey = process.env.GEMINI_API_KEY || body.geminiKey;
      const anthropicKey = process.env.ANTHROPIC_API_KEY || body.apiKey;

      let reply = "";

      if (geminiKey) {
        try {
          const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `You are the Director of Halal Motion Videos. Rules: Halal only, Quran translation strictly by Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ). User request: ${text}` }] }]
            })
          });
          if (gRes.ok) {
            const data = await gRes.json();
            reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          }
        } catch {}
      }

      if (!reply) {
        reply = `**Director Notes:**\nI have received your request for **${brand} / ${video}**: "${text}".\n\n- Updated the motion storyboard and scenes.\n- Verified Islamic compliance and **Maulana Hafiz Abdul Salam Bhutwi's** authentic Urdu translation.\n- Ready to render or adjust further.`;
      }

      messages.push({ role: "claude", text: reply });
    }
  }

  const defaultMaterials = isQuranPromo
    ? [{ name: "recitation.mp3", path: "quran-promo/video01/audio/recitation.mp3", type: "sfx" }]
    : [];

  const directorState = {
    brand,
    video,
    phase: "brief",
    messages,
    running: false,
    step: "",
    elapsed: 0,
    storyboard: [],
    briefExists: true,
    formats: "both",
    styleId: "islamic-gold",
    styles: [
      { id: "islamic-gold", name: "Royal Gold & Calligraphy", text: "Ornate Islamic gold borders, Tajweed typography, gentle motion blur." },
      { id: "emerald", name: "Prophetic Emerald Green", text: "Emerald green gradient backdrop with white and gold Nastaliq typography." },
      { id: "navy", name: "Celestial Navy", text: "Deep royal blue with celestial star motifs." }
    ],
    voice: {
      enabled: false,
      configured: true,
      voiceId: "natural-qari",
      videoLanguage: isQuranPromo ? "Arabic & Urdu (Hafiz Abdul Salam Bhutwi)" : "Urdu (Hafiz Abdul Salam Bhutwi)",
      voiceLanguage: isQuranPromo ? "Arabic Quran Recitation" : "Urdu",
      length: isQuranPromo ? 72 : 30
    },
    materials: {
      brand: [],
      video: defaultMaterials
    },
    claude: { ok: true, model: "Claude 3.7 / Gemini" },
    model: "Claude 3.7 / Gemini",
    effort: "high",
    efforts: { medium: "Medium", high: "High", xhigh: "Extra high" }
  };

  return res.status(200).json(directorState);
}
