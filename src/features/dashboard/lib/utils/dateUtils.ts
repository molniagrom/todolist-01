export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return d
}

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', { weekday: 'short' })
}

export const navigateWeek = (weekStart: string, direction: 'forward' | 'backward'): string => {
  const date = parseDate(weekStart)
  const days = direction === 'forward' ? 7 : -7
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

export const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2
}

export const isToday = (dateString: string): boolean => {
  return dateString === formatDate(new Date())
}