import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import InputAdornment from '@mui/material/InputAdornment'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
  todolists: DomainTodolist[]
  value: string
  onChange: (value: string) => void
  onCreateTodolist: (title: string) => Promise<void>
  error?: string
}

export const TodolistSelector: FC<Props> = ({
  todolists,
  value,
  onChange,
  onCreateTodolist,
  error,
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = async () => {
    if (newName.trim()) {
      await onCreateTodolist(newName.trim())
      setNewName('')
      setIsCreating(false)
    }
  }

  const handleCancel = () => {
    setNewName('')
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
        <TextField
          label="Название нового списка"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          size="small"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate()
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
          <Button variant="contained" onClick={handleCreate} size="small">
            Создать
          </Button>
          <Button variant="text" onClick={handleCancel} size="small">
            Отмена
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>Список задач</InputLabel>
      <Select
        value={value}
        label="Список задач"
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setIsCreating(true)} sx={{ mr: 2 }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      >
        {todolists.map((tl) => (
          <MenuItem key={tl.id} value={tl.id}>
            {tl.title}
          </MenuItem>
        ))}
      </Select>
      {error && <Box sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>{error}</Box>}
    </FormControl>
  )
}