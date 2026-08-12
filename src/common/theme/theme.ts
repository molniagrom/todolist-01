import type { ThemeMode } from "@/app/app-slice.ts"
import { createTheme } from "@mui/material/styles"
import { designTokens } from "./design-tokens"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "light"
        ? { // Light theme colors
            primary: {
              main: designTokens.colors.primary.light,
            },
            secondary: {
              main: "#FFFACD", // Light Yellow
            },
            background: {
              default: designTokens.colors.background.light,
              paper: designTokens.colors.surface.light,
            },
            text: {
              primary: designTokens.colors.text.primaryLight,
              secondary: designTokens.colors.text.secondaryLight,
            },
          }
        : { // Dark theme colors
            primary: {
              main: designTokens.colors.primary.dark,
            },
            background: {
              default: designTokens.colors.background.dark,
              paper: designTokens.colors.surface.dark,
            },
            text: {
              primary: designTokens.colors.text.primaryDark,
              secondary: designTokens.colors.text.secondaryDark,
            },
          }),
    },
    typography: {
      fontFamily: designTokens.typography.fontFamily,
      h1: { fontSize: designTokens.typography.fontSize.h1, lineHeight: designTokens.typography.lineHeight.tight },
      h2: { fontSize: designTokens.typography.fontSize.h2 },
      body1: { fontSize: designTokens.typography.fontSize.md, lineHeight: designTokens.typography.lineHeight.normal },
      button: { fontWeight: designTokens.typography.fontWeight.semibold, textTransform: "none" },
    },
  })
}
