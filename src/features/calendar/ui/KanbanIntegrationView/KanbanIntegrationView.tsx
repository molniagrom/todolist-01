import { FC, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import type { KanbanTask } from '@/features/projects/api/kanbanTasksApi.types'
import styles from './KanbanIntegrationView.module.css'

type Props = {
  tasks: DomainTask[]
}

export const KanbanIntegrationView: FC<Props> = ({ tasks }) => {
  const [editingTask, setEditingTask] = useState<DomainTask | null>(null)
  const [startDate, setStartDate] = useState('')
  const [deadline, setDeadline] = useState('')

  // Filter kanban-origin tasks (todoListId === 'kanban')
  const kanbanTasks = useMemo(() => tasks.filter((t) => t.todoListId === 'kanban'), [tasks])

  // Group by project (using the task's todoListId as proxy)
  const tasksWithDates = useMemo(() => kanbanTasks.filter((t) => t.startDate || t.deadline), [kanbanTasks])
  const tasksWithoutDates = useMemo(() => kanbanTasks.filter((t) => !t.startDate && !t.deadline), [kanbanTasks])

  const handleEditOpen = (task: DomainTask) => {
    setEditingTask(task)
    setStartDate(task.startDate?.split('T')[0] || '')
    setDeadline(task.deadline?.split('T')[0] || '')
  }

  const handleSave = () => {
    if (editingTask) {
      try {
        const raw = localStorage.getItem('kanbanTasks')
        if (raw) {
          const kanbanTasks: KanbanTask[] = JSON.parse(raw)
          const index = kanbanTasks.findIndex((t) => t.id === editingTask.id)
          if (index !== -1) {
            kanbanTasks[index] = {
              ...kanbanTasks[index],
              startDate: startDate || undefined,
              deadline: deadline || undefined,
            }
            localStorage.setItem('kanbanTasks', JSON.stringify(kanbanTasks))
          }
        }
      } catch { /* skip */ }
    }
    setEditingTask(null)
  }

  return (
    <Box>
      <Typography variant="h6" className={styles.title}>
        Kanban-задачи
      </Typography>
      <Typography variant="body2" color="text.secondary" className={styles.description}>
        Задачи из kanban-досок с галочкой «Отображать в Dashboard». Добавьте даты, чтобы они появились в других режимах календаря.
      </Typography>

      {kanbanTasks.length === 0 ? (
        <Typography color="text.secondary" className={styles.empty}>
          Нет kanban-задач с галочкой «Отображать в Dashboard».
          <br />
          Откройте kanban-доску и отметьте задачи для отображения.
        </Typography>
      ) : (
        <>
          {tasksWithoutDates.length > 0 && (
            <Box className={styles.section}>
              <Typography variant="subtitle2" className={styles.sectionTitle}>
                Без дат ({tasksWithoutDates.length})
              </Typography>
              <Box className={styles.taskList}>
                {tasksWithoutDates.map((task) => (
                  <Paper key={task.id} className={styles.taskPaper} elevation={0} variant="outlined">
                    <Typography variant="body2" className={styles.taskTitle}>
                      {task.title}
                    </Typography>
                    <Chip label="Kanban" size="small" variant="outlined" />
                    <IconButton size="small" onClick={() => handleEditOpen(task)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {tasksWithDates.length > 0 && (
            <Box>
              <Typography variant="subtitle2" className={styles.sectionTitle}>
                С датами ({tasksWithDates.length})
              </Typography>
              <Box className={styles.taskList}>
                {tasksWithDates.map((task) => (
                  <Paper key={task.id} className={styles.taskPaper} elevation={0} variant="outlined">
                    <Typography variant="body2" className={styles.taskTitle}>
                      {task.title}
                    </Typography>
                    <Chip label="Kanban" size="small" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">
                      {task.startDate?.split('T')[0] || '—'}
                    </Typography>
                    <IconButton size="small" onClick={() => handleEditOpen(task)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}

      <Dialog open={!!editingTask} onClose={() => setEditingTask(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Даты для «{editingTask?.title}»</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            label="Дата начала"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
          <TextField
            label="Дедлайн"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingTask(null)}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
