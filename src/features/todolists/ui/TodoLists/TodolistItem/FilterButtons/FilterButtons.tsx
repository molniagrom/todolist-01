import {Box, Button} from "@mui/material";
import {FilterValues, Todolist} from "@/app/App.tsx";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/features/todolists/model/theme/theme.ts";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer.ts";
import {BoxSx} from "@/common/styles/Container.styles.ts";

type Props ={
    todolist: Todolist,
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