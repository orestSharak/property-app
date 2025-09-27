import { MarkerData, MarkerDataFull } from '../common/types'

/**
 * Converts a Unix timestamp to a human-readable date string.
 * @param timestamp - Unix timestamp in milliseconds.
 * @param locale - Optional locale string (default is browser's locale).
 * @param options - Optional Intl.DateTimeFormat options.
 * @returns Formatted date string.
 */
export function formatTimestamp(
  timestamp: number,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(timestamp)
  return date.toLocaleString(locale, options)
}

/**
 * Generates a thumbnail URL from a Google Drive share link.
 *
 * Supports common Google Drive URL formats like:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 *
 * @param driveLink - A Google Drive file URL
 * @param size - Optional width size for the thumbnail (in pixels)
 * @returns A direct Google thumbnail URL or an empty string if invalid
 */
export function getGoogleDriveImageUrl(driveLink: string | undefined, size?: number): string {
  if (!driveLink) {
    console.warn('[getGoogleDriveImageUrl] Invalid or missing driveLink input')
    return ''
  }

  const fileIdMatch = driveLink.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/)
  const fileId = fileIdMatch?.[1]

  if (!fileId) {
    console.warn('[getGoogleDriveImageUrl] Failed to extract file ID from driveLink:', driveLink)
    return ''
  }

  const sizeParam = size && size > 0 ? `&sz=w${size}` : ''
  return `https://drive.google.com/thumbnail?id=${fileId}${sizeParam}`
}

/**
 * Transforms an array of marker objects by converting the string `'lat,lng'` position
 * into an object with numeric `lat` and `lng` properties.
 *
 * @param markers - Array of objects each containing:
 * - `id`: string
 * - `position`: string in the format `'lat,lng'`
 * - `label`: string
 * - `status`: Status
 *
 * Example input:
 * [
 *   { id: '1', position: '52.5,13.4', label: 'A', status: 'active' }
 * ]
 *
 * Example output:
 * [
 *   { id: '1', position: { lat: 52.5, lng: 13.4 }, label: 'A', status: 'active' }
 * ]
 */
export function prepareMarkers(markers: MarkerData[]): MarkerDataFull[] {
  if (!Array.isArray(markers)) return []

  return markers.map((item) => ({
    ...item,
    position: {
      lat: Number(item.position.split(',')[0]),
      lng: Number(item.position.split(',')[1]),
    },
  }))
}

/**
 * Splits a full name string into a first name (or "name") and a surname (or "last name").
 *
 * This function handles null/undefined/empty input and deals with names
 * that have multiple parts by treating the first word as the name and the rest as the surname.
 *
 * @param {string | undefined} fullName - The client's full name, e.g., "John Doe" or "Mary Anne Smith".
 * @returns {{ name: string, surname: string }} An object containing the name and surname.
 * If the input is invalid or empty, both fields will be an empty string.
 */
export function getClientNameAndSurname(fullName?: string) {
  if (typeof fullName !== 'string' || !fullName || fullName.trim() === '') {
    return { name: '', surname: '' }
  }

  const nameParts = fullName.trim().split(' ')
  const name = nameParts[0]
  const surname = nameParts.slice(1).join(' ')

  return { name, surname }
}
