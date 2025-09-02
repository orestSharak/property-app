import { useState, useCallback } from 'react'
import { deleteCity } from '../api/cities'

export function useDeleteCity() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const deleteAction = useCallback(async (id: string) => {
    setIsLoading(true)
    setIsError(false)

    try {
      await deleteCity(id)
    } catch (error) {
      setIsError(true)
      throw new Error('Delete city failed', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { deleteCity: deleteAction, isLoading, isError }
}
