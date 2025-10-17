import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  const { data } = useGetTodolistQuery(undefined)
 
  return (
    <>
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
