import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

type LoginCredentials = {
  email: string
  password: string
}

export function useLogin() {
  const { login } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => login(email, password),

    onSuccess: async () => {
      await queryClient.invalidateQueries()

      navigate('/dashboard')
    },
  })

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  }
}
