import { z } from "zod/v4"

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  color: z.string(),
  deadline: z.string().nullable(),
  createdAt: z.string(),
  order: z.int(),
  todolistIds: z.array(z.string()),
})

export type Project = z.infer<typeof projectSchema>

export type CreateProjectPayload = {
  title: string
  description?: string
  color: string
  deadline?: string
}

export type UpdateProjectPayload = {
  id: string
  title?: string
  description?: string
  color?: string
  deadline?: string
  order?: number
}
