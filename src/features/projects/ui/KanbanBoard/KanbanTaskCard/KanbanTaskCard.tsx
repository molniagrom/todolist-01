import { FC, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { KanbanTask } from "../../../api/kanbanTasksApi.types"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "../../../api/kanbanTasksApi"
import { EditTaskDialog } from "../EditTaskDialog/EditTaskDialog"
import styles from "./KanbanTaskCard.module.css"

type Props = {
  task: KanbanTask
}

const AVATAR_COLORS = ["#fa8c16", "#1890ff", "#52c41a", "#fa8c16"]

export const KanbanTaskCard: FC<Props> = ({ task }) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const avatarColor = AVATAR_COLORS[Math.abs(task.id.charCodeAt(0)) % AVATAR_COLORS.length]
  const initials = task.assignee || task.title.charAt(0).toUpperCase()

  return (
    <Box
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
      {...attributes}
      {...listeners}
    >
      <Box className={styles.header}>
        <Typography variant="body2" className={styles.title}>
          {task.title}
        </Typography>
        <IconButton
          size="small"
          className={styles.menuButton}
          onClick={(e) => {
            e.stopPropagation()
            setMenuAnchor(e.currentTarget)
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className={styles.footer}>
        <Box className={styles.leftInfo}>
          <BookmarkIcon fontSize="small" sx={{ color: "#52c41a" }} />
          <Typography variant="caption" className={styles.taskId}>
            {task.type || `IN-${task.id.slice(0, 4).toUpperCase()}`}
          </Typography>
        </Box>

        <Box className={styles.rightInfo}>
          {task.showInDashboard && (
            <Typography variant="caption" className={styles.dashboardBadge}>
              Dashboard
            </Typography>
          )}
          <Box className={styles.avatar} style={{ backgroundColor: avatarColor }}>
            <Typography variant="caption" className={styles.avatarText}>
              {initials}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            setEditDialogOpen(true)
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            updateTask({ id: task.id, showInDashboard: !task.showInDashboard })
          }}
        >
          <ListItemIcon>
            {task.showInDashboard ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {task.showInDashboard ? "Скрыть из Dashboard" : "Показать в Dashboard"}
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            deleteTask(task.id)
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>

      <EditTaskDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        task={task}
      />
    </Box>
  )
}
