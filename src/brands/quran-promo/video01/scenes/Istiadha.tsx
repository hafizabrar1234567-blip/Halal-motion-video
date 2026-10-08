import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneFrame } from "../../../../engine";
import { QuranCard } from "../components/QuranCard";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

export const Istiadha: React.FC = () => {
  const d = COPY.istiadha;
  return (
    <SceneFrame dur={SCENES.istiadha.dur} enter="depth" exit="push" drift={0.02}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <QuranCard
          badge={d.surahBadge}
          arabicLines={[d.arabic]}
          activeLineIndex={0}
          urdu={d.urdu}
          english={d.english}
        />
      </AbsoluteFill>
    </SceneFrame>
  );
};
