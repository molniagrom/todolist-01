import { FC } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { WeekDay } from '@/features/dashboard/lib/types'
import styles from './DayCard.module.css'

type Props = {
  day: WeekDay
  isSelected: boolean
  onClick: () => void
}

const loadColors = {
  none: 'transparent',
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
}

export const DayCard: FC<Props> = ({ day, isSelected, onClick }) => {
  return (
    <ButtonBase
      className={`${styles.dayCard} ${isSelected ? styles.selected : ''} ${day.isToday ? styles.today : ''}`}
      onClick={onClick}
    >
      <Typography variant="caption" className={styles.dayName}>
        {day.dayName}
      </Typography>
      <Typography variant="h6" className={styles.dayNumber}>
        {day.dayNumber}
      </Typography>
      {day.loadLevel !== 'none' && (
        <Box
          className={styles.indicator}
          sx={{ bgcolor: loadColors[day.loadLevel] }}
        />
      )}
    </ButtonBase>
  )
}