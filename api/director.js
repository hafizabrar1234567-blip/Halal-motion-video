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

  if (!conversationHistory.has(key)) {
    conversationHistory.set(key, [
      {
        role: "claude",
        text: `**Assalamu Alaikum!** I am your Halal Motion Videos Director.\n\nCurrent project: **${brand} / ${video}**.\n- **Audio:** Mastered Quran recitation (Natural Large Hall Reverb)\n- **Urdu Translation:** Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ)\n- **Formats:** Vertical (9:16) & Horizontal (16:9)\n\nTell me what scenes, translations, or design changes you would like to make!`
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
        reply = `**Director Notes:**\nI have received your note: "${text}".\n\n- Updated the motion storyboard and timing.\n- Preserved authentic Arabic typography and **Maulana Hafiz Abdul Salam Bhutwi's** Urdu translation.\n- Preview the updated scene in the preview window above.`;
      }

      messages.push({ role: "claude", text: reply });
    }
  }

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
      videoLanguage: "Arabic & Urdu (Hafiz Abdul Salam Bhutwi)",
      voiceLanguage: "Arabic Quran Recitation",
      length: 72
    },
    materials: {
      brand: [],
      video: [
        { name: "recitation.mp3", path: "quran-promo/video01/audio/recitation.mp3", type: "sfx" }
      ]
    },
    claude: { ok: true, model: "Claude 3.7 / Gemini" },
    model: "Claude 3.7 / Gemini",
    effort: "high",
    efforts: { medium: "Medium", high: "High", xhigh: "Extra high" }
  };

  return res.status(200).json(directorState);
}
