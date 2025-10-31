import { z } from 'zod'
import { LightPalette } from './theme'
import {
  CityFromSchema,
  ClientFromSchema,
  LoginFromSchema,
  PropertyFromSchema,
  UserFromSchema,
} from './formSchema'

export type ExternalProperty = {
  DENOM: string | null
  SEZIONE: string | null
  FOGLIO: string | null
  NUM_PART: string | null
  COMUNI: string[] | string | null
}

export type Property = {
  id?: string
  address: string
  createdAt: number
  userEmail: string
  userId: string
  position: string
  url?: string | null
  city: string
  cityId: string
  clientId: string
  clientFullName: string
  clientEmail: string
  clientPhone?: string
  clientAdditionalPhoneOne?: string
  clientAdditionalPhoneTwo?: string
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
  properties?: Property[]
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
  city: string
}
export type Client = {
  id?: string
  fullName: string
  address: string
  phone: string | null
  additionalPhoneOne: string | null
  additionalPhoneTwo: string | null
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
  clientAdditionalPhoneOne?: string
  clientAdditionalPhoneTwo?: string
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
export type CityFormData = z.infer<typeof CityFromSchema>
export type LoginFormData = z.infer<typeof LoginFromSchema>
export type UserFormData = z.infer<typeof UserFromSchema>
