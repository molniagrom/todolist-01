import { useAddTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import type { DomainTodolist } from '@/features/todolists/lib/types'
import { TaskPriority } from '@/common/enums/enums'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { CreateTaskForm } from './CreateTaskForm/CreateTaskForm'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const createTask = async (title: string, priority: TaskPriority) => {
    const result = await addTask({ todolistId: todolist.id, title }).unwrap()
    const newTask = result.data.item

    // Update task with priority
    await updateTask({
      todolistId: todolist.id,
      taskId: newTask.id,
      model: {
        description: newTask.description,
        title: newTask.title,
        status: newTask.status,
        priority,
        startDate: newTask.startDate,
        deadline: newTask.deadline,
      },
    })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateTaskForm onCreateTask={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}