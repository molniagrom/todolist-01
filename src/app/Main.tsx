import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import CreateItemForm from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {TodoLists} from "@/features/todolists/ui/TodoLists/TodoLists.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";

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

