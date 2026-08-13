import { type FC } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { useAvatarUpload } from '../lib/useAvatarUpload'
import styles from './AvatarUploadModal.module.css'

type Props = {
  hook: ReturnType<typeof useAvatarUpload>
}

export const AvatarUploadModal: FC<Props> = ({ hook }) => {
  const {
    isOpen,
    step,
    previewUrl,
    zoom,
    isSaving,
    fileInputRef,
    setZoom,
    requestClose,
    handleBack,
    handleSave,
    handleImageLoad,
    triggerFileInput,
    handleFileChange,
  } = hook

  return (
    <Dialog open={isOpen} onClose={requestClose} maxWidth="sm" fullWidth>
      <DialogTitle className={styles.title}>
        {step === 'upload' ? 'Загрузить фото' : 'Обрезать фото'}
        <IconButton onClick={requestClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent className={styles.content}>
        {step === 'upload' && (
          <Box className={styles.uploadStep}>
            <CloudUploadIcon className={styles.uploadIcon} />
            <Typography className={styles.uploadText}>
              Выберите фото для загрузки
            </Typography>
            <Button variant="contained" onClick={triggerFileInput}>
              Выбрать файл
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={handleFileChange}
            />
          </Box>
        )}

        {step === 'crop' && previewUrl && (
          <Box className={styles.cropStep}>
            <Box className={styles.cropperContainer}>
              <div className={styles.cropFrame}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={styles.cropImage}
                  style={{ transform: `scale(${zoom})` }}
                  onLoad={(e) => handleImageLoad(e.currentTarget)}
                />
              </div>
            </Box>

            <Box className={styles.toolbar}>
              <Typography variant="caption">−</Typography>
              <Slider
                value={zoom}
                onChange={(_, v) => setZoom(v as number)}
                min={1}
                max={3}
                step={0.01}
                size="small"
              />
              <Typography variant="caption">+</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      {step === 'crop' && (
        <DialogActions className={styles.actions}>
          <Button variant="outlined" onClick={handleBack}>
            Назад
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
