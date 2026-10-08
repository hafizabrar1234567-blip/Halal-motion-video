import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rgba } from "../../../../engine";
import { C } from "../../brand/theme";

/**
 * Spiritual Islamic midnight backdrop:
 * Deep obsidian/emerald ambient darkness with a warm golden halo and subtle geometric watermark.
 */
export const QuranBackdrop: React.FC = () => {
  const f = useCurrentFrame();

  // Gentle breathing halo light
  const pulse = 0.85 + 0.15 * Math.sin(f / 45);
  const driftY = Math.sin(f / 60) * 15;

  return (
    <AbsoluteFill style={{ background: "#05090a", overflow: "hidden" }}>
      {/* Deep radial gradient glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% ${50 + driftY * 0.1}%, ${rgba(C.accent, 0.18 * pulse)} 0%, ${rgba("#0a2522", 0.4)} 45%, #05090a 80%)`,
        }}
      />

      {/* Islamic 8-point geometric star watermark in center */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.05,
          transform: `rotate(${f * 0.04}deg) scale(${1 + 0.02 * Math.sin(f / 80)})`,
          pointerEvents: "none",
        }}
      >
        <svg width="800" height="800" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke={C.accent} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="80" stroke={C.accent} strokeWidth="1.5" />
          <rect x="35" y="35" width="130" height="130" stroke={C.accent} strokeWidth="1.5" fill="none" />
          <rect
            x="35"
            y="35"
            width="130"
            height="130"
            stroke={C.accent}
            strokeWidth="1.5"
            transform="rotate(45 100 100)"
            fill="none"
          />
          <circle cx="100" cy="100" r="50" stroke={C.accent} strokeWidth="1" />
          <circle cx="100" cy="100" r="30" stroke={C.accent} strokeWidth="0.8" />
        </svg>
      </AbsoluteFill>

      {/* Subtle top & bottom vignette */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(3,6,7,0.7) 0%, transparent 20%, transparent 80%, rgba(3,6,7,0.85) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
