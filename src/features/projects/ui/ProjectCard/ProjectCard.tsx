import { FC } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong"
import type { ProjectWithStats } from "../../lib/types"
import { useCardMenu } from "../../lib/hooks/useCardMenu"
import { useProjectStats } from "../../lib/hooks/useProjectStats"
import { ProgressBar } from "./ProgressBar/ProgressBar"
import { DeadlineBadge } from "./DeadlineBadge/DeadlineBadge"
import { CardMenu } from "./CardMenu/CardMenu"
import styles from "./ProjectCard.module.css"

type Props = {
  project: ProjectWithStats
  onEdit: (project: ProjectWithStats) => void
  onDelete: (id: string) => void
  onEnterFocus: (id: string) => void
}

export const ProjectCard: FC<Props> = ({ project, onEdit, onDelete, onEnterFocus }) => {
  const { anchorEl, menuOpen, handleMenuOpen, handleMenuClose } = useCardMenu()
  const { progress, completed, total } = useProjectStats(project.stats.completedTasks, project.stats.totalTasks)

  return (
    <Card className={styles.card}>
      <Box className={styles.colorStrip} style={{ backgroundColor: project.color }} />
      <CardContent className={styles.cardContent}>
        <Box className={styles.titleRow}>
          <Typography variant="h6" gutterBottom className={styles.title}>
            {project.title}
          </Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        {project.description && (
          <Typography variant="body2" color="text.secondary" className={styles.description}>
            {project.description}
          </Typography>
        )}

        <ProgressBar progress={progress} completed={completed} total={total} color={project.color} />
        <DeadlineBadge deadline={project.deadline} />
      </CardContent>

      <CardActions className={styles.cardActions}>
        <Button size="small" onClick={() => onEdit(project)}>
          Открыть
        </Button>
        <Tooltip title="Войти в фокус">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEnterFocus(project.id)}
          >
            <CenterFocusStrongIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>

      <CardMenu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        project={project}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Card>
  )
}
