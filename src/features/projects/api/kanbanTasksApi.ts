import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CreateKanbanTaskPayload, KanbanTask, UpdateKanbanTaskPayload } from "./kanbanTasksApi.types"

const STORAGE_KEY = "kanbanTasks"

const getTasksFromStorage = (): KanbanTask[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveTasksToStorage = (tasks: KanbanTask[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const kanbanTasksApi = createApi({
  reducerPath: "kanbanTasksApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["KanbanTask"],
  endpoints: (build) => ({
    getTasks: build.query<KanbanTask[], { projectId: string; columnId?: string }>({
      queryFn: ({ projectId, columnId }) => {
        let tasks = getTasksFromStorage().filter((t) => t.projectId === projectId)
        if (columnId) {
          tasks = tasks.filter((t) => t.columnId === columnId)
        }
        return { data: tasks.sort((a, b) => a.order - b.order) }
      },
      providesTags: ["KanbanTask"],
    }),
    createTask: build.mutation<{ item: KanbanTask }, CreateKanbanTaskPayload>({
      queryFn: (payload) => {
        const tasks = getTasksFromStorage()
        const maxOrder = tasks
          .filter((t) => t.columnId === payload.columnId)
          .reduce((max, t) => Math.max(max, t.order), -1)

        const newTask: KanbanTask = {
          id: crypto.randomUUID(),
          projectId: payload.projectId,
          columnId: payload.columnId,
          title: payload.title,
          order: maxOrder + 1,
          showInDashboard: payload.showInDashboard,
          assignee: payload.assignee,
          type: payload.type,
        }
        tasks.push(newTask)
        saveTasksToStorage(tasks)
        return { data: { item: newTask } }
      },
      invalidatesTags: ["KanbanTask"],
    }),
    updateTask: build.mutation<void, UpdateKanbanTaskPayload>({
      queryFn: ({ id, ...payload }) => {
        const tasks = getTasksFromStorage()
        const index = tasks.findIndex((t) => t.id === id)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...payload }
          saveTasksToStorage(tasks)
        }
        return { data: undefined }
      },
      invalidatesTags: ["KanbanTask"],
    }),
    deleteTask: build.mutation<void, string>({
      queryFn: (id) => {
        const tasks = getTasksFromStorage()
        saveTasksToStorage(tasks.filter((t) => t.id !== id))
        return { data: undefined }
      },
      invalidatesTags: ["KanbanTask"],
    }),
    reorderTasks: build.mutation<void, { columnId: string; taskIds: string[] }>({
      queryFn: ({ columnId, taskIds }) => {
        const allTasks = getTasksFromStorage()
        const otherTasks = allTasks.filter((t) => t.columnId !== columnId)
        const columnTasks = taskIds.map((id, index) => {
          const task = allTasks.find((t) => t.id === id)
          return task ? { ...task, order: index, columnId } : null
        }).filter(Boolean) as KanbanTask[]
        saveTasksToStorage([...otherTasks, ...columnTasks])
        return { data: undefined }
      },
      invalidatesTags: ["KanbanTask"],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useReorderTasksMutation,
} = kanbanTasksApi
