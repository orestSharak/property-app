import { useState, useCallback } from 'react'
import { deleteProperty } from '../api/properties'
import { useGerProperties } from './useGetProperties'

export function useDeleteProperty() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { refetch } = useGerProperties()

  const deleteAction = useCallback(
    async (id: string) => {
      setIsLoading(true)
      setIsError(false)

      try {
        await deleteProperty(id)
        await refetch()
      } catch (error: any) {
        setIsError(true)
        throw new Error('Delete property failed', error)
      } finally {
        setIsLoading(false)
      }
    },
    [refetch],
  )

  return { deleteProperty: deleteAction, isLoading, isError }
}
