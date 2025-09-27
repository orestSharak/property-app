import { equalTo, get, orderByChild, query, ref } from 'firebase/database'
import { Client } from '../common/types'
import { db } from '../firebase'

export async function getClients(userId: string): Promise<Client[]> {
  const clientsRef = ref(db, 'clients')
  const clientsQuery = query(clientsRef, orderByChild('userId'), equalTo(userId))

  const snapshot = await get(clientsQuery)

  if (!snapshot.exists()) return []
  return Object.values(snapshot.val()) as Client[]
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const clientRef = ref(db, `clients/${clientId}`)
  const snapshot = await get(clientRef)

  if (!snapshot.exists()) {
    return null
  }

  const clientData = snapshot.val() as Omit<Client, 'id'>

  return { id: snapshot.key as string, ...clientData } as Client
}
