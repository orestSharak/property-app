import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNoteToProperty } from '../../api/properties'

export function useAddPropertyNote() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ propertyId, noteText }: { propertyId: string; noteText: string }) =>
      addNoteToProperty(propertyId, noteText),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['property', variables.propertyId] })
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },

    onError: (err) => {
      console.error('Failed to add note to property:', err)
    },
  })

  return {
    addPropertyNote: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
