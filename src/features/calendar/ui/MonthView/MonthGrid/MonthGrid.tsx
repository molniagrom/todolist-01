import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { MonthDay } from '../../../lib/utils/monthGridUtils'
import { DayCell } from './DayCell/DayCell'
import styles from './MonthGrid.module.css'

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

type Props = {
  grid: MonthDay[][]
  selectedDate: string
  taskCountMap: Map<string, number>
  onDateSelect: (date: string) => void
}

export const MonthGrid: FC<Props> = ({ grid, selectedDate, taskCountMap, onDateSelect }) => {
  return (
    <Box>
      <Box className={styles.dayNames}>
        {DAY_NAMES.map((name) => (
          <Typography key={name} variant="caption" align="center" color="text.secondary" className={styles.dayName}>
            {name}
          </Typography>
        ))}
      </Box>
      <Box className={styles.grid}>
        {grid.flat().map((day) => (
          <DayCell
            key={day.dateString}
            day={day}
            isSelected={day.dateString === selectedDate}
            taskCount={taskCountMap.get(day.dateString) || 0}
            onClick={() => onDateSelect(day.dateString)}
          />
        ))}
      </Box>
    </Box>
  )
}
