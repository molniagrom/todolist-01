import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "@/features/todolists/api/tasksApi"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTaskMutation] = useDeleteTaskMutation()

  const _createTaskModel = (patch: Partial<UpdateTaskModel>): UpdateTaskModel => ({
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...patch,
  })

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: _createTaskModel({ status })
    })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ taskId: task.id, todolistId: todolist.id, model: _createTaskModel({ title }) })
  }

  const onDeleteTaskClick = () => {
    deleteTaskMutation({ todolistId: todolist.id, taskId: task.id })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <IconButton onClick={onDeleteTaskClick} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
