import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

export const CalendarPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Планирование задач по дням и срокам выполнения.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">
            Календарь будет добавлен в следующем обновлении
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}