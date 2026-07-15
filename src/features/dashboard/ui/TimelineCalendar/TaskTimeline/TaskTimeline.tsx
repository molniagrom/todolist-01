import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskPriority } from '@/common/enums/enums'
import styles from './TaskTimeline.module.css'

type Props = {
  tasks: DomainTask[]
  onToggleTask: (task: DomainTask) => void
}

const priorityColors: Record<number, string> = {
  [TaskPriority.Low]: '#4caf50',
  [TaskPriority.Middle]: '#ff9800',
  [TaskPriority.Hi]: '#f44336',
  [TaskPriority.Urgently]: '#9c27b0',
  [TaskPriority.Later]: '#2196f3',
}

const priorityLabels: Record<number, string> = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Middle]: 'Средний',
  [TaskPriority.Hi]: 'Высокий',
  [TaskPriority.Urgently]: 'Срочный',
  [TaskPriority.Later]: 'Позже',
}

export const TaskTimeline: FC<Props> = ({ tasks, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <Paper className={styles.emptyState}>
        <Typography color="text.secondary">
          Нет задач на этот день
        </Typography>
      </Paper>
    )
  }

  return (
    <Box className={styles.container}>
      {tasks.map((task) => {
        const time = task.startDate
          ? new Date(task.startDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
          : '--:--'

        return (
          <Paper key={task.id} className={styles.taskItem}>
            <Box className={styles.timeSection}>
              <Typography variant="body2" className={styles.time}>
                {time}
              </Typography>
            </Box>
            <Box
              className={styles.priorityDot}
              sx={{ bgcolor: priorityColors[task.priority] || priorityColors[TaskPriority.Low] }}
            />
            <Box className={styles.taskContent}>
              <Typography
                variant="body1"
                className={styles.taskTitle}
                sx={{ textDecoration: task.status === 2 ? 'line-through' : 'none' }}
              >
                {task.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {priorityLabels[task.priority] || 'Неизвестно'}
              </Typography>
            </Box>
            <Checkbox
              checked={task.status === 2}
              onChange={() => onToggleTask(task)}
              color="primary"
            />
          </Paper>
        )
      })}
    </Box>
  )
}