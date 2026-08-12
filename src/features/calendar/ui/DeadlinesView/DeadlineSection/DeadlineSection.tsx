import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { priorityColors, priorityLabels } from '@/features/dashboard/lib/constants'
import { TaskPriority } from '@/common/enums/enums'
import styles from './DeadlineSection.module.css'

type Props = {
  title: string
  tasks: DomainTask[]
  color: string
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

export const DeadlineSection: FC<Props> = ({ title, tasks, color, onToggleTask, onDeleteTask, onEditTask }) => {
  const [expanded, setExpanded] = useState(true)

  if (tasks.length === 0) return null

  return (
    <Box className={styles.section}>
      <Box onClick={() => setExpanded((prev) => !prev)} className={styles.sectionHeader}>
        <Box className={styles.sectionDot} sx={{ bgcolor: color }} />
        <Typography variant="subtitle2" className={styles.sectionTitle}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ({tasks.length})
        </Typography>
        <Box className={styles.spacer} />
        {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </Box>

      <Collapse in={expanded}>
        <Box className={styles.taskList}>
          {tasks.map((task) => (
            <Paper
              key={task.id}
              className={styles.taskPaper}
              elevation={0}
              variant="outlined"
            >
              <Box
                className={styles.priorityDot}
                sx={{ bgcolor: priorityColors[task.priority as TaskPriority] || priorityColors[TaskPriority.Low] }}
              />
              <Typography variant="body2" className={styles.taskTitle}>
                {task.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {priorityLabels[task.priority as TaskPriority] || ''}
              </Typography>
              <Checkbox
                checked={task.status === 2}
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
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}
