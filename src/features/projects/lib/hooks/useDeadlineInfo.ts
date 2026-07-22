import { useMemo } from "react"

type DeadlineInfo = {
  formattedDate: string | null
  color: string
  daysLeft: number | null
}

export const useDeadlineInfo = (deadline: string | null): DeadlineInfo => {
  return useMemo(() => {
    if (!deadline) {
      return { formattedDate: null, color: "text.secondary", daysLeft: null }
    }

    const date = new Date(deadline)
    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })

    const now = new Date()
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let color = "success.main"
    if (daysLeft < 0) color = "error.main"
    else if (daysLeft <= 3) color = "warning.main"

    return { formattedDate, color, daysLeft }
  }, [deadline])
}
