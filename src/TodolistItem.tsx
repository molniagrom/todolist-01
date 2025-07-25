import {TodolistType} from "./app/App.tsx";
import "./app/App.css"
import CreateItemForm from "./components/CreateItemForm.tsx";
import {Box, Button} from "@mui/material";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";
import {createTaskAC, deleteAllTaskAC} from "@/model/tasks-reducer.ts";
import {getTheme} from "@/model/theme/theme.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import FilterButtons from "@/FilterButtons.tsx";


type TodolistPropsType = {
    todolist: TodolistType,
}

export type Task = {
    title: string
    isDone: boolean
    id: string
}

export const TodolistItem = ({todolist}: TodolistPropsType) => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch();


    const myTheme = getTheme(themeMode)

    const createTaskHandler = (taskTitle: string) => {
        dispatch(createTaskAC({title: taskTitle, todolistId: todolist.id}))
    }

    const deleteAllTask = () => {
        dispatch(deleteAllTaskAC({todolistId: todolist.id}))
    }

    return (
        <Box sx={{backgroundColor: myTheme.palette.primary.light}} className="todo">
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm itemTitleLength={15} createItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
            <div>
                <Button onClick={deleteAllTask}>Delete all tasks</Button>
            </div>
        </Box>
    )
}







