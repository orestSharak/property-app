import { useQuery } from '@tanstack/react-query'
import { Client } from '../common/types'
import { useAuth } from '../context/AuthContext'
import { getClientById } from '../api/clients'

export function useClient(clientId: string) {
  const { currentUser } = useAuth()
  const userId = currentUser?.uid

  const {
    data: client,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Client | null>({
    queryKey: ['client', clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId && !!userId,
  })

  return {
    client,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
