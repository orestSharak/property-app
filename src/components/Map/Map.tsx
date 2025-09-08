import { Marker, TileLayer, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import React, { useState } from 'react'
import { Container, LeafletStyle } from './Map.styles'
import { prepareMarkers } from '../../utils/utils'
import { MAP_LIGHT_PALETTE_URL } from '../../common/constants'
import { useTheme } from '../../context/ThemeContext'
import { Popup } from './Popup/Popup'
import { MarkerData } from '../../common/types'

type MapProps = {
  height: number
  markers: MarkerData[]
  showPopup?: boolean
}

/**
 * `Map` is a React component that renders an interactive map using the Leaflet library.
 * It displays custom markers and, optionally, a popup with details when a marker is clicked.
 *
 * @param height - The height of the map container in pixels.
 * @param markers - An array of marker data objects to be displayed on the map.
 * @param showPopup - If `true`, a popup with marker details will appear when a marker is clicked.
 *
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
export const Map = ({ height, markers, showPopup = false }: MapProps) => {
  const [activeMarker, setActiveMarker] = useState(null)
  const { themeMode } = useTheme()
  const normalizedMarkers = prepareMarkers(markers)

  return (
    <>
      <LeafletStyle themeMode={themeMode} />
      <Container
        height={height}
        center={[normalizedMarkers[0].position.lat, normalizedMarkers[0].position.lng]}
        zoom={14}
        zoomControl={false}
      >
        <TileLayer url={MAP_LIGHT_PALETTE_URL} />
        <ZoomControl position="bottomright" />
        {normalizedMarkers?.map((marker) => {
          const iconClassName = `house-marker marker-color-${marker.status}`

          const dynamicMarkerIcon = L.divIcon({
            className: iconClassName,
            iconSize: [44, 44],
            iconAnchor: [22, 44],
            popupAnchor: [0, -38],
          })

          return (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={dynamicMarkerIcon}
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
