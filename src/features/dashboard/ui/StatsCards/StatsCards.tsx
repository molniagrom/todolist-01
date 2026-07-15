import { FC } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from './StatsCards.module.css'

type Props = {
  total: number
  active: number
  completed: number
}

export const StatsCards: FC<Props> = ({ total, active, completed }) => {
  return (
    <Box className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Всего задач
          </Typography>
          <Typography variant="h3" color="primary">
            {total}
          </Typography>
        </CardContent>
      </Card>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Активные
          </Typography>
          <Typography variant="h3" color="warning.main">
            {active}
          </Typography>
        </CardContent>
      </Card>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Завершённые
          </Typography>
          <Typography variant="h3" color="success.main">
            {completed}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}