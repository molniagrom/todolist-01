import { FC, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import AddIcon from "@mui/icons-material/Add"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useDroppable } from "@dnd-kit/core"
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { KanbanColumn as KanbanColumnType } from "../../../api/kanbanColumnsApi.types"
import type { KanbanTask } from "../../../api/kanbanTasksApi.types"
import { useUpdateColumnMutation, useDeleteColumnMutation } from "../../../api/kanbanColumnsApi"
import { KanbanTaskCard } from "../KanbanTaskCard/KanbanTaskCard"
import styles from "./KanbanColumn.module.css"

type Props = {
  column: KanbanColumnType
  tasks: KanbanTask[]
  onAddTask: () => void
}

export const KanbanColumn: FC<Props> = ({ column, tasks, onAddTask }) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(column.title)

  const [updateColumn] = useUpdateColumnMutation()
  const [deleteColumn] = useDeleteColumnMutation()

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: `droppable-${column.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : undefined,
  }

  const taskIds = tasks.map((t) => t.id)

  const handleRename = () => {
    if (editTitle.trim() && editTitle !== column.title) {
      updateColumn({ id: column.id, title: editTitle.trim() })
    }
    setIsEditing(false)
  }

  const handleDelete = () => {
    setMenuAnchor(null)
    if (window.confirm(`Удалить колонку "${column.title}" и все её задачи?`)) {
      deleteColumn(column.id)
    }
  }

  return (
    <Box
      ref={(node) => {
        setSortableRef(node)
        setDroppableRef(node)
      }}
      style={style}
      className={`${styles.column} ${isOver ? styles.columnOver : ""} ${isDragging ? styles.dragging : ""}`}
    >
      <Box className={styles.header}>
        <Box className={styles.dragHandle} {...attributes} {...listeners}>
          <DragIndicatorIcon fontSize="small" />
        </Box>

        {isEditing ? (
          <TextField
            size="small"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename()
              if (e.key === "Escape") {
                setEditTitle(column.title)
                setIsEditing(false)
              }
            }}
            autoFocus
            className={styles.titleInput}
          />
        ) : (
          <>
            <Typography variant="subtitle2" className={styles.title}>
              {column.title}
            </Typography>
            <Box className={styles.badge}>{tasks.length}</Box>
          </>
        )}

        <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className={styles.taskList}>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </Box>

      <Button
        className={styles.addButton}
        startIcon={<AddIcon />}
        onClick={onAddTask}
      >
        Создать
      </Button>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null)
            setIsEditing(true)
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Переименовать</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
