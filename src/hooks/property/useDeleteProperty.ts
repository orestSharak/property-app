import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProperty } from '../../api/properties'

export function useDeleteProperty() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (id: string) => deleteProperty(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },

    onError: (err) => {
      console.error('Failed to delete property:', err)
    },
  })

  return {
    deleteProperty: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
