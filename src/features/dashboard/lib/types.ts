export interface WeekDay {
  dateString: string
  dayName: string
  dayNumber: number
  isToday: boolean
  taskCount: number
  loadLevel: LoadLevel
}

export type LoadLevel = 'none' | 'low' | 'medium' | 'high'

export type TaskType = 'scheduled' | 'general'