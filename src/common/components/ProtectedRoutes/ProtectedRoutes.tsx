import { Navigate, Outlet } from "react-router"
import { Path } from "@/common/routing"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoutes = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return <>{children ? children : <Outlet/>}</>
}
