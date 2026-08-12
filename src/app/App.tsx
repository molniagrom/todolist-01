import "./App.css"
import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Routing } from "@/common/routing"
import { getTheme } from "@/common/theme"
import { useMeQuery } from "@/features/auth/api/authApi"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import { ThemeProvider } from "@mui/material/styles"
import { useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"
import styles from "./App.module.css"
import { getThemeCssVariables } from "@/common/theme"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)
  const themeCssVariables = useMemo(() => getThemeCssVariables(themeMode), [themeMode])

  useEffect(() => {
    Object.entries(themeCssVariables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, String(value))
    })

    return () => {
      Object.keys(themeCssVariables).forEach((name) => document.documentElement.style.removeProperty(name))
    }
  }, [themeCssVariables])

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app} style={themeCssVariables as CSSProperties}>
        <CssBaseline />
        <Header />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
          <Typography variant="h4">Todolist</Typography>
        </Box>
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
