import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ActivityEntry } from '../lib/activity'
import { formatTime } from '../lib/activity'
import styles from './ProfilePage.module.css'

type Props = {
  item: ActivityEntry
}

export const ActivityItem: FC<Props> = ({ item }) => (
  <Box className={styles.activityItem}>
    <Box className={`${styles.activityDot} ${styles[item.type]}`} />
    <Typography className={styles.activityText}>{item.text}</Typography>
    <Typography className={styles.activityTime}>{formatTime(item.time)}</Typography>
  </Box>
)
