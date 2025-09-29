import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteClient } from '../api/clients'

export function useDeleteClient() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (id: string) => deleteClient(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
    },

    onError: (err) => {
      console.error('Failed to delete client:', err)
    },
  })

  return {
    deleteClient: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
