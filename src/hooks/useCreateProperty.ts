import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Property } from '../common/types'
import { createProperty } from '../api/properties'

export function useCreateProperty() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (property: Property) => createProperty(property),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },

    onError: (err) => {
      console.error('Failed to create property:', err)
    },
  })

  return {
    createProperty: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
