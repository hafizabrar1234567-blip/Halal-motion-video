export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const settings = {
    elevenlabs: {
      hasKey: false,
      keyHint: "Not set",
      voiceId: "",
      voiceName: "",
      model: "eleven_multilingual_v2",
      models: {
        eleven_multilingual_v2: "Eleven Multilingual v2",
        eleven_turbo_v2_5: "Eleven Turbo v2.5"
      }
    }
  };

  return res.status(200).json(settings);
}
