import { useState, useCallback } from 'react'

const STORAGE_KEY = 'profileData'

export type ProfileData = {
  avatar: string
  displayName: string
  bio: string
}

const loadProfile = (login: string): ProfileData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      return {
        avatar: saved.avatar || '',
        displayName: saved.displayName || login,
        bio: saved.bio || '',
      }
    }
  } catch { /* skip */ }
  return { avatar: '', displayName: login, bio: '' }
}

export const PROFILE_UPDATED_EVENT = 'profileDataUpdated'

const saveProfile = (data: ProfileData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

export const useProfile = (login: string) => {
  const [profile, setProfile] = useState<ProfileData>(() => loadProfile(login))

  const updateAvatar = useCallback((avatar: string) => {
    setProfile((prev) => {
      const next = { ...prev, avatar }
      saveProfile(next)
      return next
    })
  }, [])

  const updateDisplayName = useCallback((displayName: string) => {
    setProfile((prev) => {
      const next = { ...prev, displayName }
      saveProfile(next)
      return next
    })
  }, [])

  const updateBio = useCallback((bio: string) => {
    setProfile((prev) => {
      const next = { ...prev, bio }
      saveProfile(next)
      return next
    })
  }, [])

  const removeAvatar = useCallback(() => {
    setProfile((prev) => {
      const next = { ...prev, avatar: '' }
      saveProfile(next)
      return next
    })
  }, [])

  return {
    profile,
    updateAvatar,
    updateDisplayName,
    updateBio,
    removeAvatar,
  }
}
