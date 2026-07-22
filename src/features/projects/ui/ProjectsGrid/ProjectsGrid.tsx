import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { ProjectCard } from "../ProjectCard/ProjectCard"
import { ProjectCardSkeleton } from "../ProjectCard/ProjectCardSkeleton"
import type { ProjectWithStats } from "../../lib/types"
import styles from "./ProjectsGrid.module.css"

type Props = {
  projects: ProjectWithStats[]
  totalCount: number
  isLoading: boolean
  onEdit: (project: ProjectWithStats) => void
  onDelete: (id: string) => void
  onEnterFocus: (id: string) => void
}

export const ProjectsGrid: FC<Props> = ({ projects, totalCount, isLoading, onEdit, onDelete, onEnterFocus }) => {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <ProjectCardSkeleton />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (projects.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="h6" color="text.secondary">
          {totalCount === 0 ? "Нет проектов. Создайте первый!" : "Проекты не найдены"}
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
          <ProjectCard
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onEnterFocus={onEnterFocus}
          />
        </Grid>
      ))}
    </Grid>
  )
}
