import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { DomainTodolist } from "../model/todolists-slice"
import { baseApi } from "@/app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolist: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((t) => ({ ...t, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),

    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({ url: "/todo-lists", method: "post", body: { title } }),
      invalidatesTags: ["Todolist"],
    }),

    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({ url: `/todo-lists/${id}`, method: "put", body: { title } }),
      invalidatesTags: ["Todolist"],
    }),

    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({ url: `/todo-lists/${id}`, method: "delete" }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistQuery,
  useCreateTodolistMutation,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
