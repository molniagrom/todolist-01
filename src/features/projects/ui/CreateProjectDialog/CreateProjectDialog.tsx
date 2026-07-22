import { FC, useRef } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { CreateProjectForm, type ProjectFormInputs } from "./CreateProjectForm"
import type { ProjectWithStats } from "../../lib/types"

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProjectFormInputs) => void
  project?: ProjectWithStats | null
}

export const CreateProjectDialog: FC<Props> = ({ open, onClose, onSubmit, project }) => {
  const isEditing = !!project
  const formRef = useRef<{ submit: () => void }>(null)

  const handleSubmit = (data: ProjectFormInputs) => {
    onSubmit(data)
    onClose()
  }

  const handleDialogSubmit = () => {
    formRef.current?.submit()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Редактировать проект" : "Создать проект"}</DialogTitle>
      <DialogContent>
        <CreateProjectForm
          ref={formRef}
          defaultValues={isEditing ? {
            title: project.title,
            description: project.description || "",
            color: project.color,
            deadline: project.deadline || "",
          } : undefined}
          onSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleDialogSubmit} variant="contained">
          {isEditing ? "Сохранить" : "Создать"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
