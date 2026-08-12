import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { MonthDay } from '../../../../lib/utils/monthGridUtils'
import styles from './DayCell.module.css'

type Props = {
  day: MonthDay
  isSelected: boolean
  taskCount: number
  onClick: () => void
}

export const DayCell: FC<Props> = ({ day, isSelected, taskCount, onClick }) => {
  const cellClass = `${styles.cell} ${isSelected ? styles.selected : day.isToday ? styles.today : ''}`
  const numberClass = `${styles.dayNumber} ${isSelected ? styles.selected : day.isToday ? styles.today : !day.isCurrentMonth ? styles.outside : ''}`

  return (
    <Box onClick={onClick} className={cellClass}>
      <Typography variant="body2" className={numberClass}>
        {day.dayNumber}
      </Typography>
      {taskCount > 0 && (
        <Box className={styles.indicators}>
          {Array.from({ length: Math.min(taskCount, 4) }).map((_, i) => (
            <Box key={i} className={`${styles.dot} ${isSelected ? styles.selected : ''}`} />
          ))}
          {taskCount > 4 && (
            <Typography variant="caption" className={`${styles.count} ${numberClass}`}>
              +{taskCount - 4}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
