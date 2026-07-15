import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { StatsCards } from './StatsCards/StatsCards'
import { TimelineCalendar } from './TimelineCalendar/TimelineCalendar'

export const DashboardPage = () => {
  const { data: todolists, isLoading: isTodolistsLoading } = useGetTodolistsQuery()

  const totalTodolists = todolists?.length || 0

  if (isTodolistsLoading) {
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
        total={totalTodolists}
        active={totalTodolists}
        completed={0}
      />

      <TimelineCalendar />
    </Container>
  )
}