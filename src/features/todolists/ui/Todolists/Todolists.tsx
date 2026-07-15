import { containerSx } from "@/common/styles"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import Box from "@mui/material/Box"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <Box sx={containerSx}>
      {todolists?.map((todolist) => (
        <Paper key={todolist.id} sx={{ p: "0 20px 20px 20px", overflow: "hidden", maxWidth: "400px", width: "100%", wordBreak: "break-word" }}>
          <TodolistItem todolist={todolist} />
        </Paper>
      ))}
    </Box>
  )
}