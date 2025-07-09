import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import CreateItemForm from "./components/CreateItemForm.tsx";
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
import {NavButton} from "./components/NavButton.ts";
import {green, lightBlue} from "@mui/material/colors";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC, deleteAllTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";


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

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    // const [todolists, setTodolist] = useState<TodolistType[]>([
    //     {title: " What to learn", filter: "all", id: todolistId_1,},
    //     {title: " What to buy", filter: "all", id: todolistId_2,},
    // ])
    const [isLight, setIsLight] = useState<boolean>(true)

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {title: " What to learn", filter: "all", id: todolistId_1,},
        {title: " What to buy", filter: "all", id: todolistId_2,},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Cheeps", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ]
    })

    // const [tasks, setTasks] = useState<TasksState>({
    //         [todolistId_1]: [
    //             {id: v1(), title: "HTML", isDone: true},
    //             {id: v1(), title: "CSS", isDone: true},
    //             {id: v1(), title: "JS/TS", isDone: false}
    //         ],
    //         [todolistId_2]: [
    //             {id: v1(), title: "Meat", isDone: true},
    //             {id: v1(), title: "Cheeps", isDone: true},
    //             {id: v1(), title: "Beer", isDone: false}
    //         ]
    //     }
    // )

    const deleteTask = (taskId: Task["id"], todolistId: string) => {
       const action = deleteTaskAC({taskId, todolistId})
        dispatchToTasks(action)
    }

    const createTask = (taskName: Task["title"], todolistId: string) => {
        const action = createTaskAC({title: taskName, todolistId: todolistId})
        dispatchToTasks(action)
    }

    const changeTaskStatus = (
        taskId: Task["id"],
        newStatus: Task["isDone"],
        todolistId: string) => {

      const action = changeTaskStatusAC({taskId, isDone: newStatus, todolistId})
        dispatchToTasks(action)
    }

    const changeTaskTitle = (
        taskId: Task["id"],
        newTitle: Task["title"],
        todolistId: string) => {

       const action = changeTaskTitleAC({
           taskId, newTitle, todolistId
       })
        dispatchToTasks(action)
    }




    function deleteAllTask(todolistId: string) {
        const action = deleteAllTaskAC({todolistId})
        dispatchToTasks(action)
    }



    const changeTodolistFilter = (
        nextFilter: FilterValues, todolistId: string) => {
        const action = changeTodolistFilterAC({
            id: todolistId, filter: nextFilter
        })
        dispatchToTodolists(action)
    }

    const changeTodolistTitle = (
        newTitle: TodolistType["title"], todolistId: string) => {
        const action = changeTodolistTitleAC({
            id: todolistId, title: newTitle
        })
        dispatchToTodolists(action)
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        delete tasks[todolistId]
    }

    const createTodolist = (todolistTitle: string) => {
        const action = createTodolistAC(todolistTitle)
        dispatchToTodolists(action)
    }

    const myTheme = createTheme({
        palette: {
            primary: {
                main: lightBlue[800],
                light: lightBlue[300],
                dark: lightBlue[900],
                contrastText: '#fff',
            },
            secondary: green,
            mode: isLight ? 'light' : 'dark'
        },
    })

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
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <Switch onChange={() => setIsLight(!isLight)}/>
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
