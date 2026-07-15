import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus } from '@/common/enums/enums'
import {
  selectSelectedDate,
  selectCurrentWeekStart,
  setSelectedDate,
  navigateWeek,
} from '../../api/dashboard-slice'
import { WeekDay } from '../../lib/types'
import { formatDate, isToday } from '../../lib/utils/dateUtils'
import { aggregateTasksByDate, getTasksForDate, calculateLoadLevel, sortTasksByTime } from '../../lib/utils/taskUtils'
import { WeekStrip } from './WeekStrip/WeekStrip'
import { TaskTimeline } from './TaskTimeline/TaskTimeline'
import styles from './TimelineCalendar.module.css'

export const TimelineCalendar: FC = () => {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(selectSelectedDate)
  const currentWeekStart = useAppSelector(selectCurrentWeekStart)

  const { data: todolists, isLoading: isTodolistsLoading } = useGetTodolistsQuery()
  const [updateTask] = useUpdateTaskMutation()

  const allTasks = useMemo(() => {
    if (!todolists) return []
    return todolists.flatMap(() => {
      return []
    })
  }, [todolists])

  const taskCountMap = useMemo(() => {
    return aggregateTasksByDate(allTasks)
  }, [allTasks])

  const weekDays = useMemo((): WeekDay[] => {
    const weekStart = new Date(currentWeekStart)
    const days: WeekDay[] = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      const dateString = formatDate(date)
      const taskCount = taskCountMap.get(dateString) || 0

      days.push({
        dateString,
        dayName: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: isToday(dateString),
        taskCount,
        loadLevel: calculateLoadLevel(taskCount),
      })
    }

    return days
  }, [currentWeekStart, taskCountMap])

  const selectedTasks = useMemo(() => {
    const tasks = getTasksForDate(allTasks, selectedDate)
    return sortTasksByTime(tasks)
  }, [allTasks, selectedDate])

  const handleDayClick = (date: string) => {
    dispatch(setSelectedDate(date))
  }

  const handleNavigate = (direction: 'forward' | 'backward') => {
    dispatch(navigateWeek(direction))
  }

  const handleToggleTask = async (task: DomainTask) => {
    const newStatus = task.status === TaskStatus.Completed ? TaskStatus.New : TaskStatus.Completed
    await updateTask({
      todolistId: task.todoListId,
      taskId: task.id,
      model: {
        title: task.title,
        status: newStatus,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        description: task.description,
      },
    })
  }

  if (isTodolistsLoading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box className={styles.container}>
      <WeekStrip
        weekDays={weekDays}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
        onNavigate={handleNavigate}
      />
      <Paper className={styles.taskSection}>
        <Typography variant="h6" gutterBottom>
          Задачи на {new Date(selectedDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
          })}
        </Typography>
        <TaskTimeline tasks={selectedTasks} onToggleTask={handleToggleTask} />
      </Paper>
    </Box>
  )
}