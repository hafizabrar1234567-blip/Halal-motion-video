import { buildTimeline } from "../../../engine";

// Scene lengths in frames (30 fps), in play order.
// Total duration: 2169 frames = 72.3 seconds (matches recitation.mp3).
export const timeline = buildTimeline(
  {
    istiadha: 270, // 0.0s - 9.0s: A'udhu billahi minash-shaytanir-rajim
    basmalah: 270, // 9.0s - 18.0s: Bismillahir-Rahmanir-Rahim & Surah Title
    ayah8: 780,    // 18.0s - 44.0s: Rabbana la tuzigh quloobana... innaka antal-Wahhab
    ayah9: 780,    // 44.0s - 70.0s: Rabbana innaka jami'un-nasi... innallaha la yukhliful-mee'ad
    outro: 101,    // 70.0s - 72.3s: Sadaqallahul-Azeem & Reverb Outro
  },
  { fps: 30, overlap: 8 },
);

export const FPS = timeline.fps;
export const TOTAL = timeline.total;
export const SCENES = timeline.scenes;
export type SceneKey = keyof typeof SCENES;
