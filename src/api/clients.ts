import { equalTo, get, orderByChild, push, query, ref, remove, update } from 'firebase/database'
import { Client, Note } from '../common/types'
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

export async function updateClient(clientId: string, updates: Partial<Client>): Promise<void> {
  const clientRef = ref(db, `clients/${clientId}`)
  await update(clientRef, updates)
}

export async function deleteClient(clientId: string): Promise<void> {
  const clientRef = ref(db, `clients/${clientId}`)
  await remove(clientRef)
}

export async function addNoteToClient(clientId: string, noteText: string): Promise<void> {
  const notesRef = ref(db, `clients/${clientId}/notes`)
  const newNoteRef = push(notesRef)
  const newNoteId = newNoteRef.key

  if (!newNoteId) {
    throw new Error('Failed to generate a new key for the note.')
  }

  const newNote: Note = {
    id: newNoteId,
    cratedAt: Date.now(),
    text: noteText,
  }

  await update(notesRef, {
    [newNoteId]: newNote,
  })

  // ALTERNATIVE: Use set(newNoteRef, newNote) if you prefer 'set' over 'update'
  // await set(newNoteRef, newNote);
}
