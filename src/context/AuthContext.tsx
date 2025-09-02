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
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
