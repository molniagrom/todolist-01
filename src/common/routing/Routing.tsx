import { selectIsLoggedIn } from "@/app/app-slice"
import { Main } from "@/app/Main"
import { PageNotFound, ProtectedRoute } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { StubPage } from "@/features/pages/StubPage"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "login",
  Dashboard: "dashboard",
  Projects: "projects",
  Calendar: "calendar",
  Profile: "profile",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route
          path={Path.Dashboard}
          element={<StubPage title="Dashboard" subtitle="Краткий обзор ваших задач и прогресса." />}
        />
        <Route
          path={Path.Projects}
          element={<StubPage title="Projects" subtitle="Раздел для работы с отдельными проектами и списками." />}
        />
        <Route
          path={Path.Calendar}
          element={<StubPage title="Calendar" subtitle="Планирование задач по дням и срокам выполнения." />}
        />
        <Route
          path={Path.Profile}
          element={<StubPage title="Profile" subtitle="Личная страница с настройками аккаунта и предпочтениями." />}
        />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
