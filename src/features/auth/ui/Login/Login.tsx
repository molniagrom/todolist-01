import Grid from "@mui/material/Grid"
import { useState } from "react"
import { Captcha } from "@/features/captcha/Captcha"
import { useGetCaptchaQuery } from "@/features/captcha/captchaApi"
import { MyFormControl } from "@/common/components/Form/Form.tsx"
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginInputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums"
import { setIsLoggedInAC } from "@/app/app-slice"
import { AUTH_TOKEN } from "@/common/constants"
import { useAppDispatch } from "@/common/hooks"

export const Login = () => {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const { data: captchaData, refetch } = useGetCaptchaQuery(undefined, { skip: !showCaptcha })

  const dispatch = useAppDispatch()

  const [loginMutation] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors }
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" }
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginMutation(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        reset()
      } else if (res.data?.resultCode === ResultCode.CaptchaError) {
        setShowCaptcha(true)
        refetch()
      } else if (res.data?.messages.length) {
        setError("email", { type: "server", message: res.data.messages[0] });
        setError("password", { type: "server", message: res.data.messages[0] });
      }
    })
  }

  const onRefreshCaptcha = () => {
    refetch()
  }

  return (
    <Grid container justifyContent={"center"}>
      <MyFormControl register={register} errors={errors} onSubmit={onSubmit} handleSubmit={handleSubmit} control={control}>
        {showCaptcha && (
          <Captcha
            captchaUrl={captchaData?.url || null}
            register={register}
            onRefresh={onRefreshCaptcha}
            error={errors.captcha?.message}
          />
        )}
      </MyFormControl>
    </Grid>
  )
}
