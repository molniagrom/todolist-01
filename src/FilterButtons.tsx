import {Box, Button} from "@mui/material";
import {BoxSx} from "@/components/Todolist.styles.ts";
import {FilterValues, TodolistType} from "@/app/App.tsx";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/model/theme/theme.ts";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";

type Props ={
    todolist: TodolistType,
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist
    const themeMode = useAppSelector(selectThemeMode)
    const myTheme = getTheme(themeMode)

    const dispatch = useAppDispatch();

    const changeTodolistFilterHandler = (nextFilter: FilterValues) => {
        dispatch(changeTodolistFilterAC({
            id: id, filter: nextFilter
        }))
    }

    return (
        <Box sx={BoxSx}>
            <Button
                sx={{backgroundColor: myTheme.palette.secondary.dark}}
                variant={filter === "all" ? "contained" : "outlined"}
                size={"small"}
                onClick={() => changeTodolistFilterHandler("all")}
            >Все</Button>
            <Button
                sx={{backgroundColor: myTheme.palette.secondary.dark}}
                variant={filter === "active" ? "contained" : "outlined"}
                size={"small"}
                onClick={() => changeTodolistFilterHandler("active")}
            >в работе</Button>
            <Button
                size={"small"}
                sx={{backgroundColor: myTheme.palette.secondary.dark}}
                variant={filter === "completed" ? "contained" : "outlined"}
                onClick={() => changeTodolistFilterHandler("completed")}
            >сделано</Button>
        </Box>
    );
};

export default FilterButtons;