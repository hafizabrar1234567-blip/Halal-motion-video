import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog, rgba, SceneFrame, useLayout } from "../../../../engine";
import { C, F } from "../../brand/theme";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const { p, W } = useLayout();
  const d = COPY.outro;

  // Gentle fade in and slow drift
  const tIn = prog(f, 0, 18);
  const fadeOut = prog(f, SCENES.outro.dur - 18, 18);

  return (
    <SceneFrame dur={SCENES.outro.dur} enter="depth" exit="none" drift={0.015}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: tIn * (1 - fadeOut),
        }}
      >
        <div
          style={{
            width: p(W * 0.88, 800),
            padding: p("40px 32px", "48px 48px"),
            borderRadius: p(36, 44),
            background: "linear-gradient(165deg, rgba(20, 36, 38, 0.72) 0%, rgba(8, 16, 17, 0.88) 100%)",
            border: `1.5px solid ${rgba(C.accent, 0.28)}`,
            boxShadow: `0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px ${rgba(C.accent, 0.15)}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Top Star */}
          <span style={{ color: C.accent, fontSize: p(28, 32), marginBottom: 16 }}>✦ ❖ ✦</span>

          {/* Sadaqallahul Azeem */}
          <div
            style={{
              fontFamily: F.arabic,
              fontSize: p(56, 64),
              fontWeight: 700,
              color: "#fff5db",
              textShadow: `0 0 30px ${rgba(C.accent, 0.7)}, 0 2px 10px rgba(0,0,0,0.9)`,
              lineHeight: 1.6,
              direction: "rtl",
              marginBottom: 16,
            }}
          >
            {d.arabic}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              fontSize: p(22, 24),
              color: C.accentLight,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {d.tagline}
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
