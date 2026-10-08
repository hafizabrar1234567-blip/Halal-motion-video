import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SceneFrame } from "../../../../engine";
import { QuranCard } from "../components/QuranCard";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

export const Ayah9: React.FC = () => {
  const f = useCurrentFrame();
  const d = COPY.ayah9;

  // Active line sync based on recitation timing
  // Line 1: 0 - 450 frames (0 - 15s)
  // Line 2: 450+ frames (15s+)
  const activeIndex = f >= 450 ? 1 : 0;

  return (
    <SceneFrame dur={SCENES.ayah9.dur} enter="depth" exit="push" drift={0.025}>
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
