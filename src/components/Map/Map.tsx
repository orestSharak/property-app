import { Marker, TileLayer, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import { Container, LeafletStyle } from './Map.styles'
import { prepareMarkers } from '../../utils/utils'
import { Status } from '../../common/types'
import { MAP_LIGHT_PALETTE_URL } from '../../common/constants'
import { useTheme } from '../../context/ThemeContext'

type MarkerProps = {
  id: string
  position: string
  label: string
  status: Status
}

type MapProps = {
  height: number
  markers: MarkerProps[]
}

export const Map = ({ height, markers }: MapProps) => {
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
            ></Marker>
          )
        })}
      </Container>
    </>
  )
}
