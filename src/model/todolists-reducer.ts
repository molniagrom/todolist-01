import {FilterValues, TodolistType} from "../app/App.tsx";
import {v1} from "uuid";
import {createAction} from "@reduxjs/toolkit";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFIlterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType =
    DeleteTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFIlterActionType

export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>("todolists/changeTodolistTitle")
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>("todolists/changeTodolistFilter")
export const createTodolistAC = createAction("todolists/changeTodolistFilter", (title: string) => {
    return {
        payload: {
            id: v1(),
            title: title
        }
    }
})

export const createTodolistAC2 = (title: string) => ({
    type: "create_todolist",
    payload: {
        id: v1(),
        title: title
    }
} as const)

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


