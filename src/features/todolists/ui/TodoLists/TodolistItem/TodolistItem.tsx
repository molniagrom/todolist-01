import {Todolist} from "@/app/App.tsx";
import "../../../../../app/App.module.css"
import CreateItemForm from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {Box, Button} from "@mui/material";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import FilterButtons from "./FilterButtons/FilterButtons.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/features/todolists/model/theme/theme.ts";
import {createTaskAC, deleteAllTaskAC} from "../../../model/tasks-reducer.ts";
import s from "./TodolistItem.module.css"

type TodolistPropsType = {
    todolist: Todolist,
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
        <Box sx={{backgroundColor: myTheme.palette.primary.light}} className={s.todo}>
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







