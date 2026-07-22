import { useState, useCallback } from "react"
import { useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from "../../api/projectsApi"
import type { ProjectWithStats } from "../types"
import type { ProjectFormInputs } from "../../ui/CreateProjectDialog/CreateProjectForm"

export const useProjectActions = () => {
  const [createProject] = useCreateProjectMutation()
  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectWithStats | null>(null)

  const openCreateDialog = useCallback(() => {
    setEditingProject(null)
    setDialogOpen(true)
  }, [])

  const openEditDialog = useCallback((project: ProjectWithStats) => {
    setEditingProject(project)
    setDialogOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setDialogOpen(false)
    setEditingProject(null)
  }, [])

  const handleCreate = useCallback((data: ProjectFormInputs) => {
    createProject({
      title: data.title,
      description: data.description,
      color: data.color,
      deadline: data.deadline,
    })
  }, [createProject])

  const handleUpdate = useCallback((data: ProjectFormInputs) => {
    if (editingProject) {
      updateProject({
        id: editingProject.id,
        title: data.title,
        description: data.description,
        color: data.color,
        deadline: data.deadline,
      })
    }
  }, [editingProject, updateProject])

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить проект?")) {
      deleteProject(id)
    }
  }, [deleteProject])

  const handleDialogSubmit = useCallback((data: ProjectFormInputs) => {
    if (editingProject) {
      handleUpdate(data)
    } else {
      handleCreate(data)
    }
    closeDialog()
  }, [editingProject, handleCreate, handleUpdate, closeDialog])

  return {
    dialogOpen,
    editingProject,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    handleDelete,
    handleDialogSubmit,
  }
}
