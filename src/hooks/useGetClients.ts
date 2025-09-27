import { useQuery } from '@tanstack/react-query'
import { Client } from '../common/types'
import { useAuth } from '../context/AuthContext'
import { getClients } from '../api/clients'

export function useGerClients() {
  const { currentUser } = useAuth()

  const {
    data: clients,
    isLoading,
    isError,
    refetch,
  } = useQuery<Client[]>({
    queryKey: ['clients', currentUser.uid],
    queryFn: () => getClients(currentUser.uid),
    enabled: !!currentUser.uid,
  })

  return {
    clients,
    isLoading,
    isError,
    refetch,
  }
}
