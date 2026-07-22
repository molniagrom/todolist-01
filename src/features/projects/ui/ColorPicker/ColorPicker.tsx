import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { PROJECT_COLORS } from "../../lib/constants"
import styles from "./ColorPicker.module.css"

type Props = {
  selectedColor: string | null
  onColorSelect: (color: string | null) => void
}

export const ColorPicker: FC<Props> = ({ selectedColor, onColorSelect }) => {
  return (
    <Box className={styles.container}>
      <Typography variant="body2" color="text.secondary">
        Цвет:
      </Typography>
      <Box className={styles.colors}>
        <Box
          onClick={() => onColorSelect(null)}
          className={`${styles.colorCircle} ${styles.allColors} ${selectedColor === null ? styles.selected : ""}`}
        />
        {PROJECT_COLORS.map((color) => (
          <Box
            key={color}
            onClick={() => onColorSelect(color)}
            className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ""}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </Box>
    </Box>
  )
}
