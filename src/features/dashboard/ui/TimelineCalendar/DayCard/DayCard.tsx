import { FC } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { WeekDay } from '@/features/dashboard/lib/types'
import { loadColors } from '@/features/dashboard/lib/constants'
import styles from './DayCard.module.css'

type Props = {
  day: WeekDay
  isSelected: boolean
  onClick: () => void
}

export const DayCard: FC<Props> = ({ day, isSelected, onClick }) => {
  const theme = useTheme()

  return (
    <ButtonBase
      className={`${styles.dayCard} ${day.isToday ? styles.today : ''}`}
      onClick={onClick}
      sx={{
        backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
        color: isSelected ? theme.palette.primary.contrastText : 'inherit',
        '&:hover': {
          backgroundColor: isSelected
            ? theme.palette.primary.main
            : 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Typography
        variant="caption"
        className={styles.dayName}
        sx={{ color: isSelected ? theme.palette.primary.contrastText : 'inherit' }}
      >
        {day.dayName}
      </Typography>
      <Typography
        variant="h6"
        className={styles.dayNumber}
        sx={{ color: isSelected ? theme.palette.primary.contrastText : 'inherit' }}
      >
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