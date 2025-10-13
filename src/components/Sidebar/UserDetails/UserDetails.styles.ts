import styled from 'styled-components'

export const UserSectionContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface4};
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.spacing.xs};
  margin-top: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-top: ${(p) => p.theme.spacing.max};
  }
`

export const UserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0; /* Essential for flex items with overflow: hidden */
`

export const UserName = styled.span`
  font-weight: ${(p) => p.theme.fontWeight.medium};
  color: ${(p) => p.theme.colors.textOnSurface3};
  font-size: ${(p) => p.theme.fontSize.md};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UserEmail = styled.span`
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  color: ${(p) => p.theme.colors.textOnSurface4};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const AuthActionButton = styled.button`
  border: none;
  background: none;
  padding: ${(p) => p.theme.spacing.xs};
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.sm};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surface3};
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }

  & > svg {
    width: ${(p) => p.theme.spacing.xl};
    height: ${(p) => p.theme.spacing.xl};
  }
`
