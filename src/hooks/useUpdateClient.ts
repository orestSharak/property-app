import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Client } from '../common/types'
import { updateClient } from '../api/clients'

export function useUpdateClient() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Client }) => updateClient(id, updates),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
      await queryClient.invalidateQueries({ queryKey: ['client', variables.id] })
    },

    onError: (err) => {
      console.error('Failed to update client:', err)
    },
  })

  return {
    updateClient: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
