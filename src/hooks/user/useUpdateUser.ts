import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../../context/AuthContext'

export interface UserData {
  displayName?: string
}

export function useUpdateUser() {
  const { currentUser, refreshUser } = useAuth()
  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: UserData) => {
      if (!currentUser) {
        throw new Error('User must be logged in.')
      }
      await updateProfile(currentUser, updates)

      return updates
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] })

      if (currentUser && refreshUser) {
        await refreshUser()
      }
    },

    onError: (error) => {
      console.error('Failed to update user:', error)
    },
  })

  return {
    updateUser: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
    updateStatus: updateProfileMutation.status,
  }
}
