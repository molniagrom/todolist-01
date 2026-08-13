import { FC, useState, useEffect, useRef } from "react"
import Dialog from "@mui/material/Dialog"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Collapse from "@mui/material/Collapse"
import DialogContent from "@mui/material/DialogContent"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import ShareIcon from "@mui/icons-material/Share"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import LockIcon from "@mui/icons-material/Lock"
import VisibilityIcon from "@mui/icons-material/Visibility"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import LinkIcon from "@mui/icons-material/Link"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { useUpdateTaskMutation } from "../../../api/kanbanTasksApi"
import type { KanbanTask } from "../../../api/kanbanTasksApi.types"
import { saveActivity } from "@/features/profile"
import styles from "./EditTaskDialog.module.css"

type Props = {
  open: boolean
  onClose: () => void
  task: KanbanTask | null
}

type Attachment = {
  id: string
  name: string
  type: string
  size: number
  preview?: string
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const isImageType = (type: string) => type.startsWith("image/")

export const EditTaskDialog: FC<Props> = ({ open, onClose, task }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [showInDashboard, setShowInDashboard] = useState(false)
  const [subtasks, setSubtasks] = useState<KanbanTask["subtasks"]>([])
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [attachmentsOpen, setAttachmentsOpen] = useState(true)
  const [subtasksOpen, setSubtasksOpen] = useState(true)
  const [linkedOpen, setLinkedOpen] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [updateTask] = useUpdateTaskMutation()

  useEffect(() => {
    if (task && open) {
      setTitle(task.title)
      setDescription(task.description || "")
      setShowInDashboard(task.showInDashboard)
      setSubtasks(task.subtasks || [])
      setNewSubtaskTitle("")
      setIsEditingDescription(false)
      setAttachments(
        (task.attachments || []).map((a) => ({
          id: a.id,
          name: a.name,
          type: a.type,
          size: a.size,
          preview: a.dataUrl,
        })),
      )
    }
  }, [task, open])

  const handleSave = () => {
    if (!task || !title.trim()) return
    updateTask({
      id: task.id,
      title: title.trim(),
      description: description.trim() || undefined,
      showInDashboard,
      subtasks,
      attachments: attachments.map((a) => ({
        id: a.id,
        name: a.name,
        type: a.type,
        size: a.size,
        dataUrl: a.preview,
      })),
    })
    saveActivity({ type: 'update', text: `Задача «${title.trim()}» обновлена в Kanban` })
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const attachment: Attachment = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
      }

      if (isImageType(file.type)) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          attachment.preview = ev.target?.result as string
          setAttachments((prev) => [...prev, attachment])
        }
        reader.readAsDataURL(file)
      } else {
        setAttachments((prev) => [...prev, attachment])
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return
    setSubtasks([
      ...(subtasks || []),
      { id: crypto.randomUUID(), title: newSubtaskTitle.trim(), completed: false },
    ])
    setNewSubtaskTitle("")
  }

  const handleToggleSubtask = (subtaskId: string) => {
    setSubtasks(
      (subtasks || []).map((st) =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st,
      ),
    )
  }

  const handleDeleteSubtask = (subtaskId: string) => {
    setSubtasks((subtasks || []).filter((st) => st.id !== subtaskId))
  }

  if (!task) return null

  const taskId = task.type || `IN-${task.id.slice(0, 4).toUpperCase()}`
  const completedSubtasks = (subtasks || []).filter((st) => st.completed).length
  const totalSubtasks = (subtasks || []).length

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false}
      className={styles.dialog}
      slotProps={{
        paper: {
          className: styles.paper,
        },
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      <DialogContent className={styles.content}>
        <Box className={styles.scrollArea}>
          {/* Header */}
          <Box className={styles.header}>
            <Box className={styles.headerLeft}>
              <Box className={styles.taskIdBadge}>
                <BookmarkIcon sx={{ fontSize: 14, color: "#52c41a" }} />
                <Typography variant="caption" className={styles.taskIdText}>{taskId}</Typography>
              </Box>
            </Box>

            <Box className={styles.headerRight}>
              <IconButton size="small" className={styles.headerIcon}>
                <LockIcon fontSize="small" />
              </IconButton>
              <Box className={styles.viewersBadge}>
                <VisibilityIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">1</Typography>
              </Box>
              <IconButton size="small" className={styles.headerIcon}>
                <ShareIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.headerIcon}>
                <MoreHorizIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.headerIcon}>
                <FullscreenIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleClose} className={styles.headerIcon}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Title */}
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
            variant="standard"
            slotProps={{
              input: { disableUnderline: true },
            }}
          />

          {/* Add subtask button */}
          <IconButton size="small" className={styles.addSubtaskIcon}>
            <AddIcon fontSize="small" />
          </IconButton>

          {/* Description */}
          <Box className={styles.section}>
            <Typography variant="subtitle1" className={styles.sectionTitle}>
              Описание
            </Typography>
            {isEditingDescription ? (
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                autoFocus
                className={styles.descriptionInput}
                variant="standard"
                slotProps={{
                  input: { disableUnderline: true },
                }}
              />
            ) : (
              <Typography
                className={styles.descriptionPlaceholder}
                onClick={() => setIsEditingDescription(true)}
              >
                {description || "Редактировать описание"}
              </Typography>
            )}
          </Box>

          <Divider className={styles.divider} />

          {/* Attachments */}
          <Box className={styles.section}>
            <Box
              className={styles.sectionHeader}
              onClick={() => setAttachmentsOpen(!attachmentsOpen)}
            >
              {attachmentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <Typography variant="subtitle1" className={styles.sectionTitle}>
                Вложения
              </Typography>
              {attachments.length > 0 && (
                <Typography variant="caption" className={styles.subtaskCount}>
                  {attachments.length}
                </Typography>
              )}
            </Box>
            <Collapse in={attachmentsOpen}>
              <Box className={styles.attachmentsGrid}>
                {attachments.map((file) => (
                  <Box key={file.id} className={styles.attachmentCard}>
                    {file.preview && isImageType(file.type) ? (
                      <img src={file.preview} alt={file.name} className={styles.attachmentImage} />
                    ) : (
                      <Box className={styles.fileIconWrapper}>
                        <InsertDriveFileIcon sx={{ fontSize: 32, color: "#4c82f6" }} />
                      </Box>
                    )}
                    <Box className={styles.attachmentInfo}>
                      <Typography variant="caption" className={styles.attachmentName} noWrap>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" className={styles.attachmentSize}>
                        {formatFileSize(file.size)}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      className={styles.attachmentRemove}
                      onClick={() => handleRemoveAttachment(file.id)}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                ))}

                <Box
                  className={styles.dropZone}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <IconButton size="small" className={styles.uploadIcon}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" className={styles.uploadText}>
                    Добавить вложение
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          </Box>

          <Divider className={styles.divider} />

          {/* Subtasks */}
          <Box className={styles.section}>
            <Box
              className={styles.sectionHeader}
              onClick={() => setSubtasksOpen(!subtasksOpen)}
            >
              {subtasksOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <Typography variant="subtitle1" className={styles.sectionTitle}>
                Подзадачи
              </Typography>
              {totalSubtasks > 0 && (
                <Typography variant="caption" className={styles.subtaskCount}>
                  {completedSubtasks}/{totalSubtasks}
                </Typography>
              )}
            </Box>
            <Collapse in={subtasksOpen}>
              <Box className={styles.subtasksList}>
                {(subtasks || []).map((subtask) => (
                  <Box key={subtask.id} className={styles.subtaskItem}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleSubtask(subtask.id)}
                    >
                      {subtask.completed ? (
                        <CheckCircleIcon sx={{ color: "#52c41a", fontSize: 20 }} />
                      ) : (
                        <RadioButtonUncheckedIcon sx={{ color: "#9e9ea4", fontSize: 20 }} />
                      )}
                    </IconButton>
                    <Typography
                      variant="body2"
                      className={subtask.completed ? styles.subtaskCompleted : styles.subtaskTitle}
                    >
                      {subtask.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSubtask(subtask.id)}
                      className={styles.subtaskDelete}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}

                <Box className={styles.addSubtaskRow}>
                  <IconButton size="small">
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    size="small"
                    placeholder="Добавить подзадачу"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSubtask()
                    }}
                    className={styles.subtaskInput}
                    variant="standard"
                    slotProps={{
                      input: { disableUnderline: true },
                    }}
                  />
                </Box>
              </Box>
            </Collapse>
          </Box>

          <Divider className={styles.divider} />

          {/* Linked tasks */}
          <Box className={styles.section}>
            <Box
              className={styles.sectionHeader}
              onClick={() => setLinkedOpen(!linkedOpen)}
            >
              {linkedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <Typography variant="subtitle1" className={styles.sectionTitle}>
                Привязанные задачи
              </Typography>
            </Box>
            <Collapse in={linkedOpen}>
              <Box className={styles.addSubtaskRow}>
                <IconButton size="small">
                  <LinkIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" className={styles.placeholderText}>
                  Добавить связанную задачу
                </Typography>
              </Box>
            </Collapse>
          </Box>

          <Divider className={styles.divider} />

          {/* Comments */}
          <Box className={styles.section}>
            <Box className={styles.commentInput}>
              <Box className={styles.commentAvatar}>
                <Typography variant="caption">U</Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="Добавить комментарий..."
                className={styles.commentField}
                variant="standard"
                slotProps={{
                  input: { disableUnderline: true },
                }}
              />
            </Box>
            <Box className={styles.quickReplies}>
              <Button size="small" className={styles.quickReply}>Все хорошо!</Button>
              <Button size="small" className={styles.quickReply}>Нужна помощь?</Button>
              <Button size="small" className={styles.quickReply}>Заблокировано...</Button>
              <Button size="small" className={styles.quickReply}>Не могли бы вы пояснить...?</Button>
              <Button size="small" className={styles.quickReply}>По графику</Button>
            </Box>
          </Box>
        </Box>

        {/* Bottom actions */}
        <Box className={styles.bottomBar}>
          <Box className={styles.dashboardToggle}>
            <Checkbox
              checked={showInDashboard}
              onChange={(e) => setShowInDashboard(e.target.checked)}
              size="small"
            />
            <Typography variant="body2">Отображать в Dashboard</Typography>
          </Box>
          <Box className={styles.bottomActions}>
            <Button onClick={handleClose} className={styles.cancelButton}>
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!title.trim()}
              className={styles.saveButton}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
