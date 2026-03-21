export const tokens = {
  colors: {
    background: "#F4F4F4", // workshopGray
    surface: "#FFFFFF",
    surfaceAlt: "#EBEBEB",
    
    primary: "#1F3A5F", // deepBlue
    primaryHover: "#162b47",
    
    accent: "#C9A227", // tradeGold
    accentHover: "#A8891C", // tradeGoldDark
    
    text: "#1F3A5F", // primary text
    textSecondary: "#6E6E6E", // concreteGray
    textTertiary: "#A5ACAF",
    
    border: "#E0E0E0",
    
    warn: "#FFC940",
    error: "#b00020",
    success: "#10EF75",
    
    fileTypeColors: {
      folder: "#FF8A00",
      code: "#3385FF",
      image: "#33CC33",
      json: "#FFCC00",
      pdf: "#f40f02",
      slides: "#8e44ad",
      video: "#2980b9",
      link: "#34495e"
    },
  },
  radii: { small: 4, medium: 8, large: 16, full: 9999 },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, section: 64 },
  typography: {
    fontFamily: "var(--font-body), 'Open Sans', sans-serif",
    headingFont: "var(--font-heading), 'Roboto Slab', serif",
    fontSize: 16,
    h1Size: 42,
    h2Size: 32,
    h3Size: 24,
    h4Size: 20,
    h5Size: 18,
    h6Size: 16,
    body1: 16,
    body2: 14,
    subscript: 12,
    bodyFontWeight: 400,
    bodyFontWeightMedium: 600,
    headingFontWeight: 700,
    lineHeight: 1.6,
    headingLineHeight: 1.3,
  },
  strokeWidth: 2,
  transitions: {
    default: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 0.1s ease-out",
    slow: "all 0.3s ease-in-out",
  },
  shadows: {
    sm: "0 1px 2px rgba(31,58,95,0.05)",
    md: "0 4px 12px rgba(31,58,95,0.08)",
    lg: "0 8px 24px rgba(31,58,95,0.12)",
    modal: "0 12px 32px rgba(31,58,95,0.18)",
  },
  cardShadow: "0 2px 8px rgba(31,58,95,0.08)",
  headerGlass: "rgba(31,58,95,0.95)",
  glassBlur: "blur(10px)",
};

export type Theme = typeof tokens;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
