import ListItem from "@mui/material/ListItem";
import {BoxSx, getListItemSx} from "@/components/Todolist.styles.ts";
import {Box, IconButton} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/components/EditableSpan.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/model/theme/theme.ts";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {Task} from "@/TodolistItem.tsx";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const themeMode = useAppSelector(selectThemeMode)
    const myTheme = getTheme(themeMode)
    const dispatch = useAppDispatch();

    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC({
            taskId: task.id, title: newTitle, todolistId
        }))
    }

    const changeTaskStatusHandler = () => {
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: !task.isDone, todolistId}))
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({taskId: task.id, todolistId}))
    }


    return (
        <ListItem disablePadding sx={getListItemSx(task.isDone)}>
            <Box sx={BoxSx}>
                <Checkbox
                    size="small"
                    onChange={changeTaskStatusHandler}
                    checked={task.isDone}/>

                <EditableSpan
                    title={task.title}
                    changeItemTitle={changeTaskTitleHandler}
                />
                <IconButton
                    sx={{backgroundColor: myTheme.palette.secondary.dark}}
                    onClick={deleteTaskHandler}>
                    <DeleteOutlineIcon fontSize="small"/>
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default TaskItem;