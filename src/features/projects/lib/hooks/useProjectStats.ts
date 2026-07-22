import { useMemo } from "react"

type ProjectStats = {
  progress: number
  completed: number
  total: number
}

export const useProjectStats = (completedTasks: number, totalTasks: number): ProjectStats => {
  return useMemo(() => {
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    return { progress, completed: completedTasks, total: totalTasks }
  }, [completedTasks, totalTasks])
}
