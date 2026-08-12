import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Button from '@mui/material/Button'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { getTasksForDate } from '@/features/dashboard/lib/utils/taskUtils'
import { getMonthGrid, getMonthName } from '../../lib/utils/monthGridUtils'
import { MonthGrid } from './MonthGrid/MonthGrid'
import { TaskTimeline } from '@/features/dashboard/ui/TimelineCalendar/TaskTimeline/TaskTimeline'
import styles from './MonthView.module.css'

type Props = {
  tasks: DomainTask[]
  currentMonth: number
  currentYear: number
  selectedDate: string
  onMonthChange: (direction: 'forward' | 'backward') => void
  onDateSelect: (date: string) => void
  onGoToToday: () => void
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onUpdateTask: (task: DomainTask, updates: Partial<DomainTask>) => void
  onTaskAdded: (task: DomainTask) => void
}

export const MonthView: FC<Props> = ({
  tasks,
  currentMonth,
  currentYear,
  selectedDate,
  onMonthChange,
  onDateSelect,
  onGoToToday,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  onTaskAdded,
}) => {
  const grid = useMemo(() => getMonthGrid(currentYear, currentMonth), [currentYear, currentMonth])

  const taskCountMap = useMemo(() => {
    const map = new Map<string, number>()
    tasks.forEach((task) => {
      const date = task.startDate || task.addedDate
      if (date) {
        const dateStr = date.split('T')[0]
        map.set(dateStr, (map.get(dateStr) || 0) + 1)
      }
    })
    return map
  }, [tasks])

  const selectedTasks = useMemo(() => getTasksForDate(tasks, selectedDate), [tasks, selectedDate])

  return (
    <Box>
      <Box className={styles.header}>
        <IconButton onClick={() => onMonthChange('backward')}>
          <ChevronLeftIcon />
        </IconButton>
        <Box className={styles.labelGroup}>
          <Typography variant="h6">
            {getMonthName(currentMonth)} {currentYear}
          </Typography>
          <Button size="small" onClick={onGoToToday}>
            Сегодня
          </Button>
        </Box>
        <IconButton onClick={() => onMonthChange('forward')}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <MonthGrid grid={grid} selectedDate={selectedDate} taskCountMap={taskCountMap} onDateSelect={onDateSelect} />

      <Box className={styles.timeline}>
        <TaskTimeline
          tasks={selectedTasks}
          selectedDate={selectedDate}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onTaskAdded={onTaskAdded}
        />
      </Box>
    </Box>
  )
}
