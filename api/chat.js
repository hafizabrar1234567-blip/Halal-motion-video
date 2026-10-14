// Vercel Serverless Function to connect Director with Claude (Anthropic API)
// If ANTHROPIC_API_KEY is provided via header, request body, or process.env, it calls Claude.
// Otherwise, it returns an intelligent structured response demonstrating the Director workflow.

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { prompt, brand = "quran-promo", video = "video01", apiKey: clientKey, model = "claude-3-7-sonnet-20250219" } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const apiKey = clientKey || process.env.ANTHROPIC_API_KEY;

    // If an Anthropic API Key is available, call the real Claude API
    if (apiKey) {
      const systemPrompt = `You are the Halal Motion Videos Director, an expert motion graphics director and Islamic vocal / Quran video engineer.
You design elegant, modest, respectful motion videos using Remotion (React + TypeScript).
Rules:
- Halal only: no musical instruments, no immodesty, no falsehoods.
- Accurate Arabic typography, Tajweed phrasing, and dignified layouts.
- Output clean structured scene breakdowns with frame counts at 30 fps, typography styles, and sound cues.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: model.includes("claude") ? model : "claude-3-7-sonnet-20250219",
          max_tokens: 1500,
          system: systemPrompt,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        return res.status(response.status).json({
          error: errData.error?.message || "Failed to reach Anthropic Claude API.",
        });
      }

      const data = await response.json();
      const replyText = data.content?.[0]?.text || "No response received from Claude.";

      return res.status(200).json({
        ok: true,
        source: "claude-live-api",
        model: data.model,
        reply: replyText,
      });
    }

    // Fallback response when API key is not yet configured
    const cleanPrompt = prompt.toLowerCase();
    let reply = "";

    if (cleanPrompt.includes("ayah") || cleanPrompt.includes("surah") || cleanPrompt.includes("quran") || cleanPrompt.includes("recitation")) {
      reply = `### Director's Quran Scene Plan:
- **Video:** \`${brand} / ${video}\`
- **Format:** Vertical (9:16) & Horizontal (16:9)
- **Audio Master:** Natural Large Hall Reverb, centered vocal, 30s-72s pacing.
- **Visuals:** Gold radial backdrop (\`#d9a35f\`), Tajweed glyphs, smooth opacity transitions with Remotion spring interpolation.

*(Note: Live Claude API key is not yet set in Vercel. Add \`ANTHROPIC_API_KEY\` in Vercel Project Settings or Dashboard Settings to connect directly to Claude 3.7).*`;
    } else {
      reply = `### Director Response:
I received your request: "${prompt}".

In full production mode with your Claude API Key connected, I will:
1. Write the structured video brief with goals, target platforms, and scene timings.
2. Build 4-frame storyboard keyframes.
3. Generate the React/Remotion scene code in \`src/brands/${brand}/${video}/\`.

*(Connect your Anthropic Claude API Key in Settings to enable live generation on Vercel).*`;
    }

    return res.status(200).json({
      ok: true,
      source: "director-preview",
      reply,
      needsKey: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error." });
  }
}
