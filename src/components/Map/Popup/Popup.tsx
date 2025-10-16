import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PopupBody, PopupHeader, PopupTitle, PropertyLink, StyledPopup } from './Popup.styles'
import { MarkerDataFull } from '../../../common/types'
import { InfoRow } from '../../InfoRow/InfoRow'

type PopupProps = {
  marker: MarkerDataFull
}

/**
 * `Popup` is a component that displays a popup with detailed information about a marker.
 * It's designed for use within a map or similar interface to show key details in a modal-like view.
 *
 * @param  marker - The full data object for the marker to be displayed in the popup.
 *
 * @example
 * <Popup marker={{
 * id: 1,
 * label: 'Installation site',
 * clientFullName: 'John Doe',
 * clientEmail: 'john.doe@example.com',
 * clientPhone: '555-123-4567',
 * status: 'active'
 * }} />
 */
export const Popup = ({ marker }: PopupProps) => {
  const { t } = useTranslation()
  const popupRef = useRef(null)
  const isDefaultStatus = marker.status === 'default'

  if (!marker) {
    return null
  }

  return (
    <StyledPopup ref={popupRef} aria-modal="true" aria-labelledby={`popup-title-${marker.id}`}>
      <PopupHeader>
        <PopupTitle id={`popup-title-${marker.id}`}>
          {marker.label}
          <PropertyLink to={`/properties/${marker.id}`}>{t('popup>seeMore')}</PropertyLink>
        </PopupTitle>
      </PopupHeader>
      <PopupBody>
        <InfoRow label={t('popup>client')} value={marker.clientFullName} />
        <InfoRow label={t('popup>clientEmail')} value={marker.clientEmail} />
        {marker.clientPhone && (
          <InfoRow label={t('popup>clientPhone')} value={marker.clientPhone} />
        )}
        {!isDefaultStatus && (
          <InfoRow label={t('popup>status')} value={marker.status} valueVariant={marker.status} />
        )}
      </PopupBody>
    </StyledPopup>
  )
}
