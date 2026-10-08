import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SceneFrame } from "../../../../engine";
import { QuranCard } from "../components/QuranCard";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

export const Ayah8: React.FC = () => {
  const f = useCurrentFrame();
  const d = COPY.ayah8;

  // Active line sync based on recitation timing
  // Line 1: 0 - 330 frames (0 - 11s)
  // Line 2: 330 - 560 frames (11 - 18.6s)
  // Line 3: 560+ frames (18.6s+)
  let activeIndex = 0;
  if (f >= 560) {
    activeIndex = 2;
  } else if (f >= 330) {
    activeIndex = 1;
  }

  return (
    <SceneFrame dur={SCENES.ayah8.dur} enter="depth" exit="push" drift={0.025}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <QuranCard
          badge={d.ayahTitle}
          ayahNum={d.ayahNum}
          arabicLines={d.arabicLines}
          activeLineIndex={activeIndex}
          urdu={d.urdu}
          english={d.english}
        />
      </AbsoluteFill>
    </SceneFrame>
  );
};
