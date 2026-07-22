import { FC } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import type { ProjectWithStats } from "../../../lib/types"

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  onClose: () => void
  project: ProjectWithStats
  onEdit: (project: ProjectWithStats) => void
  onDelete: (id: string) => void
}

export const CardMenu: FC<Props> = ({ anchorEl, open, onClose, project, onEdit, onDelete }) => {
  const handleEdit = () => {
    onClose()
    onEdit(project)
  }

  const handleDelete = () => {
    onClose()
    onDelete(project.id)
  }

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={handleEdit}>
        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
        <ListItemText>Редактировать</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </Menu>
  )
}
