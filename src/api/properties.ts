import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database'

import { db } from '../firebase'
import { Note, Property } from '../common/types'

export async function getProperties(userId: string, city?: string | null): Promise<Property[]> {
  const propertiesRef = ref(db, 'properties')
  const propertiesQuery = query(propertiesRef, orderByChild('userId'), equalTo(userId))

  const snapshot = await get(propertiesQuery)

  if (!snapshot.exists()) return []

  const allProps = Object.values(snapshot.val()) as Property[]

  if (city) {
    return allProps.filter((prop: any) => prop.city === city)
  }

  if (city === null) {
    return allProps
  }

  return allProps

  // simple version not filtered by user id
  // also in console got rid of this rule
  // "$propId": {
  //   ".read": "data.child('uid').val() === auth.uid",
  //     ".write": "newData.child('uid').val() === auth.uid",
  // }

  // const dbRef = ref(db, 'properties')
  // const snapshot = await get(dbRef)
  // if (snapshot.exists()) {
  //   return Object.values(snapshot.val()) as Properties[]
  // } else {
  //   throw new Error('No properties found')
  // }
}

export async function getPropertyById(propertyId: string): Promise<Property | null> {
  const propertyRef = ref(db, `properties/${propertyId}`)
  const snapshot = await get(propertyRef)

  if (!snapshot.exists()) {
    return null
  }

  const propertyData = snapshot.val() as Omit<Property, 'id'>

  return { id: snapshot.key as string, ...propertyData } as Property
}

export async function createProperty(property: Property): Promise<void> {
  const propertiesRef = ref(db, 'properties')
  const newPropertyRef = push(propertiesRef)
  const propertyWithId = {
    ...property,
    id: newPropertyRef.key,
  }
  await set(newPropertyRef, propertyWithId)
}

export async function deleteProperty(id: string): Promise<void> {
  const propertyRef = ref(db, `properties/${id}`)
  await remove(propertyRef)
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<void> {
  const propertyRef = ref(db, `properties/${id}`)
  await update(propertyRef, updates)
}

export async function addNoteToProperty(propertyId: string, noteText: string): Promise<void> {
  const notesRef = ref(db, `properties/${propertyId}/notes`)
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

export async function deleteNoteFromProperty(propertyId: string, noteId: string): Promise<void> {
  const noteRef = ref(db, `properties/${propertyId}/notes/${noteId}`)

  await remove(noteRef)
}
