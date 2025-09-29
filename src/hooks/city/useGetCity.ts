import { useQuery } from '@tanstack/react-query'
import { City } from '../../common/types'
import { useAuth } from '../../context/AuthContext'
import { getCityById } from '../../api/cities'

export function useGetCity(cityId: string) {
  const { currentUser } = useAuth()
  const userId = currentUser?.uid

  const {
    data: city,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<City | null>({
    queryKey: ['city', cityId],
    queryFn: () => getCityById(cityId),
    enabled: !!cityId && !!userId,
  })

  return {
    city,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
