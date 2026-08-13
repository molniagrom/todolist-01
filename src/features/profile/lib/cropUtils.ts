const AVATAR_SIZE = 256

export async function cropToDataUrl(
  img: HTMLImageElement,
  cropX: number,
  cropY: number,
  cropSize: number,
): Promise<string> {
  const canvas = document.createElement('canvas')
  canvas.width = AVATAR_SIZE
  canvas.height = AVATAR_SIZE
  const ctx = canvas.getContext('2d')!

  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropSize,
    cropSize,
    0,
    0,
    AVATAR_SIZE,
    AVATAR_SIZE,
  )

  return canvas.toDataURL('image/jpeg', 0.9)
}

export function getCropParams(
  imgWidth: number,
  imgHeight: number,
  zoom: number,
): { x: number; y: number; size: number } {
  const scaledW = imgWidth / zoom
  const scaledH = imgHeight / zoom
  const size = Math.min(scaledW, scaledH)
  const x = (imgWidth - size) / 2
  const y = (imgHeight - size) / 2
  return { x, y, size }
}
