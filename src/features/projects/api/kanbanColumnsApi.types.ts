import { z } from "zod/v4"

export const kanbanColumnSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  order: z.int(),
})

export type KanbanColumn = z.infer<typeof kanbanColumnSchema>

export type CreateColumnPayload = {
  projectId: string
  title: string
}

export type UpdateColumnPayload = {
  id: string
  title?: string
  order?: number
}
