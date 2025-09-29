import { useQuery } from '@tanstack/react-query'
import { Property } from '../../common/types'
import { useAuth } from '../../context/AuthContext'
import { getPropertyById } from '../../api/properties'

export function useGetProperty(propertyId: string) {
  const { currentUser } = useAuth()
  const userId = currentUser?.uid

  const {
    data: property,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Property | null>({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId && !!userId,
  })

  return {
    property,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
