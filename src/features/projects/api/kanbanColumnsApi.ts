import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CreateColumnPayload, KanbanColumn, UpdateColumnPayload } from "./kanbanColumnsApi.types"

const STORAGE_KEY = "kanbanColumns"

const getColumnsFromStorage = (): KanbanColumn[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveColumnsToStorage = (columns: KanbanColumn[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
}

const DEFAULT_COLUMNS = ["To do", "In progress", "Done"]

export const kanbanColumnsApi = createApi({
  reducerPath: "kanbanColumnsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["KanbanColumn"],
  endpoints: (build) => ({
    getColumns: build.query<KanbanColumn[], string>({
      queryFn: (projectId) => {
        let columns = getColumnsFromStorage().filter((c) => c.projectId === projectId)

        if (columns.length === 0) {
          columns = DEFAULT_COLUMNS.map((title, index) => ({
            id: crypto.randomUUID(),
            projectId,
            title,
            order: index,
          }))
          const allColumns = getColumnsFromStorage()
          allColumns.push(...columns)
          saveColumnsToStorage(allColumns)
        }

        return { data: columns.sort((a, b) => a.order - b.order) }
      },
      providesTags: ["KanbanColumn"],
    }),
    createColumn: build.mutation<{ item: KanbanColumn }, CreateColumnPayload>({
      queryFn: (payload) => {
        const columns = getColumnsFromStorage()
        const maxOrder = columns
          .filter((c) => c.projectId === payload.projectId)
          .reduce((max, c) => Math.max(max, c.order), -1)

        const newColumn: KanbanColumn = {
          id: crypto.randomUUID(),
          projectId: payload.projectId,
          title: payload.title,
          order: maxOrder + 1,
        }
        columns.push(newColumn)
        saveColumnsToStorage(columns)
        return { data: { item: newColumn } }
      },
      invalidatesTags: ["KanbanColumn"],
    }),
    updateColumn: build.mutation<void, UpdateColumnPayload>({
      queryFn: ({ id, ...payload }) => {
        const columns = getColumnsFromStorage()
        const index = columns.findIndex((c) => c.id === id)
        if (index !== -1) {
          columns[index] = { ...columns[index], ...payload }
          saveColumnsToStorage(columns)
        }
        return { data: undefined }
      },
      invalidatesTags: ["KanbanColumn"],
    }),
    deleteColumn: build.mutation<void, string>({
      queryFn: (id) => {
        const columns = getColumnsFromStorage()
        saveColumnsToStorage(columns.filter((c) => c.id !== id))
        return { data: undefined }
      },
      invalidatesTags: ["KanbanColumn"],
    }),
    reorderColumns: build.mutation<void, { projectId: string; columnIds: string[] }>({
      queryFn: ({ projectId, columnIds }) => {
        const allColumns = getColumnsFromStorage()
        const otherColumns = allColumns.filter((c) => c.projectId !== projectId)
        const projectColumns = columnIds.map((id, index) => {
          const col = allColumns.find((c) => c.id === id)
          return col ? { ...col, order: index } : null
        }).filter(Boolean) as KanbanColumn[]
        saveColumnsToStorage([...otherColumns, ...projectColumns])
        return { data: undefined }
      },
      invalidatesTags: ["KanbanColumn"],
    }),
  }),
})

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useReorderColumnsMutation,
} = kanbanColumnsApi
