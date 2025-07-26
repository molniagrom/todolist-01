import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {Todolist} from "@/app/App.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { getTheme } from "../../../../model/theme/theme.ts";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";

type Props = {
    todolist: Todolist,
}

export const TodolistTitle = (
    {todolist: {title, id}}: Props) => {

    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode)
    const myTheme = getTheme(themeMode)


    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({
            id: id, title: newTitle
        }))
    }

    return (
        <h3>
            <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
            <IconButton
                sx={{backgroundColor: myTheme.palette.secondary.dark}}
                onClick={deleteTodolistHandler}>
                <DeleteOutlineIcon fontSize="medium"/>
            </IconButton>
        </h3>
    );
};

