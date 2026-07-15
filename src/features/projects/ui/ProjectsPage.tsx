import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

export const ProjectsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Projects
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Раздел для работы с отдельными проектами и списками.
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Создать проект
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Мой первый проект
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Описание проекта будет здесь.
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              Задач: 0
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Открыть</Button>
            <Button size="small" color="error">
              Удалить
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  )
}