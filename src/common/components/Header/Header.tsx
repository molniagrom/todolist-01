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
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import MenuIcon from "@mui/icons-material/Menu"
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
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Modal open={isMenuOpen} onClose={closeMenu} closeAfterTransition>
            <Fade in={isMenuOpen} timeout={220}>
              <Box
                sx={{
                  position: "absolute",
                  top: "88px",
                  left: { xs: 16, sm: "calc(50% - 480px)" },
                  outline: "none",
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    minWidth: { xs: 240, sm: 280 },
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Typography variant="h6">Навигация</Typography>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      underline="hover"
                      color="text.primary"
                      variant="body1"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Paper>
              </Box>
            </Fade>
          </Modal>
          <div>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton onClick={() => navigate(Path.Main)} background={theme.palette.primary.dark}>
              Todolist
            </NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
