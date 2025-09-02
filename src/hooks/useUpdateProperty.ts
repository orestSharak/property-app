import { useState, useCallback } from 'react'
import { updateProperty } from '../api/properties'
import { Properties } from '../common/types'

export function useUpdateProperty() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const updatePropertyAction = useCallback(async (id: string, updates: Properties) => {
    setIsLoading(true)
    setIsError(false)

    try {
      await updateProperty(id, updates)
    } catch (error) {
      setIsError(true)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { updateProperty: updatePropertyAction, isLoading, isError }
}
