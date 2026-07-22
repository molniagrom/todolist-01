import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "./projectsApi.types"

const STORAGE_KEY = "projects"

const getProjectsFromStorage = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveProjectsToStorage = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Project"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      queryFn: () => {
        const projects = getProjectsFromStorage()
        return { data: projects }
      },
      providesTags: ["Project"],
    }),
    createProject: build.mutation<{ item: Project }, CreateProjectPayload>({
      queryFn: (payload) => {
        const projects = getProjectsFromStorage()
        const newProject: Project = {
          id: crypto.randomUUID(),
          title: payload.title,
          description: payload.description || null,
          color: payload.color,
          deadline: payload.deadline || null,
          createdAt: new Date().toISOString(),
          order: projects.length,
          todolistIds: [],
        }
        projects.push(newProject)
        saveProjectsToStorage(projects)
        return { data: { item: newProject } }
      },
      invalidatesTags: ["Project"],
    }),
    updateProject: build.mutation<void, UpdateProjectPayload>({
      queryFn: ({ id, ...payload }) => {
        const projects = getProjectsFromStorage()
        const index = projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          projects[index] = { ...projects[index], ...payload }
          saveProjectsToStorage(projects)
        }
        return { data: undefined }
      },
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation<void, string>({
      queryFn: (id) => {
        const projects = getProjectsFromStorage()
        const filtered = projects.filter((p) => p.id !== id)
        saveProjectsToStorage(filtered)
        return { data: undefined }
      },
      invalidatesTags: ["Project"],
    }),
    attachTodolist: build.mutation<void, { projectId: string; todolistId: string }>({
      queryFn: ({ projectId, todolistId }) => {
        const projects = getProjectsFromStorage()
        const project = projects.find((p) => p.id === projectId)
        if (project && !project.todolistIds.includes(todolistId)) {
          project.todolistIds.push(todolistId)
          saveProjectsToStorage(projects)
        }
        return { data: undefined }
      },
      invalidatesTags: ["Project"],
    }),
    detachTodolist: build.mutation<void, { projectId: string; todolistId: string }>({
      queryFn: ({ projectId, todolistId }) => {
        const projects = getProjectsFromStorage()
        const project = projects.find((p) => p.id === projectId)
        if (project) {
          project.todolistIds = project.todolistIds.filter((id) => id !== todolistId)
          saveProjectsToStorage(projects)
        }
        return { data: undefined }
      },
      invalidatesTags: ["Project"],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAttachTodolistMutation,
  useDetachTodolistMutation,
} = projectsApi
