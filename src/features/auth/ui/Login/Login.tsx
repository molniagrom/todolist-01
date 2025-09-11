import { selectThemeMode } from "@/app/app-slice"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import * as z from "zod"

export const loginScheme = z.object({
  password: z.string().min(3, "Min value for password 3 symbol"),
  email: z.email("incorrect password"),
  rememberMe: z.boolean().optional(),
})

type LoginInputs = z.infer<typeof loginScheme>

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false }
  })

  const theme = getTheme(themeMode)
  const onSubmit: SubmitHandler<LoginInputs> = data => {
    console.log(data)
    reset()
  }
  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              label="Email"
              error={!!errors.email}
              margin="normal"
              {...register("email", {
                required: { value: true, message: "inputs is required" },
                pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Email is not valid" }
              })} />

            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}

            <TextField
              error={!!errors.password}
              type="password"
              label="Password"
              margin="normal"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Minimum password length is 8 characters"
                }
              })} />

            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onChange={(e) => field.onChange(e.target.checked)}
                      checked={field.value} />
                  )} />
              } />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>

      </FormControl>
    </Grid>
  )
}