import { TaskPriority } from '@/common/enums/enums'
import { LoadLevel } from './types'

export const priorityLabels: Record<number, string> = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Middle]: 'Средний',
  [TaskPriority.Hi]: 'Высокий',
  [TaskPriority.Urgently]: 'Срочный',
  [TaskPriority.Later]: 'Позже',
}

export const priorityColors: Record<number, string> = {
  [TaskPriority.Low]: '#4caf50',
  [TaskPriority.Middle]: '#ff9800',
  [TaskPriority.Hi]: '#f44336',
  [TaskPriority.Urgently]: '#9c27b0',
  [TaskPriority.Later]: '#2196f3',
}

export const loadColors: Record<LoadLevel, string> = {
  none: 'transparent',
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
}