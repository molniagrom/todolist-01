import { useGetProjectsQuery } from "../../api/projectsApi"
import { useGetColumnsQuery } from "../../api/kanbanColumnsApi"
import { useGetTasksQuery } from "../../api/kanbanTasksApi"

export const useBoardData = (projectId: string) => {
  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery()
  const { data: columns = [], isLoading: columnsLoading } = useGetColumnsQuery(projectId)
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasksQuery({ projectId })

  const project = projects?.find((p) => p.id === projectId)
  const isLoading = projectsLoading || columnsLoading || tasksLoading

  return { project, columns, tasks, isLoading }
}
