import { baseApi } from "@/app/baseApi"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { appReducer, appSlice } from "./app-slice.ts"
import { dashboardReducer } from "@/features/dashboard/api/dashboard-slice"
import { projectsApi } from "@/features/projects/api/projectsApi"
import { kanbanColumnsApi } from "@/features/projects/api/kanbanColumnsApi"
import { kanbanTasksApi } from "@/features/projects/api/kanbanTasksApi"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    dashboard: dashboardReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [kanbanColumnsApi.reducerPath]: kanbanColumnsApi.reducer,
    [kanbanTasksApi.reducerPath]: kanbanTasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      projectsApi.middleware,
      kanbanColumnsApi.middleware,
      kanbanTasksApi.middleware,
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
