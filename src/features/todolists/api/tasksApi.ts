import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<DomainTask[], string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      transformResponse: (response: { items: DomainTask[] }) => response.items,
      providesTags: (_result, _error, todolistId) => [{
        type: 'Task',
        id: todolistId
      }],
    }),

    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title }
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{
        type: 'Task',
        id: todolistId
      }],
    }),

    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string, taskId: string, model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{
        type: 'Task',
        id: todolistId
      }],
    }),

    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete"
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{
        type: 'Task',
        id: todolistId
      }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
