import { Main } from "@/app/Main"
import { PageNotFound } from "@/common/components"
import { Route, Routes } from "react-router"
import { Faq } from "@/common/components/Faq/Faq.tsx"
import { ProtectedRoutes } from "@/common/components/ProtectedRoutes/ProtectedRoutes.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/authSlice.ts"
import { Login } from "@/features/auth/ui/Login/Login"

export const Path = {
  Main: "/",
  Login: "login",
  Faq: "/faq",
} as const

export const Routing = () => {
  const IsLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      {/*when haven't logged in */}
      <Route element={<ProtectedRoutes isAllowed={IsLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>

      {/*when have log in */}
      <Route element={<ProtectedRoutes redirectPath={Path.Main} isAllowed={!IsLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  )
}
