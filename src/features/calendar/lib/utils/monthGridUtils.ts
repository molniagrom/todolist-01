import { formatDate, isToday } from '@/features/dashboard/lib/utils/dateUtils'

export interface MonthDay {
  dateString: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
}

export const getMonthGrid = (year: number, month: number): MonthDay[][] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Monday = 0, Sunday = 6 (Russian locale)
  let startDayOfWeek = firstDay.getDay() - 1
  if (startDayOfWeek < 0) startDayOfWeek = 6
  
  const grid: MonthDay[][] = []
  let currentRow: MonthDay[] = []
  
  // Fill days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = new Date(year, month - 1, day)
    const dateString = formatDate(date)
    currentRow.push({
      dateString,
      dayNumber: day,
      isCurrentMonth: false,
      isToday: isToday(dateString),
    })
  }
  
  // Fill days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const dateString = formatDate(date)
    currentRow.push({
      dateString,
      dayNumber: day,
      isCurrentMonth: true,
      isToday: isToday(dateString),
    })
    if (currentRow.length === 7) {
      grid.push(currentRow)
      currentRow = []
    }
  }
  
  // Fill days from next month
  if (currentRow.length > 0) {
    let day = 1
    while (currentRow.length < 7) {
      const date = new Date(year, month + 1, day)
      const dateString = formatDate(date)
      currentRow.push({
        dateString,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: isToday(dateString),
      })
      day++
    }
    grid.push(currentRow)
  }
  
  // Ensure we always have 6 rows for consistent layout
  while (grid.length < 6) {
    const lastRow = grid[grid.length - 1]
    const lastDate = lastRow[lastRow.length - 1].dateString
    const date = new Date(lastDate)
    const row: MonthDay[] = []
    for (let i = 1; i <= 7; i++) {
      date.setDate(date.getDate() + 1)
      const dateString = formatDate(date)
      row.push({
        dateString,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
        isToday: isToday(dateString),
      })
    }
    grid.push(row)
  }
  
  return grid
}

export const getMonthName = (month: number): string => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ]
  return months[month]
}
