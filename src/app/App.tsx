import s from './App.module.css'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {selectThemeMode} from "./app-selectors.ts";
import {useSelector} from "react-redux";
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";
import { getTheme } from '@/features/todolists/model/theme/theme.ts';

export type FilterValues = "all" | "active" | "completed";

export type TasksState = Record<string, Task[]>

export type Todolist = {
    id: string,
    title: string,
    filter: FilterValues,
}

export type Task = {
    title: string
    isDone: boolean
    id: string
}

function App() {

    const themeMode = useSelector(selectThemeMode)
    const myTheme = getTheme(themeMode)

    return (
        <div className={s.app}>
            <ThemeProvider theme={myTheme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    )
}

export default App

