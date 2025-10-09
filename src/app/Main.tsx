import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { Path } from "@/common/routing"
import { selectIsLoggedIn } from "@/features/auth/model/authSlice.ts"
import { Navigate } from "react-router"

export const Main = () => {
  const dispatch = useAppDispatch()
  const IsLoggedIn = useAppSelector(selectIsLoggedIn)

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  if (!IsLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container  maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid style={{gap: "25px"}} container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
