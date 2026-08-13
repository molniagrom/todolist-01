import { useMemo } from 'react'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'

export type ProfileStats = {
  total: number
  completed: number
  inProgress: number
  overdue: number
}

export const useProfileStats = (tasks: DomainTask[]): ProfileStats => {
  return useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    let completed = 0
    let inProgress = 0
    let overdue = 0

    for (const task of tasks) {
      if (task.status === 2) {
        completed++
      } else {
        inProgress++
        if (task.deadline && task.deadline.split('T')[0] < today) {
          overdue++
        }
      }
    }

    return { total: tasks.length, completed, inProgress, overdue }
  }, [tasks])
}
