import { useQuery } from '@tanstack/react-query'
import { ExternalProperty } from '../../common/types'
import { getExternalPropertyDetails } from '../../api/properties'

export function useGetExternalPropertyDetails(coordinates: string) {
  const {
    data: externalProperty,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<ExternalProperty | null>({
    queryKey: ['externalProperty'],
    queryFn: () => getExternalPropertyDetails(coordinates),
    enabled: !!coordinates,
    staleTime: 0,
  })

  return {
    externalProperty,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
