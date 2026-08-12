import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { formatDate } from '@/features/dashboard/lib/utils/dateUtils'

export interface DeadlineGroups {
  overdue: DomainTask[]
  today: DomainTask[]
  thisWeek: DomainTask[]
  later: DomainTask[]
}

const getDeadlineDate = (task: DomainTask): string | null => {
  return task.deadline || task.startDate || null
}

export const classifyByDeadline = (tasks: DomainTask[]): DeadlineGroups => {
  const today = formatDate(new Date())
  const todayDate = new Date(today)
  const weekLater = new Date(todayDate)
  weekLater.setDate(weekLater.getDate() + 7)
  const weekLaterStr = formatDate(weekLater)

  const overdue: DomainTask[] = []
  const todayTasks: DomainTask[] = []
  const thisWeek: DomainTask[] = []
  const later: DomainTask[] = []

  tasks.forEach((task) => {
    // Skip completed tasks
    if (task.status === 2) return
    
    const deadline = getDeadlineDate(task)
    if (!deadline) {
      // No deadline → show in "later"
      later.push(task)
      return
    }
    
    const deadlineStr = deadline.split('T')[0]
    
    if (deadlineStr < today) {
      overdue.push(task)
    } else if (deadlineStr === today) {
      todayTasks.push(task)
    } else if (deadlineStr <= weekLaterStr) {
      thisWeek.push(task)
    } else {
      later.push(task)
    }
  })

  return { overdue, today: todayTasks, thisWeek, later }
}
