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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
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