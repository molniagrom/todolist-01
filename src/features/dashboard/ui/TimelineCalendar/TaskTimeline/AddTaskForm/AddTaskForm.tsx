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
import { useGetTodolistsQuery, useAddTodolistMutation } from '@/features/todolists/api/todolistsApi'
import { useAddTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskPriority } from '@/common/enums/enums'
import { priorityLabels } from '@/features/dashboard/lib/constants'
import { TodolistSelector } from './TodolistSelector/TodolistSelector'
import styles from './AddTaskForm.module.css'

type Props = {
  open: boolean
  onClose: () => void
  selectedDate: string
  onTaskAdded?: (task: DomainTask) => void
}

export const AddTaskForm: FC<Props> = ({ open, onClose, selectedDate, onTaskAdded }) => {
  const [title, setTitle] = useState('')
  const [todolistId, setTodolistId] = useState('')
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Low)
  const [time, setTime] = useState('09:00')
  const [hasTime, setHasTime] = useState(true)
  const [error, setError] = useState('')

  const { data: todolists } = useGetTodolistsQuery()
  const [addTodolist] = useAddTodolistMutation()
  const [addTask] = useAddTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const resetForm = () => {
    setTitle('')
    setTodolistId('')
    setPriority(TaskPriority.Low)
    setTime('09:00')
    setHasTime(true)
    setError('')
  }

  const handleCreateTodolist = async (name: string) => {
    try {
      const result = await addTodolist(name).unwrap()
      setTodolistId(result.data.item.id)
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
      const result = await addTask({ todolistId, title: title.trim() }).unwrap()
      const newTask = result.data.item

      const startDate = hasTime ? `${selectedDate}T${time}:00.000Z` : newTask.startDate
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

      const finalTask = { ...newTask, startDate, priority }
      resetForm()
      onTaskAdded?.(finalTask)
      onClose()
    } catch {
      setError('Ошибка при создании задачи')
    }
  }

  const handleClose = () => {
    resetForm()
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

          <TodolistSelector
            todolists={todolists || []}
            value={todolistId}
            onChange={(value) => {
              setTodolistId(value)
              setError('')
            }}
            onCreateTodolist={handleCreateTodolist}
          />

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
              slotProps={{ inputLabel: { shrink: true } }}
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