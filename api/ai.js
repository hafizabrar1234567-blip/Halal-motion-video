// Vercel Serverless Function: AI Quran Verse & Scene Generator
// Powered by Google Gemini API (Free Tier) with built-in authentic Quranic fallback database.

const QURAN_KNOWLEDGE_BASE = [
  {
    keywords: ["rahman", "ar-rahman", "tukathiban", "neimat", "نعمت", "رحمان"],
    badge: "سُورَةُ الرَّحْمَٰن · آية ١٣",
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ۝",
    urdu: "پس تم اپنے رب کی نعمتوں میں سے کس کس کو جھٹلاؤ گے؟",
    english: "So which of the favors of your Lord would you deny?",
    theme: "emerald",
    seconds: 15
  },
  {
    keywords: ["parent", "parents", "walidain", "والدین", "ماں باپ", "irhamhuma"],
    badge: "سُورَةُ الْإِسْرَاء · آية ٢٤",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا ۝",
    urdu: "اور کہہ اے میرے رب! ان دونوں پر رحم فرما، جس طرح انہوں نے مجھے بچپن میں پالا۔",
    english: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    theme: "gold",
    seconds: 14
  },
  {
    keywords: ["hasbunallah", "hasbi", "کفایت", "بھروسہ", "توکل", "trust"],
    badge: "سُورَةُ آلِ عِمْرَان · آية ١٧٣",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ ۝",
    urdu: "ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے۔",
    english: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
    theme: "navy",
    seconds: 12
  },
  {
    keywords: ["hardship", "ease", "yusr", "usr", "مشکل", "آسانی", "inshirah"],
    badge: "سُورَةُ الشَّرْح · آية ٥ - ٦",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ۝",
    urdu: "پس یقیناً تنگی کے ساتھ آسانی ہے۔ بے شک تنگی کے ساتھ آسانی ہے۔",
    english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    theme: "emerald",
    seconds: 16
  },
  {
    keywords: ["rabbana atina", "dunya", "akhirah", "دنیا و آخرت", "جامع دعا", "hasanah"],
    badge: "سُورَةُ الْبَقَرَة · آية ٢٠١",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ۝",
    urdu: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔",
    english: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    theme: "gold",
    seconds: 20
  },
  {
    keywords: ["sabr", "patience", "صبر", "مصیبت", "sabireen"],
    badge: "سُورَةُ الْبَقَرَة · آية ١٥٣",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ۝",
    urdu: "اے لوگو جو ایمان لائے ہو! صبر اور نماز کے ساتھ مدد مانگو، بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔",
    english: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    theme: "sand",
    seconds: 22
  },
  {
    keywords: ["astaghfirullah", "tawbah", "forgiveness", "توبہ", "استغفار", "maghfirah"],
    badge: "سُورَةُ نُوح · آية ١٠",
    arabic: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا ۝",
    urdu: "پس میں نے کہا اپنے رب سے بخشش مانگو، بے شک وہ ہمیشہ سے بہت بخشنے والا ہے۔",
    english: "And I said, 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.'",
    theme: "emerald",
    seconds: 14
  },
  {
    keywords: ["kursi", "kursiyy", "کرسی", "ayatul kursi"],
    badge: "آيَةُ الْكُرْسِيِّ · سُورَةُ الْبَقَرَة",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۝",
    urdu: "اللہ (وہ ہے کہ) اس کے سوا کوئی معبود نہیں، ہمیشہ زندہ رہنے والا، سب کو سنبھالنے والا ہے۔ نہ اسے اونگھ پکڑتی ہے اور نہ نیند۔ اسی کا ہے جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں ہے۔",
    english: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.",
    theme: "navy",
    seconds: 30
  },
  {
    keywords: ["yasin", "yaseen", "یسین", "سلام", "salam"],
    badge: "سُورَةُ يس · آية ٥٨",
    arabic: "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ ۝",
    urdu: "سلام ہے، مہربان رب کی طرف سے کہا ہوا۔",
    english: "[And] 'Peace,' a word from a Merciful Lord.",
    theme: "gold",
    seconds: 12
  },
  {
    keywords: ["mulk", "تبارك", "الملك", "tabarak"],
    badge: "سُورَةُ الْمُلْك · آية ١",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ۝",
    urdu: "بہت بابرکت ہے وہ جس کے ہاتھ میں بادشاہی ہے اور وہ ہر چیز پر خوب قادر ہے۔",
    english: "Blessed is He in whose hand is dominion, and He is over all things competent.",
    theme: "gold",
    seconds: 16
  }
];

export default async function handler(req, res) {
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
    const { query, apiKey: clientKey } = req.body || {};

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required (e.g. 'Surah Rahman Ayah 13' or 'Dua for parents')." });
    }

    const cleanQuery = query.toLowerCase().trim();

    // 1. Check local authentic knowledge base first for instant, accurate matching
    const localMatch = QURAN_KNOWLEDGE_BASE.find(item =>
      item.keywords.some(kw => cleanQuery.includes(kw))
    );

    const geminiKey = clientKey || process.env.GEMINI_API_KEY;

    // 2. If Gemini API key is available, use Google Gemini for dynamic generation of ANY verse/dua
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const prompt = `You are a specialized Quran & Islamic scholar AI for Halal Motion Videos.
The user wants a Quranic verse or Dua for: "${query}".
CRITICAL RULE FOR URDU TRANSLATION:
You must strictly use the authentic, renowned Urdu translation of Hafiz Abdul Salam Bhutwi (رحمہ اللہ - ترجمہ قرآن مجید از مولانا حافظ عبد السلام بھٹوی). Do not use any other translation.
Return ONLY a valid JSON object with EXACTLY this structure (no markdown formatting, no code blocks):
{
  "badge": "Name of Surah in Arabic with verse number (e.g. سُورَةُ الرَّحْمَٰن · آية ١٣)",
  "arabic": "Exact Arabic Uthmani text of the verse with full tashkeel and ayah end marker ۝",
  "urdu": "Authentic Urdu translation strictly by Hafiz Abdul Salam Bhutwi (حافظ عبد السلام بھٹوی)",
  "english": "Accurate Sahih International English translation",
  "theme": "One of: gold, emerald, navy, sand",
  "seconds": Recommended duration in seconds (integer between 10 and 40)
}`;

        const gRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 600 }
          })
        });

        if (gRes.ok) {
          const gData = await gRes.json();
          const rawText = gData.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);

          return res.status(200).json({
            ok: true,
            source: "google-gemini-ai",
            data: parsed
          });
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local DB:", geminiErr.message);
      }
    }

    // 3. Fallback to local DB if matched
    if (localMatch) {
      return res.status(200).json({
        ok: true,
        source: "quran-knowledge-base",
        data: localMatch
      });
    }

    // 4. Default graceful fallback with advice
    return res.status(200).json({
      ok: true,
      source: "quran-default-fallback",
      data: {
        badge: "سُورَةُ الشَّرْح · آية ٥ - ٦",
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ۝",
        urdu: "پس یقیناً مشکل کے ساتھ آسانی ہے، بے شک مشکل کے ساتھ آسانی ہے۔",
        english: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
        theme: "emerald",
        seconds: 16,
        note: "Tip: Add a free Google Gemini API Key in Settings to search across all 6,236 Quranic verses dynamically!"
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error." });
  }
}
