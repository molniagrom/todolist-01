export type ActivityEntry = {
  id: string
  type: 'create' | 'update' | 'delete'
  text: string
  time: string
}

const ACTIVITY_KEY = 'profileActivity'
const MAX_ITEMS = 10

export const loadActivity = (): ActivityEntry[] => {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* skip */ }
  return []
}

export const saveActivity = (entry: Omit<ActivityEntry, 'id' | 'time'>) => {
  const list = loadActivity()
  list.unshift({
    ...entry,
    id: Date.now().toString(),
    time: new Date().toISOString(),
  })
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list.slice(0, MAX_ITEMS)))
}

export const formatTime = (iso: string): string => {
  const date = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'только что'
  if (minutes < 60) return `${minutes} мин. назад`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ч. назад`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} д. назад`
  return date.toLocaleDateString('ru-RU')
}
