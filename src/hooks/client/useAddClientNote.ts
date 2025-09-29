import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNoteToClient } from '../../api/clients'

export function useAddClientNote() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ clientId, noteText }: { clientId: string; noteText: string }) =>
      addNoteToClient(clientId, noteText),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['client', variables.clientId] })
      await queryClient.invalidateQueries({ queryKey: ['clients'] })
    },

    onError: (err) => {
      console.error('Failed to add note to client:', err)
    },
  })

  return {
    addClientNote: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
