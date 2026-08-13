import { FC, useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import styles from './ProfilePage.module.css'

type Props = {
  email: string
  displayName: string
  bio: string
  onDisplayNameChange: (value: string) => void
  onBioChange: (value: string) => void
}

export const ProfileSettings: FC<Props> = ({
  email,
  displayName,
  bio,
  onDisplayNameChange,
  onBioChange,
}) => {
  const [draftName, setDraftName] = useState(displayName)
  const [draftBio, setDraftBio] = useState(bio)
  const [saved, setSaved] = useState(false)

  const isDirty = draftName !== displayName || draftBio !== bio

  const handleSave = useCallback(() => {
    onDisplayNameChange(draftName)
    onBioChange(draftBio)
    setSaved(true)
  }, [draftName, draftBio, onDisplayNameChange, onBioChange])

  const handleCancel = useCallback(() => {
    setDraftName(displayName)
    setDraftBio(bio)
    setSaved(false)
  }, [displayName, bio])

  return (
    <Box className={styles.section}>
      <Typography className={styles.sectionTitle}>Настройки профиля</Typography>

      <Box className={styles.form}>
        <Box className={styles.formRow}>
          <TextField
            fullWidth
            label="Отображаемое имя"
            value={draftName}
            onChange={(e) => { setDraftName(e.target.value); setSaved(false) }}
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            variant="outlined"
            size="small"
          />
        </Box>

        <TextField
          fullWidth
          label="О себе"
          value={draftBio}
          onChange={(e) => { setDraftBio(e.target.value); setSaved(false) }}
          variant="outlined"
          size="small"
          multiline
          rows={3}
          placeholder="Расскажите о себе..."
        />

        {saved && <Alert severity="success">Настройки сохранены</Alert>}

        <Box className={styles.formActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!isDirty}
          >
            Сохранить
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={!isDirty}
          >
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
