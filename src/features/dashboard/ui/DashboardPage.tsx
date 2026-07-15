import { useMemo } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { TaskStatus } from '@/common/enums/enums'
import { useAllTasks } from '../lib/hooks/useAllTasks'
import { StatsCards } from './StatsCards/StatsCards'
import { TimelineCalendar } from './TimelineCalendar/TimelineCalendar'

export const DashboardPage = () => {
  const {
    allTasks,
    isLoading,
    refetch,
    addTaskOptimistic,
    updateTaskOptimistic,
    removeTaskOptimistic,
  } = useAllTasks()

  const stats = useMemo(() => {
    const total = allTasks.length
    const completed = allTasks.filter((t) => t.status === TaskStatus.Completed).length
    const active = total - completed
    return { total, active, completed }
  }, [allTasks])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
        Dashboard
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: '0.875rem', sm: '1rem' } }}
      >
        Краткий обзор ваших задач и прогресса.
      </Typography>

      <StatsCards
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />

      <TimelineCalendar
        allTasks={allTasks}
        refetch={refetch}
        addTaskOptimistic={addTaskOptimistic}
        updateTaskOptimistic={updateTaskOptimistic}
        removeTaskOptimistic={removeTaskOptimistic}
      />
    </Container>
  )
}