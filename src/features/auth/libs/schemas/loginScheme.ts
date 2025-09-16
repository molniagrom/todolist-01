import * as z from "zod"

export const loginScheme = z.object({
  password: z.string().min(3, "Password must be at least 3 characters long"),
  email: z.email("incorrect password"),
  rememberMe: z.boolean().optional()
})