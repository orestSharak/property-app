import { useQuery } from '@tanstack/react-query'
import { City } from '../../common/types'
import { useAuth } from '../../context/AuthContext'
import { getCities } from '../../api/cities'

export function useGetCities() {
  const { currentUser } = useAuth()

  const {
    data: cities,
    isLoading,
    isError,
    refetch,
  } = useQuery<City[]>({
    queryKey: ['cities', currentUser.uid],
    queryFn: () => getCities(currentUser.uid),
    enabled: !!currentUser.uid,
  })

  return {
    cities,
    isLoading,
    isError,
    refetch,
  }
}
