import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { loadActivity } from '../lib/activity'
import { ActivityItem } from './ActivityItem'
import styles from './ProfilePage.module.css'

export const ProfileActivity: FC = () => {
  const activities = useMemo(() => loadActivity(), [])

  return (
    <Box className={styles.section}>
      <Typography className={styles.sectionTitle}>Последняя активность</Typography>

      {activities.length === 0 ? (
        <Typography className={styles.emptyText}>Активности пока нет</Typography>
      ) : (
        <Box className={styles.activityList}>
          {activities.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  )
}
