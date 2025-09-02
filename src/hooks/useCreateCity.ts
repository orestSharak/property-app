import { useState, useCallback } from 'react'
import { City } from '../common/types'
import { createCity } from '../api/cities'

export function useCreateCity() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const createCityAction = useCallback(async (city: City) => {
    setIsLoading(true)
    setIsError(false)

    try {
      await createCity(city)
    } catch (error: any) {
      setIsError(true)
      throw new Error('Create city failed', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { createCity: createCityAction, isLoading, isError }
}
