// import {Button} from "./Button.tsx";
import {FilterValues, TodolistType} from "./app/App.tsx";
import "./app/App.css"
import CreateItemForm from "./components/CreateItemForm.tsx";
import {EditableSpan} from "./components/EditableSpan.tsx";
import {Box, Button, IconButton} from "@mui/material";
import {Theme} from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {BoxSx, getListItemSx} from "./components/Todolist.styles.ts";


type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValues
    myTheme: Theme;
    tasks: Array<Task>
    deleteTodolist: (todolistId: string) => void
    deleteTask: (id: Task["id"], todolistId: string) => void
    changeTaskStatus: (id: Task["id"], newStatus: Task["isDone"], todolistId: string) => void
    createTask: (title: Task["title"], todolistId: string) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
    deleteAllTask: (todolistId: string) => void
    changeTaskTitle: (taskId: Task["id"], newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: TodolistType["title"], todolistId: string) => void
}

export type Task = {
    title: string
    isDone: boolean
    id: string
}

export const Todolist = ({
                             title,
                             deleteAllTask,
                             tasks,
                             deleteTask,
                             todolistId,
                             filter,
                             myTheme,
                             changeTodolistTitle,
                             changeTaskTitle,
                             deleteTodolist,
                             changeTodolistFilter,
                             changeTaskStatus,
                             createTask
                         }: TodolistPropsType) => {

    const tasksList = tasks.length === 0
        ? <span>Your tasksList is empty</span>
        : <List>
            {
                tasks.map((task: Task) => {

                    const changeTaskStatusHandler = (newTitle: string) => {
                        changeTaskTitle(task.id, newTitle, todolistId)
                    }

                    return <ListItem disablePadding sx={getListItemSx(task.isDone)} key={task.id}>
                        <Box sx={BoxSx}>
                            <Checkbox
                                size="small"
                                onChange={() =>
                                    changeTaskStatus(task.id, !task.isDone, todolistId)}
                                checked={task.isDone}/>

                            <EditableSpan
                                title={task.title}
                                changeItemTitle={changeTaskStatusHandler}
                            />
                            <IconButton
                                sx={{backgroundColor: myTheme.palette.secondary.dark}}
                                onClick={() => deleteTask(task.id, todolistId)}>
                                <DeleteOutlineIcon fontSize="small"/>
                            </IconButton>
                        </Box>
                    </ListItem>
                })
            }
        </List>

    const createTaskHandler = (taskTitle: string) => {
        createTask(taskTitle, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    return (
        <Box sx={{backgroundColor: myTheme.palette.primary.light}} className="todo">
            <h3>
                <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
                <IconButton
                    sx={{backgroundColor: myTheme.palette.secondary.dark}}
                    onClick={() => deleteTodolist(todolistId)}>
                    <DeleteOutlineIcon fontSize="medium"/>
                </IconButton>
            </h3>
            <CreateItemForm itemTitleLength={15} createItem={createTaskHandler}/>
            {tasksList}
            <Box sx={BoxSx}>
                <Button
                    sx={{backgroundColor: myTheme.palette.secondary.dark}}
                    variant={filter === "all" ? "contained" : "outlined"}
                    size={"small"}
                    onClick={() => changeTodolistFilter("all", todolistId)}
                >Все</Button>
                <Button
                    sx={{backgroundColor: myTheme.palette.secondary.dark}}
                    variant={filter === "active" ? "contained" : "outlined"}
                    size={"small"}
                    onClick={() => changeTodolistFilter("active", todolistId)}
                >в работе</Button>
                <Button
                    size={"small"}
                    sx={{backgroundColor: myTheme.palette.secondary.dark}}
                    variant={filter === "completed" ? "contained" : "outlined"}
                    onClick={() => changeTodolistFilter("completed", todolistId)}
                >сделано</Button>
            </Box>
            <div>
                <Button onClick={() => {
                    deleteAllTask(todolistId)
                }}>Delete all tasks
                </Button>
            </div>
        </Box>
    )
}







