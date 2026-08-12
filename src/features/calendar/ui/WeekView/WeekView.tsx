import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Button from '@mui/material/Button'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { getTasksForDate, sortTasksByTime } from '@/features/dashboard/lib/utils/taskUtils'
import { formatDate, parseDate, getDayName, isToday } from '@/features/dashboard/lib/utils/dateUtils'
import { DayColumn } from './DayColumn/DayColumn'
import styles from './WeekView.module.css'

type Props = {
  tasks: DomainTask[]
  currentWeekStart: string
  selectedDate: string
  onWeekNavigate: (direction: 'forward' | 'backward') => void
  onDateSelect: (date: string) => void
  onGoToToday: () => void
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

export const WeekView: FC<Props> = ({
  tasks,
  currentWeekStart,
  selectedDate,
  onWeekNavigate,
  onDateSelect,
  onGoToToday,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const weekDays = useMemo(() => {
    const start = parseDate(currentWeekStart)
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      const dateString = formatDate(date)
      return {
        dateString,
        dayName: getDayName(date),
        dayNumber: date.getDate(),
        isToday: isToday(dateString),
        tasks: sortTasksByTime(getTasksForDate(tasks, dateString)),
      }
    })
  }, [currentWeekStart, tasks])

  const weekLabel = useMemo(() => {
    const start = parseDate(currentWeekStart)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    const startMonth = start.toLocaleDateString('ru-RU', { month: 'long' })
    const endMonth = end.toLocaleDateString('ru-RU', { month: 'long' })
    if (startMonth === endMonth) {
      return `${start.getDate()}–${end.getDate()} ${startMonth} ${start.getFullYear()}`
    }
    return `${start.getDate()} ${startMonth} – ${end.getDate()} ${endMonth}`
  }, [currentWeekStart])

  return (
    <Box>
      <Box className={styles.header}>
        <IconButton onClick={() => onWeekNavigate('backward')}>
          <ChevronLeftIcon />
        </IconButton>
        <Box className={styles.labelGroup}>
          <Typography variant="h6">{weekLabel}</Typography>
          <Button size="small" onClick={onGoToToday}>
            Сегодня
          </Button>
        </Box>
        <IconButton onClick={() => onWeekNavigate('forward')}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className={styles.weekGrid}>
        {weekDays.map((day) => (
          <DayColumn
            key={day.dateString}
            day={day}
            isSelected={day.dateString === selectedDate}
            onSelect={() => onDateSelect(day.dateString)}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </Box>
    </Box>
  )
}
