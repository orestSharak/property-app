import { useMutation, useQueryClient } from '@tanstack/react-query'
import { City } from '../../common/types'
import { updateCity } from '../../api/cities'

export function useUpdateCity() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: City }) => updateCity(id, updates),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    },

    onError: (err) => {
      console.error('Failed to update cities:', err)
    },
  })

  return {
    updateCity: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
