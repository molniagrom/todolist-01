import {TasksState} from "../App.tsx";
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";
import {Task} from "../Todolist.tsx";
import {v1} from "uuid";

export type CreateTaskActionType = ReturnType<typeof createTaskAC>

type ActionType = DeleteTodolistActionType | CreateTodolistActionType | CreateTaskActionType

export const tasksReducer = (tasks: TasksState, action: ActionType) => {
    switch (action.type) {
        case "delete_todolist": {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.id]
            return copyTasks;
        }

        case "create_todolist": {
            return {...tasks, [action.payload.id]: []};
        }
            
        case "create_task": {
            return {
                ...tasks,
                [action.payload.id]: [
                    {id: v1(), title: action.payload.title, isDone: false},
                    ...tasks[action.payload.id]
                ],
            }
        }
            
        default:
            return tasks;
    }
}

// Сделай домашнее задание дописать tasksReducer

export const createTaskAC = (payload: {title: Task["title"], todolistId: string}) => ({
    type: "create_task",
    payload: {
        id: payload.todolistId,
        title: payload.title
    }
} as const)
