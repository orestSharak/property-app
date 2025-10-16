import { Marker, TileLayer, ZoomControl } from 'react-leaflet'
import L, { LatLngLiteral } from 'leaflet'
import React, { useEffect, useMemo, useState } from 'react'
import { Container, LeafletStyle } from './Map.styles'
import { prepareMarkers } from '../../utils/utils'
import { MAP_LIGHT_PALETTE_URL } from '../../common/constants'
import { useTheme } from '../../context/ThemeContext'
import { Popup } from './Popup/Popup'
import { MarkerData, Status } from '../../common/types'
import { MapMover } from './MapMover/MapMover'

type MapProps = {
  height?: string
  markers: MarkerData[]
  showPopup?: boolean
  citySet?: boolean
  hoveredPropertyId?: string | null
  zoom?: number
}

/**
 * `Map` is a React component that renders an interactive map using the Leaflet library.
 * It displays custom markers and, optionally, a popup with details when a marker is clicked.
 *
 * @param height - The height of the map container in pixels.
 * @param markers - An array of marker data objects to be displayed on the map.
 * @param showPopup - If `true`, a popup with marker details will appear when a marker is clicked.
 *
 * @param citySet
 * @param currentlyActiveMarker
 * @example
 * // A map displaying a set of markers with popups enabled
 * <Map
 * height={500}
 * markers={[
 * { id: 1, label: 'Location 1', position: { lat: 51.505, lng: -0.09 }, status: 'active' },
 * { id: 2, label: 'Location 2', position: { lat: 51.51, lng: -0.1 }, status: 'completed' },
 * ]}
 * showPopup={true}
 * />
 *
 * @example
 * // A map displaying markers without popups
 * <Map
 * height={400}
 * markers={[
 * { id: 1, label: 'Store A', position: { lat: 51.505, lng: -0.09 }, status: 'active' },
 * ]}
 * />
 */
export const Map = ({
  height = '200px',
  markers,
  showPopup = false,
  citySet = true,
  zoom = 13,
  hoveredPropertyId,
}: MapProps) => {
  const { themeMode } = useTheme()

  const [activeMarker, setActiveMarker] = useState(null)

  const normalizedMarkers = prepareMarkers(markers)
  const normalizedActiveMarker = normalizedMarkers?.filter(
    (marker) => marker.id === activeMarker?.id,
  )

  useEffect(() => {
    if (activeMarker && hoveredPropertyId && hoveredPropertyId !== activeMarker?.id) {
      setActiveMarker(null)
    }
  }, [activeMarker, hoveredPropertyId])

  const preparedMapMoverPosition: LatLngLiteral | null = normalizedActiveMarker.length
    ? {
        lat: normalizedActiveMarker[0].position.lat,
        lng: normalizedActiveMarker[0].position.lng,
      }
    : normalizedMarkers
      ? {
          lat: normalizedMarkers[0].position.lat,
          lng: normalizedMarkers[0].position.lng,
        }
      : null

  const getZoom = useMemo(() => (citySet ? zoom : 5), [citySet, zoom])

  const getDynamicMarkerIcon = (key: string, status: Status, id?: string) => {
    let iconClassName = `house-marker marker-color-${status}`

    if (id && id === key) {
      iconClassName = `house-marker house-marker-active marker-color-${status}`
    }

    return L.divIcon({
      className: iconClassName,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -38],
    })
  }

  return (
    <>
      <LeafletStyle themeMode={themeMode} />
      <Container
        height={height}
        center={[normalizedMarkers[0].position.lat, normalizedMarkers[0].position.lng]}
        zoom={getZoom}
        zoomControl={false}
        touchZoom={true}
      >
        <TileLayer url={MAP_LIGHT_PALETTE_URL} />
        <MapMover position={preparedMapMoverPosition} zoom={getZoom} />
        <ZoomControl position="bottomright" />
        {normalizedMarkers?.map((marker) => {
          return (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={getDynamicMarkerIcon(marker.id, marker.status, hoveredPropertyId)}
              aria-label={marker.label}
              aria-haspopup="dialog"
              aria-expanded={activeMarker?.id === marker.id}
              eventHandlers={{
                click: () => setActiveMarker(marker),
              }}
            >
              {showPopup && <Popup marker={marker} />}
            </Marker>
          )
        })}
      </Container>
    </>
  )
}
