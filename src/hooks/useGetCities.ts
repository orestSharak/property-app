import { useCallback, useEffect, useState } from 'react'

import { City } from '../common/types'
import { useAuth } from '../context/AuthContext'
import { getCities } from '../api/cities'

export function useGerCities() {
  const [cities, setCities] = useState<City[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false)
  const { currentUser } = useAuth()

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(false)

    try {
      const data = await getCities(currentUser.uid)
      setCities(data)
    } catch (e: any) {
      setError(true)
      setCities(null)
      throw new Error('Could not get cities', e)
    } finally {
      setIsLoading(false)
    }
  }, [currentUser])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { cities: cities, isLoading, isError, refetch }
}
