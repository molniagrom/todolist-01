import * as z from "zod"

export const User = z.object({
  name: z.string(),
  age: z.int().positive().max(120),
  addedDate: z.iso.datetime({ local: true }),
})

// type UserType = z.infer<typeof User>

console.log(User.parse({ name: "billie", age: 100, addedDate: "2025-09-11T11:31:37.287" }))

// const a: UserType = {
//   name: "cxc"
// }