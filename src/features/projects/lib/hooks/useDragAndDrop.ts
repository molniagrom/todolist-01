import { useCallback, useState } from "react"
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import type { KanbanColumn } from "../../api/kanbanColumnsApi.types"
import type { KanbanTask } from "../../api/kanbanTasksApi.types"
import { useUpdateTaskMutation, useReorderTasksMutation } from "../../api/kanbanTasksApi"
import { useReorderColumnsMutation } from "../../api/kanbanColumnsApi"

type UseDragAndDropParams = {
  columns: KanbanColumn[]
  tasks: KanbanTask[]
  projectId: string
}

export const useDragAndDrop = ({ columns, tasks, projectId }: UseDragAndDropParams) => {
  const [updateTask] = useUpdateTaskMutation()
  const [reorderTasks] = useReorderTasksMutation()
  const [reorderColumns] = useReorderColumnsMutation()

  const [activeItem, setActiveItem] = useState<KanbanTask | null>(null)
  const [activeType, setActiveType] = useState<"task" | "column" | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  )

  const isColumnId = useCallback(
    (id: string) => columns.some((c) => c.id === id),
    [columns],
  )

  const findColumnByTaskId = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId)
      if (task) return task.columnId
      return columns.find((c) => c.id === taskId)?.id || null
    },
    [tasks, columns],
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event
      const id = active.id as string

      if (isColumnId(id)) {
        setActiveType("column")
        setActiveItem(null)
      } else {
        const task = tasks.find((t) => t.id === id)
        if (task) {
          setActiveType("task")
          setActiveItem(task)
        }
      }
    },
    [tasks, isColumnId],
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return
      if (activeType === "column") return

      const activeId = active.id as string
      const overId = over.id as string

      const activeCol = findColumnByTaskId(activeId)
      const overCol = findColumnByTaskId(overId)

      if (!activeCol || !overCol || activeCol === overCol) return

      updateTask({ id: activeId, columnId: overCol })
    },
    [activeType, findColumnByTaskId, updateTask],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveItem(null)
      setActiveType(null)

      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      if (isColumnId(activeId) && isColumnId(overId)) {
        const oldIndex = columns.findIndex((c) => c.id === activeId)
        const newIndex = columns.findIndex((c) => c.id === overId)

        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(columns, oldIndex, newIndex)
          reorderColumns({
            projectId,
            columnIds: newOrder.map((c) => c.id),
          })
        }
        return
      }

      const activeCol = findColumnByTaskId(activeId)

      if (activeCol) {
        const columnTasks = tasks
          .filter((t) => t.columnId === activeCol)
          .sort((a, b) => a.order - b.order)

        const oldIndex = columnTasks.findIndex((t) => t.id === activeId)
        const newIndex = columnTasks.findIndex((t) => t.id === overId)

        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(columnTasks, oldIndex, newIndex)
          reorderTasks({
            columnId: activeCol,
            taskIds: newOrder.map((t) => t.id),
          })
        }
      }
    },
    [columns, tasks, isColumnId, findColumnByTaskId, reorderColumns, reorderTasks, projectId],
  )

  return {
    sensors,
    activeItem,
    activeType,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}
