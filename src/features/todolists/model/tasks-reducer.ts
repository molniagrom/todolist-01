import type {TasksState} from '../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>("tasks/deleteTask")
export const createTaskAC = createAction< { todolistId: string, title: string }>("tasks/createTask")
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>("tasks/changeTaskStatus")
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>("tasks/changeTaskTitle")
export const deleteAllTaskAC = createAction<{ todolistId: string }>("tasks/deleteAllTask")

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(task => task.id === action.payload.taskId);
            if (index > -1) tasks.splice(index, 1);
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({title: action.payload.title, isDone: false, id: nanoid()})
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if ((index !== -1)) tasks[index].title = action.payload.title
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(deleteAllTaskAC, (state, action) => {
           state[action.payload.todolistId] = []
        })
})


