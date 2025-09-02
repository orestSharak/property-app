import { LightPalette } from './theme'

export type Properties = {
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
}

export type City = {
  id?: string
  name: string
  userEmail: string
  userId: string
  position: string
  createdAt: number
}

export type User = {
  displayName: string | null
  uid: string
  email: string
}

export type AppTheme = typeof LightPalette
