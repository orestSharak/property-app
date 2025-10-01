import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNoteFromProperty } from '../../api/properties'

interface DeleteNoteVariables {
  propertyId: string
  noteId: string
}

export function useDeletePropertyNote() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ propertyId, noteId }: DeleteNoteVariables) =>
      deleteNoteFromProperty(propertyId, noteId),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['property', variables.propertyId] })
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },

    onError: (err) => {
      console.error('Failed to delete note from property:', err)
    },
  })

  return {
    deletePropertyNote: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
