import {TasksState} from "../App.tsx";
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";
import {Task} from "../Todolist.tsx";
import {v1} from "uuid";

export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type DeleteAllTaskActionType = ReturnType<typeof deleteAllTaskAC>

type ActionType =
    DeleteTodolistActionType
    | CreateTodolistActionType
    | CreateTaskActionType
    | DeleteTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | DeleteAllTaskActionType

export const tasksReducer = (tasks: TasksState, action: ActionType) => {
    switch (action.type) {
        case "delete_todolist": {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.id]
            return copyTasks;
        }

        case "create_todolist": {
            const {id} = action.payload;

            return {...tasks, [id]: []};
        }

        case "create_task": {

            const {id, title} = action.payload;

            return {
                ...tasks,
                [id]: [
                    {id: v1(), title: title, isDone: false},
                    ...tasks[id]
                ],
            }
        }
        case "delete_task": {
            const {id, taskId} = action.payload;

            return {
                ...tasks,
                [id]: tasks[id].filter(t => t.id !== taskId)
            }
        }

        case "change_task_status": {

            const {id, taskId, isDone} = action.payload;

            let upDateTasks: Task[] = tasks[id].map(t => t.id === taskId ? {...t, isDone: isDone} : t);

            return {
                ...tasks,
                [id]: upDateTasks
            }

        }
        case "change_task_title": {

            const {id, taskId, title} = action.payload;

            let upDateTasks: Task[] = tasks[id].map(t =>
                t.id === taskId ? {...t, title} : t);

            return {
                ...tasks,
                [id]: upDateTasks
            }

        }

        case "delete_all_task": {
            return {...tasks, [action.payload.id]: []}
        }


        default:
            return tasks;
    }
}

// Сделай домашнее задание дописать tasksReducer

export const createTaskAC = (payload: { title: Task["title"], todolistId: string }) => ({
    type: "create_task",
    payload: {
        id: payload.todolistId,
        title: payload.title
    }
} as const)


export const deleteTaskAC = (payload: { taskId: string, todolistId: string }) => ({
    type: "delete_task",
    payload: {
        id: payload.todolistId,
        taskId: payload.taskId
    }
} as const)

export const changeTaskStatusAC = (payload:
                                   {
                                       taskId: Task["id"],
                                       isDone: Task["isDone"],
                                       todolistId: string
                                   }) => ({
    type: "change_task_status",
    payload: {
        id: payload.todolistId,
        taskId: payload.taskId,
        isDone: payload.isDone
    }
} as const)

export const changeTaskTitleAC = (payload:
                                  {
                                      taskId: Task["id"],
                                      newTitle: Task["title"],
                                      todolistId: string
                                  }) => ({
    type: "change_task_title",
    payload: {
        id: payload.todolistId,
        taskId: payload.taskId,
        title: payload.newTitle
    }
} as const)

export const deleteAllTaskAC = (
    payload: { todolistId: string }) => ({
    type: "delete_all_task",
    payload: {
        id: payload.todolistId,
    }
} as const)

