import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { sidebarWidth } from '../../common/theme'

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

export const LanguageToggle = styled.button`
  position: fixed;
  top: ${(p) => p.theme.spacing.sm};
  left: ${(p) => p.theme.spacing.sm};
  background: transparent;

  ${linkStyles}
  &:hover {
    border-color: transparent;
  }
`

export const IconWrapper = styled.div`
  margin-right: ${(p) => p.theme.spacing.sm};

  & svg {
    stroke: currentColor;
  }
`
