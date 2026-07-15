import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { LoadLevel } from '../types'

export const aggregateTasksByDate = (tasks: DomainTask[]): Map<string, number> => {
  const map = new Map<string, number>()
  tasks.forEach((task) => {
    const date = task.startDate || task.addedDate
    if (date) {
      const dateStr = date.split('T')[0]
      map.set(dateStr, (map.get(dateStr) || 0) + 1)
    }
  })
  return map
}

export const getTasksForDate = (tasks: DomainTask[], date: string): DomainTask[] => {
  return tasks.filter((task) => {
    const taskDate = task.startDate || task.addedDate
    return taskDate && taskDate.split('T')[0] === date
  })
}

export const calculateLoadLevel = (taskCount: number): LoadLevel => {
  if (taskCount === 0) return 'none'
  if (taskCount <= 2) return 'low'
  if (taskCount <= 4) return 'medium'
  return 'high'
}

export const sortTasksByTime = (tasks: DomainTask[]): DomainTask[] => {
  return [...tasks].sort((a, b) => {
    const timeA = a.startDate || a.addedDate
    const timeB = b.startDate || b.addedDate
    return timeA.localeCompare(timeB)
  })
}