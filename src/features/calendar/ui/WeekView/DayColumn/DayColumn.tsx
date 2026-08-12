import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { priorityColors } from '@/features/dashboard/lib/constants'
import { TaskPriority } from '@/common/enums/enums'
import styles from './DayColumn.module.css'

type DayData = {
  dateString: string
  dayName: string
  dayNumber: number
  isToday: boolean
  tasks: DomainTask[]
}

type Props = {
  day: DayData
  isSelected: boolean
  onSelect: () => void
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

export const DayColumn: FC<Props> = ({ day, isSelected, onSelect, onToggleTask, onDeleteTask, onEditTask }) => {
  const headerClass = `${styles.dayHeader} ${isSelected ? styles.selected : day.isToday ? styles.today : ''}`

  return (
    <Box className={styles.column}>
      <Box onClick={onSelect} className={headerClass}>
        <Typography variant="caption" className={`${styles.dayName} ${isSelected ? styles.selected : ''}`}>
          {day.dayName}
        </Typography>
        <Typography variant="h6" className={`${styles.dayNumber} ${isSelected ? styles.selected : ''}`}>
          {day.dayNumber}
        </Typography>
      </Box>

      <Box className={styles.taskList}>
        {day.tasks.length === 0 ? (
          <Typography variant="caption" className={styles.emptyText}>
            Нет задач
          </Typography>
        ) : (
          day.tasks.map((task) => {
            const isDone = task.status === 2
            return (
              <Paper
                key={task.id}
                className={`${styles.taskPaper} ${isDone ? styles.done : ''}`}
                elevation={0}
                variant="outlined"
              >
                <Box className={styles.taskContent}>
                  <Box
                    className={styles.priorityDot}
                    sx={{ bgcolor: priorityColors[task.priority as TaskPriority] || priorityColors[TaskPriority.Low] }}
                  />
                  <Typography
                    variant="caption"
                    className={`${styles.taskTitle} ${isDone ? styles.done : ''}`}
                  >
                    {task.title}
                  </Typography>
                </Box>

                <Box className={styles.actions}>
                  <Checkbox
                    checked={isDone}
                    onChange={() => onToggleTask(task)}
                    size="small"
                    className={styles.checkbox}
                  />
                  <IconButton size="small" onClick={() => onEditTask(task)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDeleteTask(task)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Paper>
            )
          })
        )}
      </Box>
    </Box>
  )
}
