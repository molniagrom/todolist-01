// export type todolist = {
//   id: string
//   title: string
//   addedDate: string
//   order: number
// }

import z from "zod"

export const todolist = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})

export const deleteTodolist = z.object({
  resultCode: z.literal(0),
})
export const zodPayload = z.object({
  id: z.string(),
  title: z.string(),
})
