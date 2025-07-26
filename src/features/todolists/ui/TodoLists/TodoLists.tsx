import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/TodoLists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolistst-selectors.ts";

export const TodoLists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
       <>
           {todolists.map(t => {

               return (
                   <Grid key={t.id}>
                       <Paper elevation={8}>
                           <TodolistItem todolist={t}/>
                       </Paper>
                   </Grid>

               )
           })}
       </>
    );
};

