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
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { useAddTaskMutation } from '@/features/todolists/api/tasksApi'
import styles from './AddTaskForm.module.css'

type Props = {
  open: boolean
  onClose: () => void
}

export const AddTaskForm: FC<Props> = ({ open, onClose }) => {
  const [title, setTitle] = useState('')
  const [todolistId, setTodolistId] = useState('')
  const [time, setTime] = useState('09:00')
  const [error, setError] = useState('')

  const { data: todolists } = useGetTodolistsQuery()
  const [addTask] = useAddTaskMutation()

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
      await addTask({ todolistId, title: title.trim() }).unwrap()
      setTitle('')
      setTodolistId('')
      setTime('09:00')
      setError('')
      onClose()
    } catch {
      setError('Ошибка при создании задачи')
    }
  }

  const handleClose = () => {
    setTitle('')
    setTodolistId('')
    setTime('09:00')
    setError('')
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
          <FormControl fullWidth>
            <InputLabel>Список задач</InputLabel>
            <Select
              value={todolistId}
              label="Список задач"
              onChange={(e) => {
                setTodolistId(e.target.value)
                setError('')
              }}
            >
              {todolists?.map((tl) => (
                <MenuItem key={tl.id} value={tl.id}>
                  {tl.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Время"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
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