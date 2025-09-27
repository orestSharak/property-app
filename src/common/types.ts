import { z } from 'zod'
import { LightPalette } from './theme'
import { ClientFromSchema, PropertyFromSchema } from './formSchema'

export type Property = {
  id?: string
  name: string
  address: string
  createdAt: number
  userEmail: string
  userId: string
  position: string
  cityPosition: string
  city: string
  imageUrl?: string
  clientName: string
  clientEmail: string
  clientPhoneNumber: string
  status: Status
}

export type City = {
  id?: string
  name: string
  userEmail: string
  userId: string
  position: string
  createdAt: number
}

export type Client = {
  id?: string
  fullName: string
  city: string
  address: string
  phone: string | null
  email: string
  createdAt: number
  userEmail: string
  userId: string
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

export type MarkerDataFull = Omit<MarkerData, 'position'> & {
  position: { lat: number; lng: number }
}

export type AppTheme = typeof LightPalette

export type PropertyFormData = z.infer<typeof PropertyFromSchema>
export type ClientFormData = z.infer<typeof ClientFromSchema>
