import { baseApi } from "@/app/baseApi"
import type { BaseResponse } from "@/common/types"
import type { LoginInputs } from "@/features/auth/lib/schemas"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (payload) => ({ method: "post", url: "auth/login", body: payload }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({ method: "delete", url: "auth/login" }),
    }),
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => ({ url: "auth/me" }),
    }),
  }),
})

export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi
