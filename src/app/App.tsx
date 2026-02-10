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
import { useEffect, useState } from "react"
import styles from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

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
      <div className={styles.app}>
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
