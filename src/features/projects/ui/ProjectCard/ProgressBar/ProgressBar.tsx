import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import styles from "./ProgressBar.module.css"

type Props = {
  progress: number
  completed: number
  total: number
  color: string
}

export const ProgressBar: FC<Props> = ({ progress, completed, total, color }) => {
  return (
    <>
      <Box className={styles.bar}>
        <Box className={styles.fill} style={{ width: `${progress}%`, backgroundColor: color }} />
      </Box>
      <Typography variant="caption" color="text.secondary" className={styles.stats}>
        {completed}/{total} задач ({progress}%)
      </Typography>
    </>
  )
}
