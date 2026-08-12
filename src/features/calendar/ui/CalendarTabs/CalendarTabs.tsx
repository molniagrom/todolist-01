import { FC } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import ListAltIcon from '@mui/icons-material/ListAlt'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import DashboardIcon from '@mui/icons-material/Dashboard'
import type { CalendarMode } from '../../lib/hooks/useCalendarState'
import styles from './CalendarTabs.module.css'

const tabs: { value: CalendarMode; label: string; icon: React.ReactNode }[] = [
  { value: 'month', label: 'Месяц', icon: <CalendarMonthIcon fontSize="small" /> },
  { value: 'week', label: 'Неделя', icon: <ViewWeekIcon fontSize="small" /> },
  { value: 'agenda', label: 'Повестка', icon: <ListAltIcon fontSize="small" /> },
  { value: 'deadlines', label: 'Дедлайны', icon: <WarningAmberIcon fontSize="small" /> },
  { value: 'kanban', label: 'Интеграция', icon: <DashboardIcon fontSize="small" /> },
]

type Props = {
  activeMode: CalendarMode
  onChange: (mode: CalendarMode) => void
}

export const CalendarTabs: FC<Props> = ({ activeMode, onChange }) => {
  const currentIndex = tabs.findIndex((t) => t.value === activeMode)

  return (
    <Tabs
      value={currentIndex}
      onChange={(_, index) => onChange(tabs[index].value)}
      variant="scrollable"
      scrollButtons="auto"
      className={styles.tabs}
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} icon={tab.icon} label={tab.label} iconPosition="start" />
      ))}
    </Tabs>
  )
}
