import {createTheme} from "@mui/material";
import {green, lightBlue} from "@mui/material/colors";
import {ThemeMode} from "@/app/app-reducer.ts";

export const getTheme = (themeMode: ThemeMode) =>
    createTheme({
    palette: {
        primary: {
            main: lightBlue[800],
            light: lightBlue[300],
            dark: lightBlue[900],
            contrastText: '#fff',
        },
        secondary: green,
        mode: themeMode,
    },
})