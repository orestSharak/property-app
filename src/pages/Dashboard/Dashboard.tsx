import React, { memo, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'
import { useGetProperties } from '../../hooks/property/useGetProperties'
import { useGetCities } from '../../hooks/city/useGetCities'

import {
  Container,
  InputSection,
  MapContainer,
  NoResult,
  PropertyWrapper,
  Wrapper,
} from './Dashboard.styles'
import { Header } from '../../components/Header/Header'

import { City, Property } from '../../common/types'
import { Map } from '../../components/Map/Map'
import { Select } from '../../components/base/Select/Select'
import { Input } from '../../components/base/Input/Input'
import SearchIcon from '../../assets/icons/search-icon.svg'

import PropertyItem from './PropertyItem/PropertyItem'
import { EMPTY_VALUE } from '../../common/constants'

import { useDebounce } from '../../hooks/useDebounce'

const preparedMarker = (property: Property[] | null) => {
  if (!property) return []
  return property.map((marker) => ({
    id: marker?.id,
    position: marker?.position,
    label: marker?.address,
    clientId: marker?.clientId,
    clientFullName: marker?.clientFullName,
    clientEmail: marker?.clientEmail,
    clientPhone: marker?.clientPhone,
    status: marker?.status,
  }))
}

const getDefaultOptions = (t: TFunction) => ({ value: '', label: t('dashboard>all') })

const preparedCityOptions = (cities: City[], t: TFunction) => {
  const options = cities?.map((city) => ({ value: city?.id, label: city?.name }))
  return cities ? [getDefaultOptions(t), ...options] : [getDefaultOptions(t)]
}

function Dashboard() {
  const { t } = useTranslation()

  const { properties } = useGetProperties()
  const { cities } = useGetCities()

  const [selectedCityId, setSelectedCityId] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null)

  const handleMouseEnterOrFocus = (id: string) => {
    setHoveredPropertyId(id)
  }

  const handleMouseLeaveOrBlur = () => {
    setHoveredPropertyId(null)
  }

  const debouncedSearch = useDebounce(search)

  const finalFilteredProperties = useMemo(() => {
    let result: Property[] = properties || []

    if (!result.length) return []

    if (selectedCityId && selectedCityId !== EMPTY_VALUE) {
      result = result.filter((property) => property.cityId === selectedCityId)
    }

    if (debouncedSearch) {
      const lowerCaseSearch = debouncedSearch.toLowerCase()

      result = result.filter((property) => {
        const searchableFields = [
          property.address,
          property.clientFullName,
          property.clientEmail,
          property.clientPhone || '',
          property.status,
        ]

        return searchableFields.some((field) => field.toLowerCase().includes(lowerCaseSearch))
      })
    }

    return result
  }, [properties, selectedCityId, debouncedSearch])

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const propertiesToDisplay = finalFilteredProperties
  const markersToDisplay = preparedMarker(propertiesToDisplay)

  return (
    <Wrapper>
      <Container>
        <Header title={t('dashboard>title')} hideCount />
        <InputSection>
          <Select
            id="city"
            direction="inline"
            label={t('dashboard>city')}
            placeholder={t('dashboard>selectCity')}
            options={preparedCityOptions(cities, t)}
            onChange={handleCityChange}
            value={selectedCityId}
            disabled={!cities?.length}
            hideLabel
            hint={!cities?.length ? t('dashboard>addCityFirst') : undefined}
          />
          <Input
            slotEnd={<SearchIcon />}
            placeholder={t('dashboard>search')}
            id="search"
            value={search.trimStart()}
            onChange={handleSearchChange}
            label={t('dashboard>search')}
            direction="inline"
            hideLabel
          />
        </InputSection>
        <Header
          size="sm"
          title={t('dashboard>numberOfProperties')}
          count={propertiesToDisplay.length}
        />
        {propertiesToDisplay.length > 0 ? (
          <PropertyWrapper>
            {propertiesToDisplay.map((property) => (
              <PropertyItem
                key={property?.id}
                id={property?.id}
                address={property?.address}
                clientFullName={property?.clientFullName}
                clientPhone={property?.clientPhone}
                status={property?.status}
                city={property?.city}
                onMouseEnterOrFocus={handleMouseEnterOrFocus}
                onMouseLeaveOrBlur={handleMouseLeaveOrBlur}
              />
            ))}
          </PropertyWrapper>
        ) : (
          <NoResult>{t('dashboard>noResults')}</NoResult>
        )}
      </Container>
      <MapContainer>
        {markersToDisplay.length > 0 && (
          <Map
            height={'calc(100vh - 108px)'}
            showPopup
            markers={markersToDisplay}
            citySet={!!selectedCityId || !!search}
            hoveredPropertyId={hoveredPropertyId}
          />
        )}
      </MapContainer>
    </Wrapper>
  )
}

export default memo(Dashboard)
