import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskPriority } from '@/common/enums/enums'
import { priorityColors, priorityLabels } from '@/features/dashboard/lib/constants'
import styles from './TaskRow.module.css'

type Props = {
  task: DomainTask
  showTime: boolean
  onToggle: (task: DomainTask) => void
  onDelete: (task: DomainTask) => void
  onEdit: (task: DomainTask) => void
}

export const TaskRow: FC<Props> = ({ task, showTime, onToggle, onDelete, onEdit }) => {
  const time = showTime && task.startDate
    ? new Date(task.startDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    : '--'

  return (
    <Paper className={styles.taskItem}>
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
      <Box className={styles.actions}>
        <Checkbox
          checked={task.status === 2}
          onChange={() => onToggle(task)}
          color="primary"
          size="small"
        />
        <IconButton size="small" onClick={() => onEdit(task)} color="primary">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(task)} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  )
}