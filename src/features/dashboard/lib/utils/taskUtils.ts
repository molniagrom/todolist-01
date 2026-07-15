import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { LoadLevel, TaskType } from '../types'

export const getTaskType = (task: DomainTask): TaskType => {
  if (task.startDate || task.deadline) return 'scheduled'
  return 'general'
}

export const isScheduledTask = (task: DomainTask): boolean => {
  return getTaskType(task) === 'scheduled'
}

export const isGeneralTask = (task: DomainTask): boolean => {
  return getTaskType(task) === 'general'
}

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
    // Scheduled tasks: show on their startDate
    if (task.startDate) {
      return task.startDate.split('T')[0] === date
    }
    // General tasks: show on their addedDate
    return task.addedDate.split('T')[0] === date
  })
}

export const getScheduledTasksForDate = (tasks: DomainTask[], date: string): DomainTask[] => {
  return tasks.filter((task) => {
    return task.startDate && task.startDate.split('T')[0] === date
  })
}

export const getGeneralTasksForDate = (tasks: DomainTask[], date: string): DomainTask[] => {
  return tasks.filter((task) => {
    return !task.startDate && task.addedDate.split('T')[0] === date
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