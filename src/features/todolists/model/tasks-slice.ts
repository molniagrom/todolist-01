import { clearDataAC } from "@/common/actions"
import { createAppSlice } from "@/common/utils"
import { type DomainTask } from "@/features/todolists/api/tasksApi.types"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearDataAC, () => {
        return {}
      })
  },
  reducers: (create) => ({
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, DomainTask[]>
