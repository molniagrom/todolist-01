import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { priorityColors, priorityLabels } from '@/features/dashboard/lib/constants'
import { TaskPriority } from '@/common/enums/enums'
import { isToday } from '@/features/dashboard/lib/utils/dateUtils'
import styles from './AgendaDay.module.css'

type DayData = {
  dateString: string
  dayName: string
  tasks: DomainTask[]
}

type Props = {
  day: DayData
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

export const AgendaDay: FC<Props> = ({ day, onToggleTask, onDeleteTask, onEditTask }) => {
  if (day.tasks.length === 0) return null

  const today = isToday(day.dateString)

  return (
    <Box className={styles.daySection}>
      <Typography variant="subtitle2" className={`${styles.dayTitle} ${today ? styles.today : ''}`}>
        {day.dayName}
      </Typography>

      <Box className={styles.taskList}>
        {day.tasks.map((task) => {
          const isDone = task.status === 2
          return (
            <Paper
              key={task.id}
              className={`${styles.taskPaper} ${isDone ? styles.done : ''}`}
              elevation={0}
              variant="outlined"
            >
              <Box
                className={styles.priorityDot}
                sx={{ bgcolor: priorityColors[task.priority as TaskPriority] || priorityColors[TaskPriority.Low] }}
              />
              <Typography variant="body2" className={`${styles.taskTitle} ${isDone ? styles.done : ''}`}>
                {task.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {priorityLabels[task.priority as TaskPriority] || ''}
              </Typography>
              <Checkbox
                checked={isDone}
                onChange={() => onToggleTask(task)}
                size="small"
                className={styles.checkbox}
              />
              <IconButton size="small" onClick={() => onEditTask(task)} color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onDeleteTask(task)} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          )
        })}
      </Box>
    </Box>
  )
}
