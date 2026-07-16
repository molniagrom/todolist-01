import { FC, useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Divider from '@mui/material/Divider'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { isScheduledTask } from '@/features/dashboard/lib/utils/taskUtils'
import { AddTaskForm } from './AddTaskForm/AddTaskForm'
import { TaskRow } from './TaskRow/TaskRow'
import { EditTaskDialog } from './EditTaskDialog/EditTaskDialog'
import styles from './TaskTimeline.module.css'

type Props = {
  tasks: DomainTask[]
  selectedDate: string
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onUpdateTask: (task: DomainTask, updates: Partial<DomainTask>) => void
  onTaskAdded: (task: DomainTask) => void
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

  const scheduledTasks = useMemo(
    () => tasks.filter((t) => isScheduledTask(t)),
    [tasks]
  )

  const generalTasks = useMemo(
    () => tasks.filter((t) => !isScheduledTask(t)),
    [tasks]
  )

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
      {scheduledTasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          showTime={true}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={setEditingTask}
        />
      ))}

      {generalTasks.length > 0 && (
        <>
          {scheduledTasks.length > 0 && <Divider sx={{ my: 2 }} />}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Без времени
          </Typography>
          {generalTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              showTime={false}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={setEditingTask}
            />
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

      <EditTaskDialog
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={onUpdateTask}
      />
    </Box>
  )
}