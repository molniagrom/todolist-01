import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import styles from "@/features/auth/ui/Login/Login.module.css"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Controller, type SubmitHandler, UseFormHandleSubmit, UseFormRegister, Control } from "react-hook-form"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import { LoginInputs } from "@/features/auth/lib/schemas"
import { selectThemeMode } from "@/app/app-slice.ts"
import { getTheme } from "@/common/theme"
import { useAppSelector } from "@/common/hooks"
import React, { ReactNode } from "react"
import { FieldErrors } from "react-hook-form"

type MyFormControlProps = {
  children: ReactNode
  register: UseFormRegister<LoginInputs>
  errors: FieldErrors<LoginInputs>
  onSubmit: SubmitHandler<LoginInputs>
  handleSubmit: UseFormHandleSubmit<LoginInputs>
  control: Control<LoginInputs>
}

export const MyFormControl: React.FC<MyFormControlProps> = ({ children, register, errors, onSubmit, handleSubmit, control }) => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

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
        <FormGroup>
          <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
          <TextField
            type="password"
            label="Password"
            margin="normal"
            error={!!errors.password}
            {...register("password")}
          />
          {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
          <FormControlLabel
            label={"Remember me"}
            control={
              <Controller
                name={"rememberMe"}
                control={control}
                render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
              />
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {children}
        </FormGroup>
      </FormControl>
    </form>
  )
}

