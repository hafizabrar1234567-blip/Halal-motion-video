import type { Theme } from "../../../engine";

export { rgba } from "../../../engine";

// Brand palette. Replace with the product's real tokens (site CSS, brand guide).
export const C = {
  bg: "#060b0c",
  card: "#0d1719",
  text: "#f8f9fa",
  muted: "#98abb0",
  accent: "#d4af37",
  accentLight: "#fce9b5",
  good: "#10b981",
  warn: "#f59e0b",
} as const;

// Fonts.
export const F = {
  ui: "'Traditional Arabic', 'Amiri', 'Arabic Typesetting', 'Segoe UI', Tahoma, sans-serif",
  arabic: "'Traditional Arabic', 'Amiri', 'Scheherazade New', 'Arabic Typesetting', Tahoma, sans-serif",
  urdu: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', Tahoma, sans-serif",
} as const;

/** The palette mapped onto the engine's roles, for the shared components. */
export const theme: Theme = {
  direction: "rtl",
  fonts: { ui: F.ui },
  colors: {
    bg: C.bg,
    surface: C.card,
    text: C.text,
    accent: C.accent,
    accentLight: C.accentLight,
    positive: C.good,
    warning: C.warn,
  },
};
