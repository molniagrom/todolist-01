import {AppBar, Box, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {getTheme} from "@/features/todolists/model/theme/theme.ts";


export const Header = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC(
            {themeMode: themeMode === 'light' ? 'dark' : 'light'}
        ))
    }

    const myTheme = getTheme(themeMode)

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <Switch onChange={changeMode}/>
                        <NavButton background={myTheme.palette.primary.dark}>Sign in</NavButton>
                        <NavButton background={myTheme.palette.primary.dark}>Sign out</NavButton>
                        <NavButton background={myTheme.palette.primary.light}>FAQ</NavButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}