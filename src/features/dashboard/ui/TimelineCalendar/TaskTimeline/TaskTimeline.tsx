import { FC, useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskPriority } from '@/common/enums/enums'
import { isScheduledTask } from '@/features/dashboard/lib/utils/taskUtils'
import { AddTaskForm } from './AddTaskForm/AddTaskForm'
import styles from './TaskTimeline.module.css'

type Props = {
  tasks: DomainTask[]
  selectedDate: string
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onUpdateTask: (task: DomainTask, updates: Partial<DomainTask>) => void
  onTaskAdded: (task: DomainTask) => void
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

export const TaskTimeline: FC<Props> = ({
  tasks,
  selectedDate,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  onTaskAdded,
}) => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<DomainTask | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editPriority, setEditPriority] = useState<TaskPriority>(TaskPriority.Low)

  const scheduledTasks = useMemo(
    () => tasks.filter((t) => isScheduledTask(t)),
    [tasks]
  )

  const generalTasks = useMemo(
    () => tasks.filter((t) => !isScheduledTask(t)),
    [tasks]
  )

  const handleStartEdit = (task: DomainTask) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditPriority(task.priority)
  }

  const handleSaveEdit = () => {
    if (editingTask && editTitle.trim()) {
      onUpdateTask(editingTask, {
        title: editTitle.trim(),
        priority: editPriority,
      })
      setEditingTask(null)
      setEditTitle('')
      setEditPriority(TaskPriority.Low)
    }
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setEditTitle('')
    setEditPriority(TaskPriority.Low)
  }

  if (tasks.length === 0) {
    return (
      <>
        <Paper className={styles.emptyState}>
          <Typography color="text.secondary">
            Нет задач на этот день
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddFormOpen(true)}
            sx={{ mt: 2 }}
          >
            Добавить задачу
          </Button>
        </Paper>
        <AddTaskForm
          open={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          selectedDate={selectedDate}
          onTaskAdded={onTaskAdded}
        />
      </>
    )
  }

  return (
    <Box className={styles.container}>
      {/* Scheduled tasks with time */}
      {scheduledTasks.map((task) => {
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
            <Box className={styles.actions}>
              <Checkbox
                checked={task.status === 2}
                onChange={() => onToggleTask(task)}
                color="primary"
                size="small"
              />
              <IconButton
                size="small"
                onClick={() => handleStartEdit(task)}
                color="primary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDeleteTask(task)}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        )
      })}

      {/* General tasks without time */}
      {generalTasks.length > 0 && (
        <>
          {scheduledTasks.length > 0 && <Divider sx={{ my: 2 }} />}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Без времени
          </Typography>
          {generalTasks.map((task) => (
            <Paper key={task.id} className={styles.taskItem}>
              <Box className={styles.timeSection}>
                <Typography variant="body2" className={styles.time} color="text.secondary">
                  --
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
                  onChange={() => onToggleTask(task)}
                  color="primary"
                  size="small"
                />
                <IconButton
                  size="small"
                  onClick={() => handleStartEdit(task)}
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDeleteTask(task)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setIsAddFormOpen(true)}
        fullWidth
        sx={{ mt: 2 }}
      >
        Добавить задачу
      </Button>
      <AddTaskForm
        open={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        selectedDate={selectedDate}
        onTaskAdded={onTaskAdded}
      />

      {/* Edit Dialog */}
      <Dialog open={!!editingTask} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Редактировать задачу</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Название задачи"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel>Приоритет</InputLabel>
              <Select
                value={editPriority}
                label="Приоритет"
                onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
              >
                <MenuItem value={TaskPriority.Low}>Низкий</MenuItem>
                <MenuItem value={TaskPriority.Middle}>Средний</MenuItem>
                <MenuItem value={TaskPriority.Hi}>Высокий</MenuItem>
                <MenuItem value={TaskPriority.Urgently}>Срочный</MenuItem>
                <MenuItem value={TaskPriority.Later}>Позже</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Отмена</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}