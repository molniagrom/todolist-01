import { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import InputAdornment from '@mui/material/InputAdornment'
import { useGetTodolistsQuery, useAddTodolistMutation } from '@/features/todolists/api/todolistsApi'
import { useAddTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import { TaskPriority } from '@/common/enums/enums'
import styles from './AddTaskForm.module.css'

type Props = {
  open: boolean
  onClose: () => void
  selectedDate: string
  onTaskAdded?: () => void
}

const priorityLabels: Record<number, string> = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Middle]: 'Средний',
  [TaskPriority.Hi]: 'Высокий',
  [TaskPriority.Urgently]: 'Срочный',
  [TaskPriority.Later]: 'Позже',
}

export const AddTaskForm: FC<Props> = ({ open, onClose, selectedDate, onTaskAdded }) => {
  const [title, setTitle] = useState('')
  const [todolistId, setTodolistId] = useState('')
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Low)
  const [time, setTime] = useState('09:00')
  const [hasTime, setHasTime] = useState(true)
  const [error, setError] = useState('')
  const [isCreatingTodolist, setIsCreatingTodolist] = useState(false)
  const [newTodolistName, setNewTodolistName] = useState('')

  const { data: todolists } = useGetTodolistsQuery()
  const [addTodolist] = useAddTodolistMutation()
  const [addTask] = useAddTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const handleCreateTodolist = async () => {
    if (!newTodolistName.trim()) {
      setError('Введите название списка')
      return
    }

    try {
      const result = await addTodolist(newTodolistName.trim()).unwrap()
      const newTodolistId = result.data.item.id
      setTodolistId(newTodolistId)
      setNewTodolistName('')
      setIsCreatingTodolist(false)
      setError('')
    } catch {
      setError('Ошибка при создании списка')
    }
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Введите название задачи')
      return
    }
    if (!todolistId) {
      setError('Выберите список задач')
      return
    }

    try {
      // 1. Create task
      const result = await addTask({ todolistId, title: title.trim() }).unwrap()
      const newTask = result.data.item

      // 2. Update task with startDate and priority (if time is enabled)
      if (hasTime) {
        const startDate = `${selectedDate}T${time}:00.000Z`
        await updateTask({
          todolistId,
          taskId: newTask.id,
          model: {
            description: newTask.description,
            title: newTask.title,
            status: newTask.status,
            priority,
            startDate,
            deadline: newTask.deadline,
          },
        }).unwrap()
      } else {
        // Update priority even without time
        await updateTask({
          todolistId,
          taskId: newTask.id,
          model: {
            description: newTask.description,
            title: newTask.title,
            status: newTask.status,
            priority,
            startDate: newTask.startDate,
            deadline: newTask.deadline,
          },
        }).unwrap()
      }

      // Reset form
      setTitle('')
      setTodolistId('')
      setPriority(TaskPriority.Low)
      setTime('09:00')
      setHasTime(true)
      setError('')
      setIsCreatingTodolist(false)
      setNewTodolistName('')
      onTaskAdded?.()
      onClose()
    } catch {
      setError('Ошибка при создании задачи')
    }
  }

  const handleClose = () => {
    setTitle('')
    setTodolistId('')
    setPriority(TaskPriority.Low)
    setTime('09:00')
    setHasTime(true)
    setError('')
    setIsCreatingTodolist(false)
    setNewTodolistName('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить задачу</DialogTitle>
      <DialogContent>
        <Box className={styles.form}>
          <TextField
            label="Название задачи"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError('')
            }}
            fullWidth
            autoFocus
            error={!!error}
            helperText={error}
          />

          {/* Todolist selector */}
          <Box>
            {isCreatingTodolist ? (
              <Box className={styles.newTodolistRow}>
                <TextField
                  label="Название нового списка"
                  value={newTodolistName}
                  onChange={(e) => setNewTodolistName(e.target.value)}
                  fullWidth
                  size="small"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateTodolist()
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCreateTodolist}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  Создать
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setIsCreatingTodolist(false)
                    setNewTodolistName('')
                  }}
                >
                  Отмена
                </Button>
              </Box>
            ) : (
              <FormControl fullWidth>
                <InputLabel>Список задач</InputLabel>
                <Select
                  value={todolistId}
                  label="Список задач"
                  onChange={(e) => {
                    setTodolistId(e.target.value)
                    setError('')
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setIsCreatingTodolist(true)}
                        sx={{ mr: 2 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  }
                >
                  {todolists?.map((tl) => (
                    <MenuItem key={tl.id} value={tl.id}>
                      {tl.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {/* Priority selector */}
          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select
              value={priority}
              label="Приоритет"
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {Object.entries(priorityLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={hasTime}
                onChange={(e) => setHasTime(e.target.checked)}
              />
            }
            label="Назначить время"
          />
          {hasTime && (
            <TextField
              label="Время"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}