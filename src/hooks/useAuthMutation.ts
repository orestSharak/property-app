import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export interface LoginCredentials {
  email: string
  password: string
}

export function useAuthMutations() {
  const { login, logout } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => login(email, password),

    onSuccess: async () => {
      await queryClient.invalidateQueries()

      navigate('/dashboard')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear()
      navigate('/')
    },
  })

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  }
}
