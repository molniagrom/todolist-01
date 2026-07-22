import { useState, useEffect, useCallback } from "react"
import { FOCUS_MODE_KEY } from "../constants"

export const useFocusMode = () => {
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(() => {
    return localStorage.getItem(FOCUS_MODE_KEY)
  })

  const enterFocus = useCallback((projectId: string) => {
    setFocusedProjectId(projectId)
    localStorage.setItem(FOCUS_MODE_KEY, projectId)
  }, [])

  const exitFocus = useCallback(() => {
    setFocusedProjectId(null)
    localStorage.removeItem(FOCUS_MODE_KEY)
  }, [])

  const isFocusActive = focusedProjectId !== null

  return {
    focusedProjectId,
    isFocusActive,
    enterFocus,
    exitFocus,
  }
}
