import { useCallback, useEffect, useState } from 'react'

import { Properties } from '../common/types'
import { getProperties } from '../api/properties'
import { useAuth } from '../context/AuthContext'

export function useGerProperties() {
  const [properties, setProperties] = useState<Properties[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const { currentUser } = useAuth()

  const refetch = useCallback(
    async (city?: string | null) => {
      setIsLoading(true)
      setError(false)

      try {
        const data = await getProperties(currentUser.uid, city)
        setProperties(data)
      } catch (e: any) {
        setError(true)
        setProperties(null)
        throw new Error('Could not get properties', e)
      } finally {
        setIsLoading(false)
      }
    },
    [currentUser],
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  return { properties, isLoading, isError, refetch }
}
