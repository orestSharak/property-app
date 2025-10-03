import { LatLngLiteral } from 'leaflet'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

export function MapMover({ position, zoom }: { position: LatLngLiteral | null; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    if (position) map.flyTo(position, zoom, { duration: 0.5 })
  }, [position, map, zoom])

  return null
}
