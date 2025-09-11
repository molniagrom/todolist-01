import * as z from "zod"

export const User = z.object({
  name: z.string(),
  age: z.int().positive().max(120),
  email: z.email("incorrect password"),
  isMarried: z.boolean(),
})

// type UserType = z.infer<typeof User>

console.log(User.parse({ name: "billie", age: 100, email: "billie@gmail.com", isMarried: true}))

// const a: UserType = {
//   name: "cxc"
// }