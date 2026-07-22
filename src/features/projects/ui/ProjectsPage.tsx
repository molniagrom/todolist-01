import Container from "@mui/material/Container"
import { useProjects } from "../lib/hooks/useProjects"
import { useFocusMode } from "../lib/hooks/useFocusMode"
import { useProjectActions } from "../lib/hooks/useProjectActions"
import { useProjectFilter } from "../lib/hooks/useProjectFilter"
import { ProjectsHeader } from "./ProjectsHeader/ProjectsHeader"
import { ProjectsFilters } from "./ProjectsFilters/ProjectsFilters"
import { ProjectsGrid } from "./ProjectsGrid/ProjectsGrid"
import { CreateProjectDialog } from "./CreateProjectDialog/CreateProjectDialog"
import { FocusBanner } from "./FocusBanner/FocusBanner"
import styles from "./ProjectsPage.module.css"

export const ProjectsPage = () => {
  const { projects, isLoading } = useProjects()
  const { focusedProjectId, isFocusActive, enterFocus, exitFocus } = useFocusMode()
  const { dialogOpen, editingProject, openCreateDialog, openEditDialog, closeDialog, handleDelete, handleDialogSubmit } = useProjectActions()
  const { searchQuery, setSearchQuery, selectedColor, setSelectedColor, filteredProjects } = useProjectFilter(projects)

  const focusedProject = projects.find((p) => p.id === focusedProjectId)

  return (
    <Container maxWidth="lg" className={styles.container}>
      <ProjectsHeader onCreateClick={openCreateDialog} />

      {isFocusActive && focusedProject && (
        <FocusBanner projectTitle={focusedProject.title} onExitFocus={exitFocus} />
      )}

      <ProjectsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />

      <ProjectsGrid
        projects={filteredProjects}
        totalCount={projects.length}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        onEnterFocus={enterFocus}
      />

      <CreateProjectDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSubmit={handleDialogSubmit}
        project={editingProject}
      />
    </Container>
  )
}
