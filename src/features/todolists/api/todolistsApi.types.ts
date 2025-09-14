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
