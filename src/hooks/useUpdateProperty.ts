import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProperty } from '../api/properties'
import { Property } from '../common/types'

export function useUpdateProperty() {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Property }) => updateProperty(id, updates),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },

    onError: (err) => {
      console.error('Failed to update property:', err)
    },
  })

  return {
    updateProperty: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}

// usage example
//   updateProperty(
//       { id: property.id, updates },
//       {
//
//         onSuccess: () => {
//            showToast({
//             content: t('success'),
//              status: 'success',
//            });
//         },
//
//         onError: (err) => {
//            showToast({
//              content: t('error'),
//               status: 'error',
//             });
//         },
//       }
//     );
