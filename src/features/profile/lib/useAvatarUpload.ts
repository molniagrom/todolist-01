import { useState, useCallback, useRef, useEffect } from 'react'
import { useFileInput } from './useFileInput'
import { cropToDataUrl, getCropParams } from './cropUtils'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export type UploadStep = 'upload' | 'crop'

export const useAvatarUpload = (onSave: (dataUrl: string) => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<UploadStep>('upload')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const validateFile = useCallback((file: File): boolean => {
    if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_SIZE) {
      return false
    }
    return true
  }, [])

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const file = files[0]
      if (!file || !validateFile(file)) return

      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setStep('crop')
      setZoom(1)
    },
    [validateFile],
  )

  const { fileInputRef, triggerFileInput, handleFileChange } = useFileInput({
    onFilesSelected: handleFilesSelected,
  })

  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    imageRef.current = img
  }, [])

  const handleSave = useCallback(async () => {
    const img = imageRef.current
    if (!img) return

    setIsSaving(true)
    try {
      const { x, y, size } = getCropParams(img.naturalWidth, img.naturalHeight, zoom)
      const dataUrl = await cropToDataUrl(img, x, y, size)
      onSave(dataUrl)
      setIsOpen(false)
      setStep('upload')
      setPreviewUrl(null)
      setZoom(1)
      imageRef.current = null
    } catch {
      // silent
    } finally {
      setIsSaving(false)
    }
  }, [zoom, onSave])

  const cleanup = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setStep('upload')
    setZoom(1)
    imageRef.current = null
  }, [previewUrl])

  const requestClose = useCallback(() => {
    cleanup()
    setIsOpen(false)
  }, [cleanup])

  const handleBack = useCallback(() => {
    cleanup()
    setStep('upload')
  }, [cleanup])

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return {
    isOpen,
    step,
    previewUrl,
    zoom,
    isSaving,
    fileInputRef,
    setZoom,
    openModal,
    requestClose,
    handleBack,
    handleSave,
    handleImageLoad,
    triggerFileInput,
    handleFileChange,
  }
}
