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

export enum Status {
  // eslint-disable-next-line
  DEFAULT = 'default',
  // eslint-disable-next-line no-unused-vars
  NEWS = 'news',
  // eslint-disable-next-line no-unused-vars
  CONTRACT = 'contract',
}

export type AppTheme = typeof LightPalette
