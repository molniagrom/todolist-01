import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { NotFound } from "@/common/components/NotFound/NotFound.tsx"


export const Path = {
  Main: '/',
  NotFound: '/*',
  Login: 'login',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<NotFound />} />

    </Routes>
  )
}