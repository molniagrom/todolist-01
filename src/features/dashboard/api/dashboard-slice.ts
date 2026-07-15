import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { formatDate, getWeekStart } from '../lib/utils/dateUtils'

interface DashboardState {
  selectedDate: string
  currentWeekStart: string
}

const initialState: DashboardState = {
  selectedDate: formatDate(new Date()),
  currentWeekStart: formatDate(getWeekStart(new Date())),
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
    navigateWeek: (state, action: PayloadAction<'forward' | 'backward'>) => {
      const date = new Date(state.currentWeekStart)
      const days = action.payload === 'forward' ? 7 : -7
      date.setDate(date.getDate() + days)
      state.currentWeekStart = formatDate(date)
    },
  },
})

export const { setSelectedDate, navigateWeek } = dashboardSlice.actions

export const selectSelectedDate = (state: RootState) => state.dashboard.selectedDate
export const selectCurrentWeekStart = (state: RootState) => state.dashboard.currentWeekStart

export const dashboardReducer = dashboardSlice.reducer