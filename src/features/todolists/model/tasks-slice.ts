import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, type UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { changeStatusAC } from "@/app/app-slice.ts"

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    selectors: {
      selectTasks: (state) => state
    },
    extraReducers: (builder) => {
      builder
        .addCase(createTodolistTC.fulfilled, (state, action) => {
          state[action.payload.todolist.id] = []
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action) => {
          delete state[action.payload.id]
        })
    },
    reducers: (create) => ({
      deleteTaskTC: create.asyncThunk(
        async (args: { todolistId: string; taskId: string }, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: 'loading' }))
            await tasksApi.deleteTask(args)
            dispatch(changeStatusAC({ status: "succeeded" }))
            return args
          } catch (error) {
            dispatch(changeStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          }
        }
      ),

      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, { rejectWithValue }) => {
          try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          }
        }
      ),
      createTaskTC: create.asyncThunk(
        async (args: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }))
            const res = await tasksApi.createTask(args)
            dispatch(changeStatusAC({ status: "succeeded" }))
            return res.data.data.item
          } catch (error) {
            dispatch(changeStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            // const newTask: DomainTask = {
            //   title: action.payload.title,
            //   status: TaskStatus.New,
            //   id: action.payload.id,
            //   description: "",
            //   priority: TaskPriority.Low,
            //   startDate: "",
            //   deadline: "",
            //   todoListId: action.payload.todoListId,
            //   order: 0,
            //   addedDate: "",
            // }
            state[action.payload.todoListId].unshift(action.payload)
          }
        }
      ),

      // ---------------------------------------------------------------------------------

      updateTaskTC: create.asyncThunk(
        async (
          payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
          { dispatch, getState, rejectWithValue }
        ) => {
          try {
            const state = getState() as { tasks: TasksState }
            const task = state.tasks[payload.todolistId].find(t => t.id === payload.taskId)

            if (!task) {
              return rejectWithValue(null)
            }

            const model: UpdateTaskModel = {
              description: task.description,
              title: task.title,
              status: task.status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline,
              ...payload.domainModel
            }
            dispatch(changeStatusAC({ status: 'loading' }))
            const res = await tasksApi.updateTask({
              taskId: payload.taskId,
              todolistId: payload.todolistId,
              model
            })
            dispatch(changeStatusAC({ status: 'succeeded' }))
            return res.data.data.item
          } catch (error) {
            dispatch(changeStatusAC({ status: 'failed' }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const task = state[action.payload.todoListId].find((task) => task.id === action.payload.id)
            if (task) {
              Object.assign(task, action.payload)
            }
          }
        }
      ),

      // ---------------------------------------------------------------------------------

      changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
        const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.title
        }
      })
    })
  }
)

export const { selectTasks } = tasksSlice.selectors
export const {
  changeTaskTitleAC,
  fetchTasksTC,
  createTaskTC,
  deleteTaskTC,
  updateTaskTC
} =
  tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, DomainTask[]>
