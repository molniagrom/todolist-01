import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useUpdateTaskMutation, useRemoveTaskMutation } from '@/features/todolists/api/tasksApi'
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
import { useAllTasks } from '../../lib/hooks/useAllTasks'
import { WeekStrip } from './WeekStrip/WeekStrip'
import { TaskTimeline } from './TaskTimeline/TaskTimeline'
import styles from './TimelineCalendar.module.css'

export const TimelineCalendar: FC = () => {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(selectSelectedDate)
  const currentWeekStart = useAppSelector(selectCurrentWeekStart)

  const {
    allTasks,
    isLoading,
    refetch,
    addTaskOptimistic,
    updateTaskOptimistic,
    removeTaskOptimistic,
  } = useAllTasks()
  const [updateTask] = useUpdateTaskMutation()
  const [removeTask] = useRemoveTaskMutation()

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

    // Optimistic update - update UI immediately
    updateTaskOptimistic(task.id, { status: newStatus })

    try {
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
      }).unwrap()
    } catch {
      // Revert on error
      refetch()
    }
  }

  const handleDeleteTask = async (task: DomainTask) => {
    // Optimistic update - remove from UI immediately
    removeTaskOptimistic(task.id)

    try {
      await removeTask({ todolistId: task.todoListId, taskId: task.id }).unwrap()
    } catch {
      // Revert on error
      refetch()
    }
  }

  const handleUpdateTask = async (task: DomainTask, updates: Partial<DomainTask>) => {
    // Optimistic update - update UI immediately
    updateTaskOptimistic(task.id, updates)

    try {
      await updateTask({
        todolistId: task.todoListId,
        taskId: task.id,
        model: {
          title: updates.title ?? task.title,
          status: updates.status ?? task.status,
          priority: updates.priority ?? task.priority,
          startDate: updates.startDate ?? task.startDate,
          deadline: updates.deadline ?? task.deadline,
          description: updates.description ?? task.description,
        },
      }).unwrap()
    } catch {
      // Revert on error
      refetch()
    }
  }

  if (isLoading) {
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
        <TaskTimeline
          tasks={selectedTasks}
          selectedDate={selectedDate}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          onTaskAdded={addTaskOptimistic}
        />
      </Paper>
    </Box>
  )
}