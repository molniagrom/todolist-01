import { designTokens } from "@/common/theme"

export const PROJECT_COLORS = [
  designTokens.colors.status.error,
  designTokens.colors.status.warning,
  designTokens.colors.status.projectYellow,
  designTokens.colors.status.successMaterial,
  designTokens.colors.status.info,
  designTokens.colors.status.urgent,
  designTokens.colors.status.projectPink,
  designTokens.colors.status.projectSlate,
] as const

export const FOCUS_MODE_KEY = 'focus_project_id'
