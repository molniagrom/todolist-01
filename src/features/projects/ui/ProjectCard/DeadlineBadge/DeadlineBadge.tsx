import { FC } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { useDeadlineInfo } from "../../../lib/hooks/useDeadlineInfo"
import styles from "./DeadlineBadge.module.css"

type Props = {
  deadline: string | null
}

export const DeadlineBadge: FC<Props> = ({ deadline }) => {
  const { formattedDate, color } = useDeadlineInfo(deadline)

  if (!formattedDate) return null

  return (
    <Box className={styles.deadline}>
      <CalendarTodayIcon className={styles.icon} sx={{ color }} />
      <Typography variant="caption" sx={{ color }}>
        {formattedDate}
      </Typography>
    </Box>
  )
}
