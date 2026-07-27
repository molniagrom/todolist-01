import { useParams, useNavigate } from "react-router"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { useKanbanBoard } from "../../lib/hooks/useKanbanBoard"
import { useBoardData } from "../../lib/hooks/useBoardData"
import { useDragAndDrop } from "../../lib/hooks/useDragAndDrop"
import { KanbanToolbar } from "./KanbanToolbar/KanbanToolbar"
import { KanbanColumn } from "./KanbanColumn/KanbanColumn"
import { KanbanTaskCard } from "./KanbanTaskCard/KanbanTaskCard"
import { AddTaskDialog } from "./AddTaskDialog/AddTaskDialog"
import { AddColumnDialog } from "./AddColumnDialog/AddColumnDialog"
import styles from "./KanbanBoardPage.module.css"

export const KanbanBoardPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const { project, columns, tasks, isLoading } = useBoardData(projectId!)

  const {
    searchQuery,
    setSearchQuery,
    addTaskDialogOpen,
    setAddTaskDialogOpen,
    addColumnDialogOpen,
    setAddColumnDialogOpen,
    activeColumnId,
    setActiveColumnId,
    getTasksByColumn,
  } = useKanbanBoard(tasks)

  const {
    sensors,
    activeItem,
    activeType,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop({ columns, tasks, projectId: projectId! })

  if (isLoading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
      </Box>
    )
  }

  if (!project) {
    return (
      <Box className={styles.loading}>
        <Typography variant="h6" color="text.secondary">
          Проект не найден
        </Typography>
      </Box>
    )
  }

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order)
  const columnIds = sortedColumns.map((c) => c.id)

  return (
    <Box className={styles.page}>
      <KanbanToolbar
        projectTitle={project.title}
        projectColor={project.color}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBack={() => navigate("/projects")}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box className={styles.board}>
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            {sortedColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onAddTask={() => {
                  setActiveColumnId(column.id)
                  setAddTaskDialogOpen(true)
                }}
              />
            ))}
          </SortableContext>

          <Box
            className={styles.addColumnButton}
            onClick={() => setAddColumnDialogOpen(true)}
          >
            <Typography variant="body2" color="text.secondary">
              + Добавить колонку
            </Typography>
          </Box>
        </Box>

        <DragOverlay>
          {activeType === "task" && activeItem ? <KanbanTaskCard task={activeItem} /> : null}
        </DragOverlay>
      </DndContext>

      <AddTaskDialog
        open={addTaskDialogOpen}
        onClose={() => setAddTaskDialogOpen(false)}
        projectId={projectId!}
        columnId={activeColumnId}
      />

      <AddColumnDialog
        open={addColumnDialogOpen}
        onClose={() => setAddColumnDialogOpen(false)}
        projectId={projectId!}
      />
    </Box>
  )
}
