import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconWrapper,
  LanguageIconButton,
  NavItem,
  NavList,
  SidebarContainer,
  StyledIconButton,
  StyledNavLink,
} from './Sidebar.styles'
import DashboardIcon from '../../assets/icons/dashboard-icon.svg'
import MarkerIcon from '../../assets/icons/marker-icon.svg'
import ClientsIcon from '../../assets/icons/clients-icon.svg'
import PropertyIcon from '../../assets/icons/property-icon.svg'
import GlobeIcon from '../../assets/icons/globe-icon.svg'
import SettingsIcon from '../../assets/icons/settings-icon.svg'
import { useAuth } from '../../context/AuthContext'
import UserDetails from './UserDetails/UserDetails'

import MoonIcon from '../../assets/icons/moon-icon.svg'
import SunIcon from '../../assets/icons/sun-icon.svg'
import { useTheme } from '../../context/ThemeContext'

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const { currentUser } = useAuth()
  const { themeMode, toggleTheme } = useTheme()

  const sidebarLinks = [
    { name: t('sidebar>dashboard'), path: '/dashboard', icon: <DashboardIcon /> },
    { name: t('sidebar>cities'), path: '/cities', icon: <MarkerIcon /> },
    { name: t('sidebar>clients'), path: '/clients', icon: <ClientsIcon /> },
    { name: t('sidebar>properties'), path: '/properties', icon: <PropertyIcon /> },
    { name: t('sidebar>settings'), path: '/settings', icon: <SettingsIcon /> },
  ]

  const handleLanguageToggle = async () => {
    const currentLang = i18n.language

    if (currentLang === 'en') {
      await i18n.changeLanguage('it')
    } else if (currentLang === 'it') {
      await i18n.changeLanguage('en')
    } else {
      await i18n.changeLanguage('it')
    }
  }

  return (
    <SidebarContainer aria-label={t('sidebar>sidebar')}>
      <LanguageIconButton
        noTooltip
        title={t('sidebar>language')}
        icon={<GlobeIcon />}
        onClick={handleLanguageToggle}
      />
      <StyledIconButton
        noTooltip
        icon={themeMode === 'light' ? <MoonIcon /> : <SunIcon />}
        title={themeMode === 'dark' ? t('sidebar>light') : t('sidebar>dark')}
        onClick={toggleTheme}
      />
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
