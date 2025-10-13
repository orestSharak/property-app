import styled, { css, keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { sidebarWidth } from '../../common/theme'
import { IconButton } from '../base/IconButton/IconButton'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const linkStyles = css`
  display: flex;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
  text-decoration: none;
  color: ${(p) => p.theme.colors.textOnSurface3};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  border-radius: ${(p) => p.theme.radius.xs};

  &:hover:not(.active) {
    & svg {
      stroke: ${(p) => p.theme.colors.surface6};

      path {
        fill: ${(p) => p.theme.colors.surface6};
      }
    }

    color: ${(p) => p.theme.colors.surface6};
    background: ${({ theme }) => theme.colors.surface2};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${(p) => p.theme.fontSize.lg};
  }
`

const extraButtonStyles = css`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.surface3};
  border-color: ${({ theme }) => theme.colors.surface1};
  transition: all 0.2s;

  & svg {
    transition: all 0.2s;
    stroke: ${(p) => p.theme.colors.surface1};

    path {
      transition: all 0.2s;
      fill: ${(p) => p.theme.colors.surface1};
    }
  }

  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.surface2};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.surface6};
    box-shadow: 0 0 0 1px ${(p) => p.theme.colors.surface6};
    background-color: ${({ theme }) => theme.colors.surface2};

    & svg {
      stroke: ${(p) => p.theme.colors.surface6};

      path {
        fill: ${(p) => p.theme.colors.surface6};
      }
    }
  }
`

export const SidebarContainer = styled.aside<{ $open: boolean }>`
  width: ${sidebarWidth};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface3};
  padding: ${(p) => `calc(${p.theme.spacing.max} + ${p.theme.spacing.sm})`}
    ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.md} ${(p) => p.theme.spacing.sm};
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: calc(100vw - 100px);
    left: ${({ $open }) => ($open ? '0' : '-100%')};
    border-radius: ${(p) => p.theme.radius.md};
  }
`

export const StyledBackdrop = styled.div<{ $open: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${(p) => p.theme.orderLevel.modalBackdrop};
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    background: ${(p) => p.theme.colors.gradientShadow};
    animation: ${fadeIn} 0.2s ease-in;
  }
`

export const MenuButton = styled.button`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: ${(p) => p.theme.spacing.lg};
    left: ${(p) => p.theme.spacing.md};
    padding: ${(p) => p.theme.spacing.xs};
    border-radius: ${(p) => p.theme.radius.round};
    z-index: ${(p) => p.theme.orderLevel.menuButton};
    background: ${(p) => p.theme.colors.surface1};
    border: none;
    cursor: pointer;

    &:focus {
      border-color: ${(p) => p.theme.colors.boxShadowInfo};
      background: ${({ theme }) => theme.colors.surface1};
      box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
      outline: none;
    }

    & svg {
      width: ${(p) => p.theme.spacing.xxl};
      height: ${(p) => p.theme.spacing.xxl};

      path {
        fill: ${(p) => p.theme.colors.iconOnSurface1};
      }
    }
  }
`

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const NavItem = styled.li`
  margin-bottom: ${(p) => p.theme.spacing.xxs};
`

export const StyledNavLink = styled(NavLink)`
  ${linkStyles}
  &.active {
    color: ${(p) => p.theme.colors.surface6};
    background: ${({ theme }) => theme.colors.surface2};
    font-weight: ${(p) => p.theme.fontWeight.semibold};

    & svg {
      stroke: ${(p) => p.theme.colors.surface6};

      path {
        fill: ${(p) => p.theme.colors.surface6};
      }
    }
  }
`

export const IconWrapper = styled.div`
  margin-right: ${(p) => p.theme.spacing.sm};

  & svg {
    stroke: currentColor;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: ${(p) => p.theme.spacing.xl};
      height: ${(p) => p.theme.spacing.xl};
    }
  }
`

export const LanguageIconButton = styled(IconButton)`
  top: ${(p) => p.theme.spacing.lg};
  left: ${(p) => p.theme.spacing.md};
  ${extraButtonStyles};

  border-color: ${({ theme }) => theme.colors.borderExtraButton};

  & svg {
    path {
      fill: ${(p) => p.theme.colors.iconOnSurface3};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: ${(p) => p.theme.spacing.xl};
      height: ${(p) => p.theme.spacing.xl};
    }
  }
`

export const StyledIconButton = styled(IconButton)`
  position: fixed;
  top: ${(p) => p.theme.spacing.lg};
  left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.md})`};
  ${extraButtonStyles};

  border-color: ${({ theme }) => theme.colors.borderExtraButton};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.lg})`};
  }

  & svg {
    stroke: ${(p) => p.theme.colors.iconOnSurface3};

    path {
      fill: ${(p) => p.theme.colors.iconOnSurface3};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: ${(p) => p.theme.spacing.xl};
      height: ${(p) => p.theme.spacing.xl};
    }
  }
`
