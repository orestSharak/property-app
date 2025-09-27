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
import { Client, Property } from '../common/types'

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

export async function createProperty(property: Property): Promise<void> {
  const propertiesRef = ref(db, 'properties')
  const newPropertyRef = push(propertiesRef)
  const propertyWithId = {
    ...property,
    id: newPropertyRef.key,
  }
  await set(newPropertyRef, propertyWithId)
}

export async function createClient(client: Client): Promise<void> {
  const clientsRef = ref(db, 'clients')
  const newClientRef = push(clientsRef)
  const clientWithId = {
    ...client,
    id: newClientRef.key,
  }
  await set(newClientRef, clientWithId)
}

export async function deleteProperty(id: string): Promise<void> {
  const propertyRef = ref(db, `properties/${id}`)
  await remove(propertyRef)
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<void> {
  const propertyRef = ref(db, `properties/${id}`)
  await update(propertyRef, updates)
}
