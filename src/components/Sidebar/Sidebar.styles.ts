import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { sidebarWidth } from '../../common/theme'
import { IconButton } from '../base/IconButton/IconButton'

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

export const SidebarContainer = styled.aside`
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
  }
`

export const StyledIconButton = styled(IconButton)`
  position: fixed;
  top: ${(p) => p.theme.spacing.lg};
  left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.md})`};
  ${extraButtonStyles};

  border-color: ${({ theme }) => theme.colors.borderExtraButton};

  & svg {
    stroke: ${(p) => p.theme.colors.iconOnSurface3};

    path {
      fill: ${(p) => p.theme.colors.iconOnSurface3};
    }
  }
`
