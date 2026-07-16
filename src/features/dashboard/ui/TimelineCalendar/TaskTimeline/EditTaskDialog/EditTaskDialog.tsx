import { FC, useState, useEffect } from 'react'
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
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskPriority } from '@/common/enums/enums'
import { priorityLabels } from '@/features/dashboard/lib/constants'

type Props = {
  task: DomainTask | null
  onClose: () => void
  onSave: (task: DomainTask, updates: Partial<DomainTask>) => void
}

export const EditTaskDialog: FC<Props> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Low)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setPriority(task.priority)
    }
  }, [task])

  const handleSave = () => {
    if (task && title.trim()) {
      onSave(task, { title: title.trim(), priority })
      onClose()
    }
  }

  return (
    <Dialog open={!!task} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать задачу</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            autoFocus
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}