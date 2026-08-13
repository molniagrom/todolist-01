import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ProfileStats as ProfileStatsType } from '../lib/useProfileStats'
import styles from './ProfilePage.module.css'

type Props = {
  stats: ProfileStatsType
}

const statItems = [
  { key: 'total' as const, label: 'Всего задач', colorClass: '' },
  { key: 'completed' as const, label: 'Выполнено', colorClass: 'completed' },
  { key: 'inProgress' as const, label: 'В работе', colorClass: '' },
  { key: 'overdue' as const, label: 'Просрочено', colorClass: 'overdue' },
]

export const ProfileStats: FC<Props> = ({ stats }) => {
  return (
    <Box className={styles.statsGrid}>
      {statItems.map((item) => (
        <Box key={item.key} className={`${styles.statCard} ${item.colorClass ? styles[item.colorClass] : ''}`}>
          <Typography className={styles.statValue}>{stats[item.key]}</Typography>
          <Typography className={styles.statLabel}>{item.label}</Typography>
        </Box>
      ))}
    </Box>
  )
}
