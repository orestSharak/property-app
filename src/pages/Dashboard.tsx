import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L, { LatLngLiteral } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useGetProperties } from '../hooks/useGetProperties'
import { CitySelect } from '../components/CitySelect'
import BaseImage from '../components/BaseImage'
import { useGerCities } from '../hooks/useGetCities'
import { defaultPosition } from '../common/constants'

interface MarkerData {
  id: string
  position: LatLngLiteral
  text: string
}

const normalRedMarkerIcon = L.divIcon({
  className: 'custom-red-marker-normal',
  html: `
    <div class="pin-base-normal"></div>
    <div class="pin-circle-normal"></div>
  `,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -38],
})

const selectedRedMarkerIcon = L.divIcon({
  className: 'custom-red-marker-selected',
  html: `
    <div class="pin-base-selected"></div>
    <div class="pin-circle-selected"></div>
  `,
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [0, -45],
})

function MapMover({ position, zoom }: { position: LatLngLiteral | null; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      const currentCenter = map.getCenter()
      const distance = map.distance(currentCenter, position)

      if (distance > 100) {
        // Only move if the map center is more than ~10 meters from target
        map.flyTo(position, zoom, { duration: 0.5 })
      }
    }
  }, [position, map, zoom])

  return null
}

export default function Dashboard() {
  const { t } = useTranslation()

  const { properties, refetch } = useGetProperties()
  const { cities } = useGerCities()
  const [selectedCity, setSelectedCity] = useState<string>('')

  useEffect(() => {
    refetch()
  }, [refetch, selectedCity, t])

  const markers = useMemo(
    () =>
      properties?.map((item) => ({
        id: item.id,
        position: {
          lat: Number(item.position.split(',')[0]),
          lng: Number(item.position.split(',')[1]),
        },
        text: item.name,
        address: item.address,
        imageUrl: item.imageUrl,
      })),
    [properties],
  )

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const markerRefs = useRef<(L.Marker | null)[]>([])

  const cityCenterPosition = useMemo(
    () => ({
      lat:
        cities && selectedCity
          ? Number(cities.find((item) => item.name === selectedCity)?.position?.split(',')[0])
          : defaultPosition.lat,
      lng:
        cities && selectedCity
          ? Number(cities.find((item) => item.name === selectedCity)?.position?.split(',')[1])
          : defaultPosition.lng,
    }),
    [cities, selectedCity],
  )

  const getZoom = useMemo(() => (selectedCity ? 13 : 5), [selectedCity])

  useEffect(() => {
    markerRefs.current.forEach((marker) => marker?.closePopup())
    if (selectedMarker) {
      markerRefs.current[selectedMarker.id]?.openPopup()
    }
  }, [selectedMarker])

  return (
    <Container
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 40,
        marginTop: 20,
      }}
    >
      <CitySelect selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <div style={{ display: 'flex', width: '100%' }}>
        <div>
          <h2>
            {!markers?.length
              ? t('pages>dashboard>noProperties')
              : t('pages>dashboard>listOfProperties')}
          </h2>
          <ul
            style={{
              width: '400px',
              marginRight: '1rem',
              marginTop: 40,
              listStyle: 'none',
              padding: 0,
            }}
          >
            {markers?.map((marker) => (
              <li
                tabIndex={0}
                key={marker.id}
                style={{
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  fontWeight: selectedMarker?.id === marker.id ? 'bold' : 'normal',
                  fontSize: selectedMarker?.id === marker.id ? '1.025rem' : '1rem',
                  transition: 'font-size 0.3s ease',
                }}
                onClick={() => setSelectedMarker(marker)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedMarker(marker)
                  }
                }}
                //onMouseLeave={() => setSelectedMarker(null)}
              >
                {marker.text}
              </li>
            ))}
          </ul>
        </div>

        {properties && cityCenterPosition && (
          <MapContainer
            center={[cityCenterPosition.lat, cityCenterPosition.lng]}
            zoom={getZoom}
            style={{ height: '600px', width: '100%' }}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
            {/*
            // dark palette
            https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png

            alternatives with css :

            .leaflet-layer,
            .leaflet-control-zoom-in,
            .leaflet-control-zoom-out,
            .leaflet-control-attribution {
             filter: brightness(0.7) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
             }

            */}
            <MapMover position={cityCenterPosition || null} zoom={getZoom} />
            {markers?.map((marker) => (
              <Marker
                // Save refs for opening popup
                ref={(el) => {
                  markerRefs.current[marker.id] = el
                }}
                key={marker.id}
                position={marker.position}
                icon={
                  selectedMarker?.id === marker.id ? selectedRedMarkerIcon : normalRedMarkerIcon
                }
                eventHandlers={{
                  click: () => setSelectedMarker(marker),
                }}
              >
                <Popup>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200 }}>
                    <h6>{marker.text}</h6>
                    <span>Address: {marker.address}</span>
                    <BaseImage src={marker.imageUrl} size={200} alt={marker.text} />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </Container>
  )
}
