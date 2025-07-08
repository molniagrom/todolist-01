import {TasksState} from "../App.tsx";
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";

type ActionType = DeleteTodolistActionType | CreateTodolistActionType

export const tasksReducer = (tasks: TasksState, action: ActionType) => {
    switch (action.type) {
        case "delete_todolist": {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.id]
            return copyTasks;
        }

        case "create_todolist":
            return {...tasks, [action.payload.id]: []};
        default:
            return tasks;
    }
}

