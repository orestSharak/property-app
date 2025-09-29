import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCity } from '../../api/cities'

export function useDeleteCity() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (id: string) => deleteCity(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    },

    onError: (err) => {
      console.error('Failed to delete city:', err)
    },
  })

  return {
    deleteCity: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
