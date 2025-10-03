import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Description, IconWrapper, PageNotFoundContainer, Title } from './PageNotFound.styles'
import { Button } from '../../components/base/Button/Button'
import HouseIcon from '../../assets/icons/house-icon-raw.svg'

function PageNotFound() {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(currentUser ? '/dashboard' : '/login')
  }

  return (
    <PageNotFoundContainer>
      <IconWrapper>
        <HouseIcon />
      </IconWrapper>
      <Title>{t('pageNotFound>notFound')}</Title>
      <Description>{t('pageNotFound>notFoundDescription')}</Description>
      <Button onClick={handleGoHome}>
        {currentUser ? t('pageNotFound>goToDashboard') : t('pageNotFound>goToLogin')}
      </Button>
    </PageNotFoundContainer>
  )
}

export default PageNotFound
