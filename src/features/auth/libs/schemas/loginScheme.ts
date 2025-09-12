import * as z from "zod"

export const loginScheme = z.object({
  password: z.string().min(3, "Min value for password 3 symbol"),
  email: z.email("incorrect password"),
  rememberMe: z.boolean().optional()
})