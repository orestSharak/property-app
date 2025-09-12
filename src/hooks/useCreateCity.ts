import { useMutation, useQueryClient } from '@tanstack/react-query'
import { City } from '../common/types'
import { createCity } from '../api/cities'

export function useCreateCity() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (city: City) => createCity(city),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    },

    onError: (err) => {
      console.error('Failed to create city:', err)
    },
  })

  return {
    createCity: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
