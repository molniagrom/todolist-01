import { useCallback, useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useAllTasks } from '@/features/dashboard/lib/hooks/useAllTasks'
import { useCalendarState } from '../lib/hooks/useCalendarState'
import { CalendarTabs } from './CalendarTabs/CalendarTabs'
import { MonthView } from './MonthView/MonthView'
import { WeekView } from './WeekView/WeekView'
import { AgendaView } from './AgendaView/AgendaView'
import { DeadlinesView } from './DeadlinesView/DeadlinesView'
import { KanbanIntegrationView } from './KanbanIntegrationView/KanbanIntegrationView'
import { EditTaskDialog } from '@/features/dashboard/ui/TimelineCalendar/TaskTimeline/EditTaskDialog/EditTaskDialog'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import styles from './CalendarPage.module.css'

export const CalendarPage = () => {
  const {
    allTasks,
    isLoading,
    addTaskOptimistic,
    updateTaskOptimistic,
    removeTaskOptimistic,
  } = useAllTasks()

  const {
    activeMode,
    setActiveMode,
    currentMonth,
    currentYear,
    selectedDate,
    setSelectedDate,
    currentWeekStart,
    navigateMonth,
    navigateWeek,
    goToToday,
  } = useCalendarState()

  const [editingTask, setEditingTask] = useState<DomainTask | null>(null)

  const handleToggleTask = useCallback(
    (task: DomainTask) => {
      const newStatus = task.status === 2 ? 0 : 2
      updateTaskOptimistic(task.id, { status: newStatus })
    },
    [updateTaskOptimistic],
  )

  const handleDeleteTask = useCallback(
    (task: DomainTask) => {
      removeTaskOptimistic(task.id)
    },
    [removeTaskOptimistic],
  )

  const handleEditTask = useCallback((task: DomainTask) => {
    setEditingTask(task)
  }, [])

  const handleUpdateTask = useCallback(
    (task: DomainTask, updates: Partial<DomainTask>) => {
      updateTaskOptimistic(task.id, updates)
      setEditingTask(null)
    },
    [updateTaskOptimistic],
  )

  if (isLoading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
        Calendar
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" className={styles.subtitle}>
        Планирование задач по дням и срокам выполнения.
      </Typography>

      <CalendarTabs activeMode={activeMode} onChange={setActiveMode} />

      <Paper className={styles.paper}>
        {activeMode === 'month' && (
          <MonthView
            tasks={allTasks}
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            onMonthChange={navigateMonth}
            onDateSelect={setSelectedDate}
            onGoToToday={goToToday}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onTaskAdded={addTaskOptimistic}
          />
        )}

        {activeMode === 'week' && (
          <WeekView
            tasks={allTasks}
            currentWeekStart={currentWeekStart}
            selectedDate={selectedDate}
            onWeekNavigate={navigateWeek}
            onDateSelect={setSelectedDate}
            onGoToToday={goToToday}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {activeMode === 'agenda' && (
          <AgendaView
            tasks={allTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {activeMode === 'deadlines' && (
          <DeadlinesView
            tasks={allTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {activeMode === 'kanban' && <KanbanIntegrationView tasks={allTasks} />}
      </Paper>

      <EditTaskDialog
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleUpdateTask}
      />
    </Container>
  )
}
