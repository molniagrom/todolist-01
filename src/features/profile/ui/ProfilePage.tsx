import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"

export const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Личная страница с настройками аккаунта и предпочтениями.
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            sx={{ width: 80, height: 80, mr: 3, bgcolor: "primary.main" }}
          >
            U
          </Avatar>
          <Box>
            <Typography variant="h5">Пользователь</Typography>
            <Typography color="text.secondary">user@example.com</Typography>
          </Box>
        </Box>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Имя"
              defaultValue="Пользователь"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              defaultValue="user@example.com"
              variant="outlined"
            />
          </Box>
          <TextField
            fullWidth
            label="О себе"
            multiline
            rows={3}
            variant="outlined"
          />
          <Box>
            <Button variant="contained" color="primary">
              Сохранить изменения
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}