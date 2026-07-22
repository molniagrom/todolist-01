import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import styles from "./ProjectsHeader.module.css"

type Props = {
  onCreateClick: () => void
}

export const ProjectsHeader: FC<Props> = ({ onCreateClick }) => {
  return (
    <Box className={styles.header}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
          Projects
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" className={styles.subtitle}>
          Управляйте проектами и отслеживайте прогресс.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        className={styles.createButton}
      >
        Создать проект
      </Button>
    </Box>
  )
}
