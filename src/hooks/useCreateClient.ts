import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Client } from '../common/types'
import { createClient } from '../api/properties'

export function useCreateClient() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (client: Client) => createClient(client),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
    },

    onError: (err) => {
      console.error('Failed to create client:', err)
    },
  })

  return {
    createClient: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
