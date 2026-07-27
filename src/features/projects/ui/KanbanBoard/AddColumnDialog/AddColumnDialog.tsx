import { FC, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useCreateColumnMutation } from "../../../api/kanbanColumnsApi"

type Props = {
  open: boolean
  onClose: () => void
  projectId: string
}

export const AddColumnDialog: FC<Props> = ({ open, onClose, projectId }) => {
  const [title, setTitle] = useState("")
  const [createColumn] = useCreateColumnMutation()

  const handleSubmit = () => {
    if (!title.trim()) return

    createColumn({
      projectId,
      title: title.trim(),
    })

    setTitle("")
    onClose()
  }

  const handleClose = () => {
    setTitle("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Новая колонка</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Название колонки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit()
          }}
          sx={{ mt: 1 }}
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
