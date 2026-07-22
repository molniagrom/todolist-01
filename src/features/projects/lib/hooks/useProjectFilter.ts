import { useState, useMemo } from "react"
import type { ProjectWithStats } from "../types"

export const useProjectFilter = (projects: ProjectWithStats[]) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesColor = selectedColor === null || project.color === selectedColor
      return matchesSearch && matchesColor
    })
  }, [projects, searchQuery, selectedColor])

  return {
    searchQuery,
    setSearchQuery,
    selectedColor,
    setSelectedColor,
    filteredProjects,
  }
}
