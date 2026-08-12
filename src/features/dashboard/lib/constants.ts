import { TaskPriority } from '@/common/enums/enums'
import { designTokens } from '@/common/theme'
import { LoadLevel } from './types'

export const priorityLabels: Record<number, string> = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Middle]: 'Средний',
  [TaskPriority.Hi]: 'Высокий',
  [TaskPriority.Urgently]: 'Срочный',
  [TaskPriority.Later]: 'Позже',
}

export const priorityColors: Record<number, string> = {
  [TaskPriority.Low]: designTokens.colors.status.successMaterial,
  [TaskPriority.Middle]: designTokens.colors.status.warning,
  [TaskPriority.Hi]: designTokens.colors.status.error,
  [TaskPriority.Urgently]: designTokens.colors.status.urgent,
  [TaskPriority.Later]: designTokens.colors.status.info,
}

export const loadColors: Record<LoadLevel, string> = {
  none: 'transparent',
  low: designTokens.colors.status.successMaterial,
  medium: designTokens.colors.status.warning,
  high: designTokens.colors.status.error,
}
