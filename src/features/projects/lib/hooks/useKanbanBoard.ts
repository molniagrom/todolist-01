import { useState, useCallback, useMemo } from "react"
import type { KanbanTask } from "../../api/kanbanTasksApi.types"

export const useKanbanBoard = (tasks: KanbanTask[]) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false)
  const [addColumnDialogOpen, setAddColumnDialogOpen] = useState(false)
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null)

  const getTasksByColumn = useCallback(
    (columnId: string) => {
      return tasks
        .filter((t) => t.columnId === columnId)
        .filter((t) => {
          if (!searchQuery) return true
          return t.title.toLowerCase().includes(searchQuery.toLowerCase())
        })
        .sort((a, b) => a.order - b.order)
    },
    [tasks, searchQuery],
  )

  return {
    searchQuery,
    setSearchQuery,
    addTaskDialogOpen,
    setAddTaskDialogOpen,
    addColumnDialogOpen,
    setAddColumnDialogOpen,
    activeColumnId,
    setActiveColumnId,
    getTasksByColumn,
  }
}
