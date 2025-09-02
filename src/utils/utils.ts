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
