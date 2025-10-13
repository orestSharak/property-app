import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Status } from '../../../common/types'
import {
  AddressSection,
  AddressTitle,
  ClientContent,
  ClientSection,
  ClientText,
  Container,
  IconWrapper,
  PropertyLink,
  StatusWrapper,
} from './PropertyItem.styles'
import HouseIcon from '../../../assets/icons/house-icon-raw.svg'
import { useMediaQuery } from '../../../hooks/helpers/useMediaQuery'

type PropertyItemProps = {
  id: string
  address: string
  clientFullName: string
  clientPhone: string
  status: Status
  city: string
  onMouseEnterOrFocus: (id: string) => void
  onMouseLeaveOrBlur: () => void
}

function PropertyItem({
  id,
  address,
  clientFullName,
  clientPhone,
  status,
  city,
  onMouseEnterOrFocus,
  onMouseLeaveOrBlur,
}: PropertyItemProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery()
  const navigate = useNavigate()

  const handleActivate = () => {
    onMouseEnterOrFocus(id)
  }

  const handleNavigate = () => {
    if (isMobile) {
      navigate(`/properties/${id}`)
    } else {
      return
    }
  }

  const handleDeactivate = onMouseLeaveOrBlur

  return (
    <Container
      tabIndex={0}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
      onClick={handleNavigate}
    >
      <AddressSection>
        <IconWrapper $status={status}>
          <HouseIcon />
        </IconWrapper>
        <AddressTitle>{`${address}, ${city}`}</AddressTitle>
        {status && status !== 'default' && (
          <StatusWrapper $status={status}>{t(`dashboard>propertyItem>${status}`)}</StatusWrapper>
        )}
      </AddressSection>
      <ClientSection>
        <ClientContent>
          <ClientText $isLabel>{t('dashboard>propertyItem>name')}</ClientText>
          <ClientText>{clientFullName}</ClientText>
        </ClientContent>
        {clientPhone && (
          <ClientContent>
            <ClientText $isLabel>{t('dashboard>propertyItem>phone')}</ClientText>
            <ClientText>{clientPhone}</ClientText>
          </ClientContent>
        )}
        {!isMobile && (
          <PropertyLink to={`/properties/${id}`}>
            {t('dashboard>propertyItem>seeMore')}
          </PropertyLink>
        )}
      </ClientSection>
    </Container>
  )
}

export default memo(PropertyItem)
