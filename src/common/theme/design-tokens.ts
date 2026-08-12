/** The single source of truth for visual values used by the application. */
export const designTokens = {
  colors: {
    primary: { light: "#F48FB1", dark: "#FFC107", kanban: "#4C82F6", kanbanHover: "#5B8FF9" },
    background: { light: "#F5F5DC", dark: "#121212" },
    surface: { light: "#FFF8DC", dark: "#333333", kanban: "#1E1F21", kanbanColumn: "#252629", kanbanCard: "#2F3034", kanbanElevated: "#2B2C2F", kanbanHover: "#3C3D42" },
    text: { primaryLight: "#333333", secondaryLight: "#666666", primaryDark: "#FFFFFF", secondaryDark: "#AAAAAA", kanbanPrimary: "#E1E2E5", kanbanSecondary: "#9E9EA4", inverse: "#FFFFFF" },
    border: { light: "#E0E0E0", dark: "#38393D", kanban: "#3C3D42" },
    status: { success: "#52C41A", successMaterial: "#4CAF50", warning: "#FF9800", error: "#F44336", info: "#2196F3", urgent: "#9C27B0", accent: "#FA8C16", projectYellow: "#FFEB3B", projectPink: "#E91E63", projectSlate: "#607D8B" },
    icon: { muted: "#9E9EA4", lightMode: "#FFD700", darkMode: "#90CAF9" },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px", xl: "20px", h2: "2.125rem", h1: "3.2em" },
    fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1.1, normal: 1.4, relaxed: 1.6 },
  },
  spacing: {
    1: "4px", 2: "8px", 3: "12px", 4: "16px",
    5: "20px", 6: "24px", 8: "32px", 10: "40px",
  },
  shape: {
    sm: "4px", md: "8px", lg: "12px", full: "50%",
  },
  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
    md: "0 8px 16px rgba(0, 0, 0, 0.15)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.5)",
  },
  transitions: {
    fast: "0.15s", normal: "0.3s", slow: "0.5s",
  },
} as const

export type DesignTokens = typeof designTokens

type ThemeMode = "light" | "dark"

export const getThemeCssVariables = (mode: ThemeMode): Record<`--${string}`, string> => {
  const c = designTokens.colors
  if (mode === "light") {
    return {
      "--color-text-primary": c.text.primaryLight,
      "--color-text-secondary": c.text.secondaryLight,
      "--color-text-disabled": "#BDBDBD",
      "--color-bg-paper": c.surface.light,
      "--color-primary-main": c.primary.light,
      "--color-primary-dark": "#E91E63",
      "--color-primary-contrast": c.text.inverse,
      "--color-action-hover": "rgba(0, 0, 0, 0.04)",
      "--color-action-selected": "rgba(0, 0, 0, 0.08)",
      "--color-divider": c.border.light,
    }
  }
  return {
    "--color-text-primary": c.text.primaryDark,
    "--color-text-secondary": c.text.secondaryDark,
    "--color-text-disabled": "#666666",
    "--color-bg-paper": c.surface.dark,
    "--color-primary-main": c.primary.dark,
    "--color-primary-dark": "#FFA000",
    "--color-primary-contrast": "#000000",
    "--color-action-hover": "rgba(255, 255, 255, 0.08)",
    "--color-action-selected": "rgba(255, 255, 255, 0.12)",
    "--color-divider": c.border.dark,
  }
}
