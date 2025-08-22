import { nanoid } from "@reduxjs/toolkit"
import { beforeEach, expect, test } from "vitest"
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  DomainTodolist,
  todolistsReducer
} from "../todolists-slice"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "all" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "all" }
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: todolistId1 }, "requestId", todolistId1)
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  const newTodolist = {
    id: todolistId1,
    title,
    addedDate: "",
    order: 0
  }
  const endState = todolistsReducer(
    startState,
    createTodolistTC.fulfilled({ todolist: newTodolist }, "requestId", todolistId1)
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)

})

test("correct todolist should change its title", () => {
  const newTitle = "New title"
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todolistId1, title: newTitle }, "requestId", { id: todolistId1, title: newTitle })
  )

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTitle);
  expect(endState[1].title).toBe("What to buy");
})

test("correct todolist should change its filter", () => {
  const filter = "completed";
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ id: todolistId2, filter })
  );

  expect(endState.length).toBe(2); // Проверяем, что длина массива не изменилась
  expect(endState[0].filter).toBe("all"); // Проверяем, что фильтр первого тудулиста не изменился
  expect(endState[1].filter).toBe("completed"); // Проверяем, что фильтр второго тудулиста изменился
});
