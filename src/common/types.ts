import { z } from 'zod'
import { LightPalette } from './theme'
import { ClientFromSchema, PropertyFromSchema } from './formSchema'

export type Property = {
  id?: string
  address: string
  createdAt: number
  userEmail: string
  userId: string
  position: string
  city: string
  cityId: string
  clientId: string
  clientFullName: string
  clientEmail: string
  clientPhone?: string
  status: Status
  notes?: Note[]
}

export type City = {
  id?: string
  name: string
  userEmail: string
  userId: string
  position: string
  createdAt: number
}

export type Note = {
  id?: string
  cratedAt: number
  text: string
}

export type PropertyDetails = {
  id: string
  position: string
  label: string
  status: Status
}
export type Client = {
  id?: string
  fullName: string
  city: string
  cityId: string
  address: string
  phone: string | null
  email: string
  createdAt: number
  userEmail: string
  userId: string
  notes?: Note[]
  properties?: PropertyDetails[]
}

export type User = {
  displayName: string | null
  uid: string
  email: string
}

export type Status = 'default' | 'news' | 'contract'

export type MarkerData = {
  id: string
  position: string
  label: string
  clientId: string
  clientFullName: string
  clientEmail: string
  clientPhone?: string
  status: Status
}

export type Options = {
  value: string
  label: string
}

export type MarkerDataFull = Omit<MarkerData, 'position'> & {
  position: { lat: number; lng: number }
}

export type AppTheme = typeof LightPalette

export type PropertyFormData = z.infer<typeof PropertyFromSchema>
export type ClientFormData = z.infer<typeof ClientFromSchema>
