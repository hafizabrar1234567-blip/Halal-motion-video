import React from "react";
import { useCurrentFrame } from "remotion";
import { rgba, useLayout, Waveform } from "../../../../engine";
import { C, F } from "../../brand/theme";

interface QuranCardProps {
  badge: string;
  badgeEn?: string;
  arabicLines: string[];
  activeLineIndex?: number;
  urdu: string;
  english: string;
  ayahNum?: string;
}

export const QuranCard: React.FC<QuranCardProps> = ({
  badge,
  badgeEn,
  arabicLines,
  activeLineIndex = 0,
  urdu,
  english,
  ayahNum,
}) => {
  const f = useCurrentFrame();
  const { p, W } = useLayout();

  // Subtle breathing amplitude for waveform
  const amp = 0.5 + 0.35 * Math.sin(f / 8) * Math.cos(f / 13);

  const cardWidth = p(W * 0.92, 1100);
  const cardPadding = p(48, 56);
  const arabicFontSize = p(58, 64);
  const urduFontSize = p(28, 30);
  const enFontSize = p(22, 22);

  return (
    <div
      style={{
        width: cardWidth,
        maxWidth: "94vw",
        borderRadius: p(36, 44),
        background: "linear-gradient(165deg, rgba(20, 36, 38, 0.72) 0%, rgba(8, 16, 17, 0.88) 100%)",
        border: `1.5px solid ${rgba(C.accent, 0.28)}`,
        boxShadow: `0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px ${rgba(C.accent, 0.12)}, inset 0 1px 1px ${rgba(C.accentLight, 0.25)}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: cardPadding,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          borderRadius: 999,
          background: rgba(C.accent, 0.12),
          border: `1px solid ${rgba(C.accent, 0.35)}`,
          marginBottom: p(32, 36),
        }}
      >
        <span style={{ color: C.accent, fontSize: 18 }}>✦</span>
        <span
          style={{
            fontFamily: F.arabic,
            fontSize: p(24, 26),
            fontWeight: 700,
            color: C.accentLight,
            letterSpacing: 0.5,
          }}
        >
          {badge}
        </span>
        {ayahNum && (
          <span
            style={{
              background: C.accent,
              color: "#05090a",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ayahNum}
          </span>
        )}
        <span style={{ color: C.accent, fontSize: 18 }}>✦</span>
      </div>

      {/* Arabic Ayah Lines */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: p(16, 20),
          marginBottom: p(32, 40),
          direction: "rtl",
        }}
      >
        {arabicLines.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          return (
            <div
              key={idx}
              style={{
                fontFamily: F.arabic,
                fontSize: arabicFontSize,
                fontWeight: 600,
                lineHeight: 1.6,
                color: isActive ? "#fff5db" : rgba(C.text, 0.82),
                textShadow: isActive
                  ? `0 0 24px ${rgba(C.accent, 0.65)}, 0 2px 10px rgba(0,0,0,0.9)`
                  : "0 2px 8px rgba(0,0,0,0.7)",
                transform: isActive ? "scale(1.02)" : "scale(1.0)",
                transition: "all 0.3s ease",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Decorative Golden Divider */}
      <div
        style={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: p(28, 32),
        }}
      >
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${rgba(C.accent, 0.45)})` }} />
        <span style={{ color: C.accent, fontSize: 14 }}>❖</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${rgba(C.accent, 0.45)}, transparent)` }} />
      </div>

      {/* Urdu Translation */}
      <div
        style={{
          fontFamily: F.urdu,
          fontSize: urduFontSize,
          lineHeight: 1.8,
          color: "#e8eff0",
          direction: "rtl",
          marginBottom: p(18, 22),
          maxWidth: "96%",
          fontWeight: 500,
        }}
      >
        {urdu}
      </div>

      {/* English Translation */}
      <div
        style={{
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          fontSize: enFontSize,
          lineHeight: 1.5,
          color: C.muted,
          direction: "ltr",
          maxWidth: "92%",
          fontStyle: "italic",
          marginBottom: p(28, 32),
        }}
      >
        "{english}"
      </div>

      {/* Audio Waveform Bar */}
      <div style={{ width: p(240, 320), marginTop: "auto" }}>
        <Waveform width={p(240, 320)} height={24} bars={28} amp={amp} color={C.accent} />
      </div>
    </div>
  );
};
