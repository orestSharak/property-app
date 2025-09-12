import { useQuery } from '@tanstack/react-query'

import { Property } from '../common/types'
import { getProperties } from '../api/properties'
import { useAuth } from '../context/AuthContext'

export function useGetProperties(city?: string | null) {
  const { currentUser } = useAuth()

  const {
    data: properties,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery<Property[]>({
    queryKey: ['properties', currentUser.uid, city],
    queryFn: () => getProperties(currentUser.uid, city),
    enabled: !!currentUser.uid,
  })

  return {
    properties,
    isLoading,
    isSuccess,
    isError,
    refetch,
  }
}
