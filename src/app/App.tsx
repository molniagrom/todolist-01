import './App.css'
import {Task} from "../TodolistItem.tsx";
import {CssBaseline, ThemeProvider} from '@mui/material';
import {selectThemeMode} from "./app-selectors.ts";
import {useSelector} from "react-redux";
import {getTheme} from "../model/theme/theme.ts";
import {Header} from "@/Header.tsx";
import {Main} from "@/app/Main.tsx";

export type FilterValues = "all" | "active" | "completed";

export type TasksState = {
    [todolistId: string]: Task[]
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValues,
}

function App() {

    const themeMode = useSelector(selectThemeMode)
    const myTheme = getTheme(themeMode)

    return (
        <div className="app">
            <ThemeProvider theme={myTheme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    )
}

export default App

