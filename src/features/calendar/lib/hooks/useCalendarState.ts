import { useState, useCallback } from 'react'
import { formatDate } from '@/features/dashboard/lib/utils/dateUtils'

export type CalendarMode = 'month' | 'week' | 'agenda' | 'deadlines' | 'kanban'

export const useCalendarState = () => {
  const [activeMode, setActiveMode] = useState<CalendarMode>('month')
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()))
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(today)
    monday.setDate(diff)
    return formatDate(monday)
  })

  const navigateMonth = useCallback((direction: 'forward' | 'backward') => {
    setCurrentMonth((prev) => {
      if (direction === 'forward') {
        if (prev === 11) {
          setCurrentYear((y) => y + 1)
          return 0
        }
        return prev + 1
      } else {
        if (prev === 0) {
          setCurrentYear((y) => y - 1)
          return 11
        }
        return prev - 1
      }
    })
  }, [])

  const navigateWeek = useCallback((direction: 'forward' | 'backward') => {
    setCurrentWeekStart((prev) => {
      const date = new Date(prev)
      const days = direction === 'forward' ? 7 : -7
      date.setDate(date.getDate() + days)
      return formatDate(date)
    })
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedDate(formatDate(today))
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(today)
    monday.setDate(diff)
    setCurrentWeekStart(formatDate(monday))
  }, [])

  return {
    activeMode,
    setActiveMode,
    currentMonth,
    currentYear,
    selectedDate,
    setSelectedDate,
    currentWeekStart,
    navigateMonth,
    navigateWeek,
    goToToday,
  }
}
