import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

type Props = {
  title: string
  subtitle: string
}

export const StubPage = ({ title, subtitle }: Props) => {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          p: { xs: 4, sm: 6 },
          minHeight: "55vh",
          bgcolor: "common.white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" component="h1" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {subtitle}
        </Typography>
      </Paper>
    </Container>
  )
}
