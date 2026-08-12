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
} as const

export const cssVariables: Record<`--${string}`, string | number> = {
  "--font-family-base": designTokens.typography.fontFamily,
  "--font-size-xs": designTokens.typography.fontSize.xs,
  "--font-size-sm": designTokens.typography.fontSize.sm,
  "--font-size-md": designTokens.typography.fontSize.md,
  "--font-size-lg": designTokens.typography.fontSize.lg,
  "--font-size-xl": designTokens.typography.fontSize.xl,
  "--font-size-h1": designTokens.typography.fontSize.h1,
  "--font-weight-regular": designTokens.typography.fontWeight.regular,
  "--font-weight-medium": designTokens.typography.fontWeight.medium,
  "--font-weight-semibold": designTokens.typography.fontWeight.semibold,
  "--font-weight-bold": designTokens.typography.fontWeight.bold,
  "--line-height-tight": designTokens.typography.lineHeight.tight,
  "--line-height-normal": designTokens.typography.lineHeight.normal,
  "--line-height-relaxed": designTokens.typography.lineHeight.relaxed,
  "--color-kanban-background": designTokens.colors.surface.kanban,
  "--color-kanban-surface": designTokens.colors.surface.kanbanElevated,
  "--color-kanban-surface-hover": designTokens.colors.surface.kanbanHover,
  "--color-kanban-text": designTokens.colors.text.kanbanPrimary,
  "--color-kanban-text-muted": designTokens.colors.text.kanbanSecondary,
  "--color-kanban-border": designTokens.colors.border.kanban,
  "--color-primary-kanban": designTokens.colors.primary.kanban,
  "--color-primary-kanban-hover": designTokens.colors.primary.kanbanHover,
}

export type DesignTokens = typeof designTokens
