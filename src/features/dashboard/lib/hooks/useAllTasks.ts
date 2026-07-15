import { useEffect, useState, useCallback } from 'react'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { useAppDispatch } from '@/common/hooks'
import { setAppStatusAC } from '@/app/app-slice'

export const useAllTasks = () => {
  const dispatch = useAppDispatch()
  const { data: todolists, isLoading: isTodolistsLoading } = useGetTodolistsQuery()
  const [allTasks, setAllTasks] = useState<DomainTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [trigger, setTrigger] = useState(0)

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (!todolists || todolists.length === 0) {
      setAllTasks([])
      setIsLoading(false)
      return
    }

    const fetchAllTasks = async () => {
      setIsLoading(true)
      dispatch(setAppStatusAC({ status: 'loading' }))

      const tasks: DomainTask[] = []

      for (const tl of todolists) {
        try {
          const result = await dispatch(
            tasksApi.endpoints.getTasks.initiate({
              todolistId: tl.id,
              params: { page: 1 },
            })
          ).unwrap()
          tasks.push(...result.items)
        } catch (e) {
          console.error(`Failed to fetch tasks for todolist ${tl.id}`, e)
        }
      }

      setAllTasks(tasks)
      setIsLoading(false)
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    }

    fetchAllTasks()
  }, [todolists, dispatch, trigger])

  return { allTasks, isLoading: isTodolistsLoading || isLoading, refetch }
}