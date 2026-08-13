import { useRef, useCallback, type ChangeEvent } from 'react'

type Options = {
  onFilesSelected: (files: File[]) => void
}

export const useFileInput = ({ onFilesSelected }: Options) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        onFilesSelected(Array.from(files))
      }
      e.target.value = ''
    },
    [onFilesSelected],
  )

  return { fileInputRef, triggerFileInput, handleFileChange }
}
