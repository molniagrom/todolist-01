import { FC, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { useCreateTaskMutation } from "../../../api/kanbanTasksApi"
import { saveActivity } from "@/features/profile"

type Props = {
  open: boolean
  onClose: () => void
  projectId: string
  columnId: string | null
}

export const AddTaskDialog: FC<Props> = ({ open, onClose, projectId, columnId }) => {
  const [title, setTitle] = useState("")
  const [showInDashboard, setShowInDashboard] = useState(false)
  const [createTask] = useCreateTaskMutation()

  const handleSubmit = () => {
    if (!title.trim() || !columnId) return

    createTask({
      projectId,
      columnId,
      title: title.trim(),
      showInDashboard,
    })

    saveActivity({ type: 'create', text: `Задача «${title.trim()}» создана в Kanban` })
    setTitle("")
    setShowInDashboard(false)
    onClose()
  }

  const handleClose = () => {
    setTitle("")
    setShowInDashboard(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit()
          }}
          sx={{ mt: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showInDashboard}
              onChange={(e) => setShowInDashboard(e.target.checked)}
            />
          }
          label="Отображать в Dashboard"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title.trim()}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  )
}
