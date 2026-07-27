import { useEffect, useState, useCallback, useRef } from 'react'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import type { KanbanTask } from '@/features/projects/api/kanbanTasksApi.types'
import { kanbanTaskToDomainTask } from '../utils/kanbanToDomain'
import { useAppDispatch } from '@/common/hooks'

export const useAllTasks = () => {
  const dispatch = useAppDispatch()
  const { data: todolists, isLoading: isTodolistsLoading } = useGetTodolistsQuery()
  const [allTasks, setAllTasks] = useState<DomainTask[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const fetchTasks = useCallback(async (showLoading = false) => {
    if (!todolists || todolists.length === 0) {
      setAllTasks([])
      setIsInitialLoad(false)
      return
    }

    if (showLoading) {
      setIsInitialLoad(true)
    }

    // Parallel fetching for better performance
    const results = await Promise.allSettled(
      todolists.map((tl) =>
        dispatch(
          tasksApi.endpoints.getTasks.initiate({
            todolistId: tl.id,
            params: { page: 1 },
          })
        ).unwrap()
      )
    )

    const tasks: DomainTask[] = []
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        tasks.push(...result.value.items)
      } else {
        console.error(`Failed to fetch tasks for todolist ${todolists[index].id}`, result.reason)
      }
    })

    // Read kanban tasks from localStorage where showInDashboard is true
    try {
      const raw = localStorage.getItem('kanbanTasks')
      if (raw) {
        const kanbanTasks: KanbanTask[] = JSON.parse(raw)
        const dashboardTasks = kanbanTasks
          .filter((t) => t.showInDashboard)
          .map(kanbanTaskToDomainTask)
        tasks.push(...dashboardTasks)
      }
    } catch {
      // localStorage unavailable or corrupted — skip silently
    }

    if (isMountedRef.current) {
      setAllTasks(tasks)
      setIsInitialLoad(false)
    }
  }, [todolists, dispatch])

  useEffect(() => {
    fetchTasks(true)
  }, [fetchTasks])

  const refetch = useCallback(() => {
    fetchTasks(false)
  }, [fetchTasks])

  const addTaskOptimistic = useCallback((task: DomainTask) => {
    setAllTasks((prev) => [...prev, task])
  }, [])

  const updateTaskOptimistic = useCallback((taskId: string, updates: Partial<DomainTask>) => {
    setAllTasks((prev) => {
      const task = prev.find((t) => t.id === taskId)
      if (task?.todoListId === 'kanban') {
        try {
          const raw = localStorage.getItem('kanbanTasks')
          if (raw) {
            const tasks: KanbanTask[] = JSON.parse(raw)
            const index = tasks.findIndex((t) => t.id === taskId)
            if (index !== -1) {
              if (updates.title !== undefined) tasks[index].title = updates.title
              localStorage.setItem('kanbanTasks', JSON.stringify(tasks))
            }
          }
        } catch { /* skip */ }
      }
      return prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    })
  }, [])

  const removeTaskOptimistic = useCallback((taskId: string) => {
    setAllTasks((prev) => {
      const task = prev.find((t) => t.id === taskId)
      if (task?.todoListId === 'kanban') {
        try {
          const raw = localStorage.getItem('kanbanTasks')
          if (raw) {
            const tasks: KanbanTask[] = JSON.parse(raw)
            localStorage.setItem('kanbanTasks', JSON.stringify(tasks.filter((t) => t.id !== taskId)))
          }
        } catch { /* skip */ }
      }
      return prev.filter((t) => t.id !== taskId)
    })
  }, [])

  return {
    allTasks,
    isLoading: isTodolistsLoading || isInitialLoad,
    refetch,
    addTaskOptimistic,
    updateTaskOptimistic,
    removeTaskOptimistic,
  }
}