import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { auth } from '../firebase'
import { User } from '../common/types'

const AuthContext = createContext(undefined)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function refreshUser() {
    if (auth.currentUser) {
      await auth.currentUser.reload()
      setCurrentUser(auth.currentUser)
    }
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const value = {
    login,
    logout,
    currentUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
