import { useState } from 'react'
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import type { DomainTodolist } from "@/features/todolists/lib/types"
import { createTaskModel } from "@/features/todolists/lib/utils"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [isExpanded, setIsExpanded] = useState(false)

  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1, minWidth: 0 }}>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <Box
          onClick={toggleExpand}
          sx={{
            flex: 1,
            minWidth: 0,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            maxHeight: isExpanded ? 'none' : '40px',
            transition: 'max-height 0.3s ease',
          }}
        >
          <Box
            sx={{
              overflow: isExpanded ? 'visible' : 'hidden',
              textOverflow: isExpanded ? 'clip' : 'ellipsis',
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              pr: !isExpanded && task.title.length > 30 ? 4 : 0,
            }}
          >
            <EditableSpan value={task.title} onChange={changeTaskTitle} />
          </Box>
          {!isExpanded && task.title.length > 30 && (
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '60px',
                background: 'linear-gradient(to right, transparent, var(--mui-palette-background-paper))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                pr: 1,
                pointerEvents: 'none',
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '12px',
                  color: 'text.secondary',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                }}
              >
                ещё...
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}