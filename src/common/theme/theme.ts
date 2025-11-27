import type { ThemeMode } from "@/app/app-slice.ts"
import { createTheme } from "@mui/material/styles"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "light"
        ? { // Light theme colors
            primary: {
              main: "#F48FB1", // Even darker Pink
            },
            secondary: {
              main: "#FFFACD", // Light Yellow
            },
            background: {
              default: "#F5F5DC", // Beige
              paper: "#FFF8DC", // Light beige for paper elements
            },
            text: {
              primary: "#333333", // Dark grey text
              secondary: "#666666", // Medium grey text
            },
          }
        : { // Dark theme colors
            primary: {
              main: "#FFC107", // Slightly darker Yellow
            },
            background: {
              default: "#121212", // Black
              paper: "#333333", // Dark grey for paper elements
            },
            text: {
              primary: "#FFFFFF", // White text
              secondary: "#AAAAAA", // Light grey text
            },
          }),
    },
  })
}
