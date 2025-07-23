import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Task, Todolist} from "@/Todolist.tsx";
import {useAppSelector} from "@/app/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolistst-selectors.ts";
import {getTheme} from "@/model/theme/theme.ts";
import {changeTaskStatusAC, createTaskAC, deleteAllTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {FilterValues} from "@/app/App.tsx";
import {changeTodolistFilterAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {useSelector} from "react-redux";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";

export const TodoLists = () => {
    const themeMode = useSelector(selectThemeMode)
    const todolists = useAppSelector(selectTodolists)
    const myTheme = getTheme(themeMode)

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

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    return (
       <>
           {todolists.map(t => {

               return (
                   <Grid key={t.id}>
                       <Paper elevation={8}>
                           <Todolist
                               todolist={t}
                               myTheme={myTheme}
                               todolistId={t.id}
                               filter={t.filter}
                               deleteTodolist={deleteTodolist}
                               changeTaskStatus={changeTaskStatus}
                               changeTodolistFilter={changeTodolistFilter}
                               createTask={createTask}
                               deleteTask={deleteTask}
                               deleteAllTask={deleteAllTask}
                               title={t.title}/>
                       </Paper>
                   </Grid>

               )
           })}
       </>
    );
};

