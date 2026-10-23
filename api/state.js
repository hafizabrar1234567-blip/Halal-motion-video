// Vercel Serverless Function: API State for Halal Motion Videos Dashboard
import { renderedJobsStore, renderedOutputsStore } from "./render.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const starterVideos = renderedOutputsStore?.get("_starter/video01") || [];

  const state = {
    brands: [
      {
        brand: "halal-promo",
        brandDoc: "# Halal Motion Videos — Official App Promo\n\nOfficial motion graphics promo video for Halal Motion Videos application.",
        videos: [
          {
            video: "video01",
            formats: ["vertical"],
            doc: "# Halal Motion Videos / App Promo\n\n- **عنوان:** حلال موشن ویڈیوز ایپ پرومو ایڈ\n- **خصوصیات:** بغیر نامناسب تصاویر، بغیر چہروں کے اینیمیشن، میوزک فری\n- **کوالٹی:** 1080p فل ایچ ڈی\n- **سائز:** 9:16 Vertical (Reels / Shorts / TikTok / WhatsApp Status)",
            outputs: {
              videos: [
                {
                  name: "Halal_Motion_Videos_App_Promo.mp4",
                  rel: "halal-motion-app-ad.mp4",
                  url: "/public/quran-promo/video01/halal-motion-app-ad.mp4",
                  size: 9008435,
                  mtime: Date.now()
                }
              ],
              stills: [
                {
                  name: "App_Promo_Scene_1.jpg",
                  rel: "ad-030.jpg",
                  url: "/public/quran-promo/video01/stills/ad-030.jpg",
                  mtime: Date.now()
                },
                {
                  name: "App_Promo_Scene_2.jpg",
                  rel: "ad-150.jpg",
                  url: "/public/quran-promo/video01/stills/ad-150.jpg",
                  mtime: Date.now()
                },
                {
                  name: "App_Promo_Scene_3.jpg",
                  rel: "ad-300.jpg",
                  url: "/public/quran-promo/video01/stills/ad-300.jpg",
                  mtime: Date.now()
                }
              ]
            }
          }
        ]
      },
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
                ...(renderedOutputsStore?.get("quran-promo/video01") || []),
                {
                  name: "quran-promo-video01-vertical.mp4",
                  rel: "quran-promo-video01-vertical.mp4",
                  url: "/public/quran-promo/video01/quran-promo-video01-vertical.mp4",
                  size: 39771009,
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
            outputs: {
              videos: [
                ...starterVideos,
                {
                  name: "Halal_Motion_App_Ad.mp4",
                  rel: "halal-motion-app-ad.mp4",
                  url: "/public/quran-promo/video01/halal-motion-app-ad.mp4",
                  size: 9008435,
                  mtime: Date.now()
                }
              ],
              stills: [
                {
                  name: "App_Promo_Hook.jpg",
                  rel: "ad-030.jpg",
                  url: "/public/quran-promo/video01/stills/ad-030.jpg",
                  mtime: Date.now()
                },
                {
                  name: "App_Promo_Features.jpg",
                  rel: "ad-150.jpg",
                  url: "/public/quran-promo/video01/stills/ad-150.jpg",
                  mtime: Date.now()
                }
              ]
            }
          }
        ]
      }
    ],
    jobs: renderedJobsStore || [],
    studio: { running: true, url: "/player/" },
    directing: 0,
    agentApi: 1
  };

  return res.status(200).json(state);
}
