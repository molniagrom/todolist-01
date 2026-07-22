import type { Project } from "../api/projectsApi.types"

export type ProjectWithStats = Project & {
  stats: {
    totalTasks: number
    completedTasks: number
    activeTasks: number
  }
}
