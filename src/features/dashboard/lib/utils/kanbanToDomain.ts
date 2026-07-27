import { TaskStatus, TaskPriority } from '@/common/enums/enums'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import type { KanbanTask } from '@/features/projects/api/kanbanTasksApi.types'

export const kanbanTaskToDomainTask = (task: KanbanTask): DomainTask => ({
  id: task.id,
  title: task.title,
  description: task.description ?? null,
  status: TaskStatus.New,
  priority: TaskPriority.Middle,
  startDate: null,
  deadline: null,
  addedDate: new Date().toISOString(),
  todoListId: 'kanban',
  order: task.order,
})
