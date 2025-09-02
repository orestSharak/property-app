import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children }: PropsWithChildren) {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to="/login" />
}

export default PrivateRoute
