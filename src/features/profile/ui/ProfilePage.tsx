import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useMeQuery } from '@/features/auth/api/authApi'
import { useAllTasks } from '@/features/dashboard/lib/hooks/useAllTasks'
import { useProfileStats } from '../lib/useProfileStats'
import { useProfile } from '../lib/useProfile'
import { ProfileHeader } from './ProfileHeader'
import { ProfileStats } from './ProfileStats'
import { ProfileSettings } from './ProfileSettings'
import { ProfileActivity } from './ProfileActivity'
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { data: meData, isLoading: isMeLoading } = useMeQuery()
  const { allTasks, isLoading: isTasksLoading } = useAllTasks()
  const stats = useProfileStats(allTasks)

  const login = meData?.data?.login || 'Пользователь'
  const email = meData?.data?.email || 'user@example.com'
  const { profile, updateAvatar, updateDisplayName, updateBio, removeAvatar } = useProfile(login)

  if (isMeLoading || isTasksLoading) {
    return (
      <Box className={styles.page} sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box className={styles.page}>
      <ProfileHeader
        login={login}
        email={email}
        avatar={profile.avatar}
        onAvatarChange={updateAvatar}
        onAvatarRemove={removeAvatar}
      />
      <ProfileStats stats={stats} />
      <ProfileSettings
        email={email}
        displayName={profile.displayName}
        bio={profile.bio}
        onDisplayNameChange={updateDisplayName}
        onBioChange={updateBio}
      />
      <ProfileActivity />
    </Box>
  )
}
