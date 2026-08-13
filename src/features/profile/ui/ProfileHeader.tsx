import { type FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAvatarUpload } from '../lib/useAvatarUpload'
import { AvatarUploadModal } from './AvatarUploadModal'
import styles from './ProfilePage.module.css'

type Props = {
  login: string
  email: string
  avatar: string
  onAvatarChange: (avatar: string) => void
  onAvatarRemove: () => void
}

const getInitials = (name: string) => {
  const normalized = name.trim()
  if (!normalized) return '?'
  return normalized.slice(0, 2).toUpperCase()
}

export const ProfileHeader: FC<Props> = ({
  login,
  email,
  avatar,
  onAvatarChange,
  onAvatarRemove,
}) => {
  const avatarHook = useAvatarUpload(onAvatarChange)

  return (
    <Box className={styles.header}>
      <Box className={styles.avatarSection}>
        <Box className={styles.avatarWrapper}>
          <Box className={styles.avatarCircle}>
            {avatar ? (
              <img src={avatar} alt={login} className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarFallback}>{getInitials(login)}</span>
            )}
          </Box>

          {avatar && (
            <button
              type="button"
              className={styles.avatarDeleteBtn}
              onClick={onAvatarRemove}
              aria-label="Удалить аватар"
            >
              <DeleteOutlineIcon fontSize="small" />
            </button>
          )}
        </Box>

        <Button
          variant="text"
          className={styles.selectPhotoBtn}
          onClick={avatarHook.openModal}
        >
          {avatar ? 'Сменить фото' : 'Выбрать фото'}
        </Button>
      </Box>

      <Box>
        <Typography className={styles.userName}>{login}</Typography>
        <Typography className={styles.userEmail}>{email}</Typography>
      </Box>

      <AvatarUploadModal hook={avatarHook} />
    </Box>
  )
}
