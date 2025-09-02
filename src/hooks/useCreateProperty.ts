import { useState, useCallback } from 'react'
import { Properties } from '../common/types'
import { createProperty } from '../api/properties'

export function useCreateProperty() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const createPropertyAction = useCallback(async (property: Properties) => {
    setIsLoading(true)
    setIsError(false)

    try {
      await createProperty(property)
    } catch (error) {
      setIsError(true)
      throw new Error('Create property failed', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { createProperty: createPropertyAction, isLoading, isError }
}
