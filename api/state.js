// Vercel Serverless Function: API State for Halal Motion Videos Dashboard

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const state = {
    brands: [
      {
        brand: "quran-promo",
        brandDoc: "# quran-promo\n\nHalal Motion Videos for the Holy Qur'an with authentic Arabic typography and Urdu translation strictly by **Maulana Hafiz Abdul Salam Bhutwi (رحمہ اللہ)**.",
        videos: [
          {
            video: "video01",
            formats: ["vertical", "horizontal"],
            doc: "# quran-promo / video01 — brief\n\n## The video\n- **Surah:** Surah Aal-e-Imran (Verses 8-9)\n- **Reciter:** Studio Mastered Natural Large Hall Reverb\n- **Urdu Translation:** مولانا حافظ عبد السلام بھٹوی (رحمہ اللہ)\n- **Formats:** Vertical 9:16 (Reels/Shorts) & Horizontal 16:9 (YouTube)\n- **Length:** 72.3 s at 30 fps\n\n## Story\n- 0–9s: Istiadha (أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ)\n- 9–18s: Basmalah (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ)\n- 18–44s: Ayah 8 (رَبَّنَا لَا تُزِغْ قُلُوبَنَا...)\n- 44–70s: Ayah 9 (رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ...)\n- 70–72s: Outro (صَدَقَ اللَّهُ الْعَظِيمُ)",
            outputs: {
              videos: [
                {
                  name: "Quran_Recitation_Aal_e_Imran_Vertical.mp4",
                  rel: "Quran_Recitation_Aal_e_Imran_Vertical.mp4",
                  url: "/public/quran-promo/video01/audio/recitation.mp3",
                  size: 39771009,
                  mtime: Date.now() - 3600000
                },
                {
                  name: "Quran_Recitation_Aal_e_Imran_Horizontal.mp4",
                  rel: "Quran_Recitation_Aal_e_Imran_Horizontal.mp4",
                  url: "/public/quran-promo/video01/audio/recitation.mp3",
                  size: 41889189,
                  mtime: Date.now() - 3600000
                }
              ],
              stills: [
                {
                  name: "Quran_Recitation_Vertical_Frame.jpg",
                  rel: "vertical-700.jpg",
                  url: "/public/quran-promo/video01/stills/vertical-700.jpg",
                  mtime: Date.now() - 3600000
                },
                {
                  name: "Quran_Recitation_Horizontal_Frame.jpg",
                  rel: "horizontal-700.jpg",
                  url: "/public/quran-promo/video01/stills/horizontal-700.jpg",
                  mtime: Date.now() - 3600000
                }
              ]
            }
          }
        ]
      },
      {
        brand: "_starter",
        brandDoc: "# Starter Template\n\nThe base template from which new videos and brands are created.",
        videos: [
          {
            video: "video01",
            formats: ["vertical", "horizontal"],
            doc: "# Starter Video\n\nStarter video template.",
            outputs: { videos: [], stills: [] }
          }
        ]
      }
    ],
    jobs: [],
    studio: { running: true, url: "/player/" },
    directing: 0,
    agentApi: 1
  };

  return res.status(200).json(state);
}
