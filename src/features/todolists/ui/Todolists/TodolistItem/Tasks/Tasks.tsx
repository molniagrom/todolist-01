import { TaskStatus } from "@/common/enums"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  
  const { data: tasks, isLoading, error } = useGetTasksQuery(id)

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks.</div>;
  
  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks?.filter(task => task.status === TaskStatus.New)
  }
  if (filter === 'completed') {
    filteredTasks = tasks?.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
      )}
    </>
  )
}
