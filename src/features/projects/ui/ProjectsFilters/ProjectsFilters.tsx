import { FC } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import { ColorPicker } from "../ColorPicker/ColorPicker"
import styles from "./ProjectsFilters.module.css"

type Props = {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedColor: string | null
  onColorSelect: (color: string | null) => void
}

export const ProjectsFilters: FC<Props> = ({ searchQuery, onSearchChange, selectedColor, onColorSelect }) => {
  return (
    <Box className={styles.filters}>
      <TextField
        placeholder="Поиск проектов..."
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <ColorPicker selectedColor={selectedColor} onColorSelect={onColorSelect} />
    </Box>
  )
}
