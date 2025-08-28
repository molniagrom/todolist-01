import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import { useAppDispatch } from "@/common/hooks"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  task: DomainTask
  todolistId: string
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        todolistId,
        taskId: task.id,
        domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox disabled={todolist.entityStatus === "loading"} checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan disabled={todolist.entityStatus === "loading"} value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton disabled={todolist.entityStatus === "loading"} onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
