import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { classifyByDeadline } from '../../lib/utils/deadlineUtils'
import { DeadlineSection } from './DeadlineSection/DeadlineSection'
import styles from './DeadlinesView.module.css'

type Props = {
  tasks: DomainTask[]
  onToggleTask: (task: DomainTask) => void
  onDeleteTask: (task: DomainTask) => void
  onEditTask: (task: DomainTask) => void
}

export const DeadlinesView: FC<Props> = ({ tasks, onToggleTask, onDeleteTask, onEditTask }) => {
  const groups = useMemo(() => classifyByDeadline(tasks), [tasks])

  const sections = [
    { title: 'Просроченные', tasks: groups.overdue, color: 'error.main' as const },
    { title: 'Сегодня', tasks: groups.today, color: 'warning.main' as const },
    { title: 'На этой неделе', tasks: groups.thisWeek, color: 'info.main' as const },
    { title: 'Позже', tasks: groups.later, color: 'text.secondary' as const },
  ]

  const totalActive = groups.overdue.length + groups.today.length + groups.thisWeek.length + groups.later.length

  return (
    <Box>
      <Typography variant="h6" className={styles.title}>
        Дедлайны
      </Typography>

      {totalActive === 0 ? (
        <Typography color="text.secondary" className={styles.empty}>
          Нет активных задач с дедлайнами
        </Typography>
      ) : (
        sections.map((section) => (
          <DeadlineSection
            key={section.title}
            title={section.title}
            tasks={section.tasks}
            color={section.color}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      )}
    </Box>
  )
}
