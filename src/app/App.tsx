import './App.css'
import {Task, Todolist} from "../Todolist.tsx";
import {useState} from "react";
import CreateItemForm from "../components/CreateItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    Switch,
    ThemeProvider,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {NavButton} from "../components/NavButton.ts";
import {green, lightBlue} from "@mui/material/colors";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC, deleteAllTaskAC,
    deleteTaskAC,
} from "../model/tasks-reducer.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import { selectTasks } from '../model/tasks-selectors.ts';
import {selectTodolists} from "../model/todolistst-selectors.ts";

type ThemeMode = 'dark' | 'light'

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

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const myTheme = createTheme({
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

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch();

    const deleteTask = (taskId: Task["id"], todolistId: string) => {
        const action = deleteTaskAC({taskId, todolistId})
        dispatch(action)
    }

    const createTask = (taskName: Task["title"], todolistId: string) => {
        const action = createTaskAC({title: taskName, todolistId: todolistId})
        dispatch(action)
    }

    const changeTaskStatus = (
        taskId: Task["id"],
        newStatus: Task["isDone"],
        todolistId: string) => {

        dispatch(changeTaskStatusAC({taskId, isDone: newStatus, todolistId}))
    }

    const changeTaskTitle = (
        taskId: Task["id"],
        newTitle: Task["title"],
        todolistId: string) => {

        const action = changeTaskTitleAC({
            taskId, title: newTitle, todolistId
        })
        dispatch(action)
    }


    function deleteAllTask(todolistId: string) {
        dispatch(deleteAllTaskAC({todolistId}))
    }


    const changeTodolistFilter = (
        nextFilter: FilterValues, todolistId: string) => {
        const action = changeTodolistFilterAC({
            id: todolistId, filter: nextFilter
        })
        dispatch(action)
    }

    const changeTodolistTitle = (
        newTitle: TodolistType["title"], todolistId: string) => {
        dispatch(changeTodolistTitleAC({
            id: todolistId, title: newTitle
        }))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const createTodolist = (todolistTitle: string) => {
        dispatch(createTodolistAC(todolistTitle))
    }

    const todolistComponents = todolists.map(t => {

        let filteredTasks = tasks[t.id]
        if (t.filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }

        if (t.filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }

        return (
            <Grid key={t.id}>
                <Paper elevation={8}>
                    <Todolist
                        myTheme={myTheme}
                        todolistId={t.id}
                        changeTodolistTitle={changeTodolistTitle}
                        filter={t.filter}
                        deleteTodolist={deleteTodolist}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        createTask={createTask}
                        deleteTask={deleteTask}
                        deleteAllTask={deleteAllTask}
                        tasks={filteredTasks}
                        changeTaskTitle={changeTaskTitle}
                        title={t.title}/>
                </Paper>
            </Grid>

        )
    })


    return (
        <div className="app">
            <ThemeProvider theme={myTheme}>
                <CssBaseline/>
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
                <Container maxWidth={"lg"}>
                    <Grid container sx={{padding: "15px 0"}}>
                        <CreateItemForm itemTitleLength={10} createItem={createTodolist}/>
                    </Grid>
                    <Grid spacing={3} container>
                        {todolistComponents}
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    )
}

export default App

// function selectTodoliststs(state: { tasks: TasksState; todolists: TodolistType[]; }): unknown {
//     throw new Error('Function not implemented.');
// }

