import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconWrapper,
  LanguageToggle,
  NavItem,
  NavList,
  SidebarContainer,
  StyledNavLink,
} from './Sidebar.styles'
import DashboardIcon from '../../assets/icons/dashboard-icon.svg'
import MarkerIcon from '../../assets/icons/marker-icon.svg'
import ClientsIcon from '../../assets/icons/clients-icon.svg'
import PropertyIcon from '../../assets/icons/property-icon.svg'
import GlobeIcon from '../../assets/icons/globe-icon.svg'
import { useAuth } from '../../context/AuthContext'
import UserDetails from './UserDetails/UserDetails'

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const { currentUser } = useAuth()

  const sidebarLinks = [
    { name: t('sidebar>dashboard'), path: '/dashboard', icon: <DashboardIcon /> },
    { name: t('sidebar>cities'), path: '/cities', icon: <MarkerIcon /> },
    { name: t('sidebar>clients'), path: '/clients', icon: <ClientsIcon /> },
    { name: t('sidebar>properties'), path: '/properties', icon: <PropertyIcon /> },
    { name: t('sidebar>settings'), path: '/settings', icon: <PropertyIcon /> },
  ]

  const handleLanguageToggle = async () => {
    const currentLang = i18n.language
    console.log('click')

    if (currentLang === 'en') {
      await i18n.changeLanguage('it')
    } else if (currentLang === 'it') {
      await i18n.changeLanguage('en')
    } else {
      await i18n.changeLanguage('it')
    }
  }

  const getButtonText = () => {
    const currentLang = i18n.language

    if (currentLang === 'en') {
      return t('sidebar>en')
    } else {
      return t('sidebar>it')
    }
  }

  return (
    <SidebarContainer aria-label={t('sidebar>sidebar')}>
      <LanguageToggle tabIndex={0} onClick={handleLanguageToggle}>
        <IconWrapper>
          <GlobeIcon />
        </IconWrapper>
        {getButtonText()}
      </LanguageToggle>

      <nav role="navigation" aria-label={t('sidebar>sidebar')}>
        <NavList>
          {currentUser &&
            sidebarLinks.map(({ name, path, icon }) => (
              <NavItem key={path} role="none">
                <StyledNavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                  <IconWrapper>{icon}</IconWrapper>
                  {name}
                </StyledNavLink>
              </NavItem>
            ))}
        </NavList>
      </nav>

      {currentUser && <UserDetails />}
    </SidebarContainer>
  )
}

export default memo(Sidebar)
