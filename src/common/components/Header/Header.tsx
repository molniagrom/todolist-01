import {
  changeThemeModeAC,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedInAC,
} from "@/app/app-slice.ts"
import { baseApi } from "@/app/baseApi"
import { NavButton } from "@/common/components/NavButton/NavButton"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Path } from "@/common/routing/Routing"
import { headerContainerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import MenuIcon from "@mui/icons-material/Menu"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Link from "@mui/material/Link"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"

const menuItems = [
  { label: "Вернуться на главную", path: Path.Main },
  { label: "Dashboard", path: Path.Dashboard },
  { label: "Projects", path: Path.Projects },
  { label: "Calendar", path: Path.Calendar },
  { label: "Profile", path: Path.Profile },
]

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)

  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
          closeMenu()
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="static" sx={{ mb: { xs: "16px", sm: "30px" } }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Container maxWidth={"lg"} sx={headerContainerSx}>
          <IconButton color="inherit" onClick={toggleMenu} sx={{ p: { xs: 1, sm: 1.5 } }}>
            <MenuIcon />
          </IconButton>
          <Modal open={isMenuOpen} onClose={closeMenu} closeAfterTransition>
            <Fade in={isMenuOpen} timeout={220}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  outline: "none",
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    minWidth: { xs: 240, sm: 320 },
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                    Навигация
                  </Typography>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      underline="hover"
                      color="text.primary"
                      variant="body1"
                      onClick={closeMenu}
                      sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isLoggedIn && (
                    <Link
                      component="button"
                      underline="hover"
                      color="error"
                      variant="body1"
                      onClick={logoutHandler}
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        mt: 1,
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        p: 0,
                      }}
                    >
                      Выйти
                    </Link>
                  )}
                </Paper>
              </Box>
            </Fade>
          </Modal>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {isLoggedIn && (
              <NavButton
                onClick={logoutHandler}
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: { xs: 1, sm: 2 },
                  display: { xs: "none", sm: "inline-flex" },
                }}
              >
                Sign out
              </NavButton>
            )}
            <NavButton
              onClick={() => navigate(Path.Faq)}
              background={theme.palette.primary.dark}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              Faq
            </NavButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LightModeIcon sx={{ color: themeMode === "light" ? "#FFD700" : "rgba(255,255,255,0.5)", fontSize: 20 }} />
              <Switch
                color={"default"}
                onChange={changeMode}
                checked={themeMode === "dark"}
              />
              <DarkModeIcon sx={{ color: themeMode === "dark" ? "#90CAF9" : "rgba(255,255,255,0.5)", fontSize: 20 }} />
            </Box>
          </Box>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}