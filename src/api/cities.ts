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
import { City } from '../common/types'

export async function getCities(userId: string): Promise<City[]> {
  const citiesRef = ref(db, 'cities')
  const citiesQuery = query(citiesRef, orderByChild('userId'), equalTo(userId))

  const snapshot = await get(citiesQuery)

  if (!snapshot.exists()) return []
  return Object.values(snapshot.val()) as City[]
}

export async function createCity(property: City): Promise<void> {
  const cityRef = ref(db, 'cities')
  const newCityRef = push(cityRef)
  const cityWithId = {
    ...property,
    id: newCityRef.key,
  }
  await set(newCityRef, cityWithId)
}

export async function getCityById(cityId: string): Promise<City | null> {
  const cityRef = ref(db, `cities/${cityId}`)
  const snapshot = await get(cityRef)

  if (!snapshot.exists()) {
    return null
  }

  const cityData = snapshot.val() as Omit<City, 'id'>

  return { id: snapshot.key as string, ...cityData } as City
}

export async function deleteCity(id: string): Promise<void> {
  const cityRef = ref(db, `cities/${id}`)
  await remove(cityRef)
}

export async function updateCity(id: string, updates: Partial<City>): Promise<void> {
  const cityRef = ref(db, `cities/${id}`)
  await update(cityRef, updates)
}
