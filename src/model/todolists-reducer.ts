import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFIlterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType =
    DeleteTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFIlterActionType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case "delete_todolist": {
            const {id} = action.payload
            return todolists.filter(t => t.id !== id)
        }
        case "create_todolist": {
            const {id, title} = action.payload
            return [
                ...todolists,
                {id, title, filter: "all"},
            ]
        }
        case "change_todolist": {
            const {id, title} = action.payload

            return todolists.map(tl => tl.id === id
                ? {...tl, title: title}
                : tl)
        }
        case "change_todolist_filter": {
            const {id, filter} = action.payload

            return todolists.map(tl => tl.id === id
                ? {...tl, filter: filter}
                : tl)
        }


        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: string) => ({
    type: "delete_todolist",
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (title: string) => ({
    type: "create_todolist",
    payload: {
        id: v1(),
        title: title
    }
} as const)

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => ({
    type: "change_todolist",
    payload: {
        id: payload.id,
        title: payload.title
    }
} as const)

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => ({
    type: "change_todolist_filter",
    payload: {
        id: payload.id,
        filter: payload.filter
    }
} as const)