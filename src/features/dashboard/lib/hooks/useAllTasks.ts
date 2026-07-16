import { useEffect, useState, useCallback, useRef } from 'react'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
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
    setAllTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }, [])

  const removeTaskOptimistic = useCallback((taskId: string) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== taskId))
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