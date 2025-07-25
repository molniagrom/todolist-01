import {EditableSpan} from "@/components/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/model/theme/theme.ts";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {TodolistType} from "@/app/App.tsx";

type Props = {
    todolist: TodolistType,
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

