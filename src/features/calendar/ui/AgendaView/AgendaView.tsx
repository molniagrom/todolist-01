import { FC, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { formatDate, parseDate } from '@/features/dashboard/lib/utils/dateUtils'
import { sortTasksByTime } from '@/features/dashboard/lib/utils/taskUtils'
import { AgendaDay } from './AgendaDay/AgendaDay'
import styles from './AgendaView.module.css'

type Props = {
  tasks: DomainTask[]
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

const DAYS_TO_SHOW = 30

export const AgendaView: FC<Props> = ({ tasks, onToggleTask, onDeleteTask, onEditTask }) => {
  const [daysToShow, setDaysToShow] = useState(DAYS_TO_SHOW)

  const days = useMemo(() => {
    const today = new Date()
    const result: { dateString: string; dayName: string; dayNumber: number; tasks: DomainTask[] }[] = []

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const dateString = formatDate(date)
      const dayTasks = sortTasksByTime(
        tasks.filter((task) => {
          const taskDate = (task.startDate || task.addedDate).split('T')[0]
          return taskDate === dateString
        })
      )

      result.push({
        dateString,
        dayName: date.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' }),
        dayNumber: date.getDate(),
        tasks: dayTasks,
      })
    }

    return result
  }, [tasks, daysToShow])

  const hasMoreTasks = useMemo(() => {
    const lastDay = days[days.length - 1]
    if (!lastDay) return false
    const nextDate = new Date(lastDay.dateString)
    nextDate.setDate(nextDate.getDate() + 1)
    const nextDateStr = formatDate(nextDate)
    return tasks.some((task) => {
      const taskDate = (task.startDate || task.addedDate).split('T')[0]
      return taskDate >= nextDateStr
    })
  }, [tasks, days])

  return (
    <Box>
      <Typography variant="h6" className={styles.title}>
        Повестка на {daysToShow} дней
      </Typography>

      {days.map((day) => (
        <AgendaDay
          key={day.dateString}
          day={day}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}

      {hasMoreTasks && (
        <Box className={styles.loadMore}>
          <Button variant="outlined" onClick={() => setDaysToShow((prev) => prev + 30)}>
            Показать ещё
          </Button>
        </Box>
      )}
    </Box>
  )
}
