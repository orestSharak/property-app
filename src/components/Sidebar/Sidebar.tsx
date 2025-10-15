import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconWrapper,
  LanguageIconButton,
  MenuButton,
  NavItem,
  NavList,
  SidebarContainer,
  StyledBackdrop,
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
import MenuIcon from '../../assets/icons/menu-icon.svg'
import { useTheme } from '../../context/ThemeContext'

const Sidebar = () => {
  const { t, i18n } = useTranslation()

  const [openMenu, setOpenMenu] = useState(false)

  const { currentUser } = useAuth()
  const { themeMode, toggleTheme } = useTheme()

  const sidebarRef = useRef<HTMLElement>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpenMenu(false)
    }
  }, [])

  const handleSidebarClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, openMenu])

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

  const handleOpenMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu)
  }

  const visibleLinks = currentUser ? sidebarLinks : []

  return (
    <>
      <MenuButton onClick={handleOpenMenu} aria-label={t('sidebar>openMenu')}>
        <MenuIcon />
      </MenuButton>
      <StyledBackdrop $open={openMenu} onClick={handleOpenMenu}>
        <SidebarContainer
          onClick={handleSidebarClick}
          $open={openMenu}
          aria-label={t('sidebar>sidebar')}
          ref={sidebarRef}
        >
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
            {visibleLinks.length > 0 && (
              <NavList>
                {visibleLinks.map(({ name, path, icon }) => (
                  <NavItem key={path} onClick={handleOpenMenu}>
                    <StyledNavLink
                      to={path}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      <IconWrapper>{icon}</IconWrapper>
                      {name}
                    </StyledNavLink>
                  </NavItem>
                ))}
              </NavList>
            )}
          </nav>

          {currentUser && <UserDetails />}
        </SidebarContainer>
      </StyledBackdrop>
    </>
  )
}

export default memo(Sidebar)
