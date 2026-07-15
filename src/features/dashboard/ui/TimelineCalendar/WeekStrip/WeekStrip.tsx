import { FC } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTheme } from '@mui/material/styles'
import { WeekDay } from '@/features/dashboard/lib/types'
import { DayCard } from '../DayCard/DayCard'
import styles from './WeekStrip.module.css'

type Props = {
  weekDays: WeekDay[]
  selectedDate: string
  onDayClick: (date: string) => void
  onNavigate: (direction: 'forward' | 'backward') => void
}

export const WeekStrip: FC<Props> = ({ weekDays, selectedDate, onDayClick, onNavigate }) => {
  const theme = useTheme()

  return (
    <Box
      className={styles.container}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <IconButton onClick={() => onNavigate('backward')} className={styles.navButton}>
        <ChevronLeftIcon />
      </IconButton>
      <Box className={styles.daysContainer}>
        {weekDays.map((day) => (
          <DayCard
            key={day.dateString}
            day={day}
            isSelected={day.dateString === selectedDate}
            onClick={() => onDayClick(day.dateString)}
          />
        ))}
      </Box>
      <IconButton onClick={() => onNavigate('forward')} className={styles.navButton}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}