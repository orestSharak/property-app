import React, { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function NameCheckRedirect({ children }: PropsWithChildren) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (currentUser) {
      const displayNameMissing = !currentUser.displayName || currentUser.displayName.trim() === ''
      const isOnSettingsPage = location.pathname.includes('/settings')

      if (displayNameMissing && !isOnSettingsPage) {
        navigate('/settings', { replace: true })
      }
    }
  }, [currentUser, navigate, location.pathname])

  return <>{children}</>
}
