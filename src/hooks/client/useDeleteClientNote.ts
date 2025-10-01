import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNoteFromClient } from '../../api/clients'

interface DeleteNoteVariables {
  clientId: string
  noteId: string
}

export function useDeleteClientNote() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ clientId, noteId }: DeleteNoteVariables) =>
      deleteNoteFromClient(clientId, noteId),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['client', variables.clientId] })
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
    },

    onError: (err) => {
      console.error('Failed to delete note from client:', err)
    },
  })

  return {
    deleteClientNote: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
