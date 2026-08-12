import { z } from "zod/v4"

export const kanbanTaskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  order: z.int(),
  showInDashboard: z.boolean(),
  assignee: z.string().optional(),
  type: z.string().optional(),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
  subtasks: z.array(z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
  })).optional(),
  linkedTaskIds: z.array(z.string()).optional(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    size: z.number(),
    dataUrl: z.string().optional(),
  })).optional(),
})

export type KanbanTask = z.infer<typeof kanbanTaskSchema>

export type CreateKanbanTaskPayload = {
  projectId: string
  columnId: string
  title: string
  showInDashboard: boolean
  assignee?: string
  type?: string
}

export type UpdateKanbanTaskPayload = {
  id: string
  columnId?: string
  title?: string
  description?: string
  order?: number
  showInDashboard?: boolean
  assignee?: string
  startDate?: string
  deadline?: string
  subtasks?: KanbanTask["subtasks"]
  linkedTaskIds?: string[]
  attachments?: KanbanTask["attachments"]
}
