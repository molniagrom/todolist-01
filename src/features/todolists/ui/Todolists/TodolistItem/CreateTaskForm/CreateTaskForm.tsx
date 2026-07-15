import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { TaskPriority } from '@/common/enums/enums'

type Props = {
  onCreateTask: (title: string, priority: TaskPriority) => void
}

const priorityLabels: Record<number, string> = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Middle]: 'Средний',
  [TaskPriority.Hi]: 'Высокий',
  [TaskPriority.Urgently]: 'Срочный',
  [TaskPriority.Later]: 'Позже',
}

export const CreateTaskForm = ({ onCreateTask }: Props) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Low)
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateTask(trimmedTitle, priority)
      setTitle('')
      setPriority(TaskPriority.Low)
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
      <TextField
        label="Введите название"
        variant="outlined"
        value={title}
        size="small"
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createTaskOnEnterHandler}
        sx={{ flexGrow: 1 }}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
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
      <IconButton onClick={createTaskHandler} color="primary">
        <AddBoxIcon />
      </IconButton>
    </Box>
  )
}