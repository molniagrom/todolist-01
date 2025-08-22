import { useAppDispatch, useAppSelector } from "@/common/hooks"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { changeTaskStatusTC, createTaskTC, selectTasks } from "@/features/todolists/model/tasks-slice"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { TaskStatus } from "@/common/enums"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }

  const allTaskCompletedHandler = () => {
    const newTasks = tasks[todolist.id].filter((task) => {
      return task.status === TaskStatus.New
    })
    newTasks.forEach((task) => {
      dispatch(changeTaskStatusTC({ ...task, status: TaskStatus.Completed }))
    })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
      <button onClick={allTaskCompletedHandler}>all task completed</button>
    </div>
  )
}
