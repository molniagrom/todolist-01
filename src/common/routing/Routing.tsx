import { selectIsLoggedIn } from "@/app/app-slice"
import { Main } from "@/app/Main"
import { PageNotFound, ProtectedRoute } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { DashboardPage } from "@/features/dashboard"
import { FaqPage } from "@/features/faq/FaqPage"
import { CalendarPage } from "@/features/calendar"
import { ProjectsPage } from "@/features/projects"
import { ProfilePage } from "@/features/profile"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "login",
  Faq: "faq",
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
        <Route path={Path.Faq} element={<FaqPage />} />
        <Route path={Path.Dashboard} element={<DashboardPage />} />
        <Route path={Path.Projects} element={<ProjectsPage />} />
        <Route path={Path.Calendar} element={<CalendarPage />} />
        <Route path={Path.Profile} element={<ProfilePage />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
