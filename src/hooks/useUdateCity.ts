import { useState, useCallback } from 'react'
import { City } from '../common/types'
import { updateCity } from '../api/cities'

export function useUpdateCity() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const updateCityAction = useCallback(async (id: string, updates: City) => {
    setIsLoading(true)
    setIsError(false)

    try {
      await updateCity(id, updates)
    } catch (error) {
      setIsError(true)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { updateCity: updateCityAction, isLoading, isError }
}
