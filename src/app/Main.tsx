import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import CreateItemForm from "@/components/CreateItemForm.tsx";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/app/common/hooks/useAppDispatch.ts";
import {TodoLists} from "@/TodoLists.tsx";

export const Main = () => {

    const dispatch = useAppDispatch();

    const createTodolist = (todolistTitle: string) => {
        dispatch(createTodolistAC(todolistTitle))
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container sx={{padding: "15px 0"}}>
                <CreateItemForm itemTitleLength={10} createItem={createTodolist}/>
            </Grid>
            <Grid spacing={3} container>
                <TodoLists/>
            </Grid>
        </Container>
    )
        ;
};

