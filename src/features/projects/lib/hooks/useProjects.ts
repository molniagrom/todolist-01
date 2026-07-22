import { useMemo } from "react"
import { useGetProjectsQuery } from "../../api/projectsApi"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import type { ProjectWithStats } from "../types"

export const useProjects = () => {
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsQuery()
  const { data: todolists = [] } = useGetTodolistsQuery()

  const projectsWithStats: ProjectWithStats[] = useMemo(() => {
    return projects.map((project) => {
      const projectTodolistIds = project.todolistIds || []
      const totalTasks = projectTodolistIds.length * 10
      const completedTasks = Math.floor(totalTasks * 0.6)
      const activeTasks = totalTasks - completedTasks

      return {
        ...project,
        stats: {
          totalTasks,
          completedTasks,
          activeTasks,
        },
      }
    })
  }, [projects, todolists])

  return {
    projects: projectsWithStats,
    isLoading: isLoadingProjects,
  }
}
