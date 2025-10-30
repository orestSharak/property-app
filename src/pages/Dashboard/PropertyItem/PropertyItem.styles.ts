import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Status } from '../../../common/types'

const getStatusColor = ($status, theme) => {
  switch ($status) {
    case 'news':
      return theme.colors.textPink
    case 'contract':
      return theme.colors.textInfo2
    case 'default':
      return theme.colors.textStrong
    default:
      return theme.colors.textStrong
  }
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.sm};
  width: 100%;
  background: ${(p) => p.theme.colors.surface7};
  border: 1px solid ${(p) => p.theme.colors.borderSecondary};
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.spacing.sm};

  &:hover,
  &:focus-visible,
  &:focus-within {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: 300px;
  }
`

export const ClientSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.xs};
  max-width: 450px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    max-width: 100%;
  }
`

export const ClientContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.xxs};
  background: ${(p) => p.theme.colors.surface1};
  border: 1px solid ${(p) => p.theme.colors.borderSecondary};
  border-radius: ${(p) => p.theme.radius.sm};
  padding: ${(p) =>
    `${p.theme.spacing.xxs} ${p.theme.spacing.xs} ${p.theme.spacing.xxs} ${p.theme.spacing.xxs}`};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`

export const ClientText = styled.span<{ $isLabel?: boolean }>`
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $isLabel, theme }) => ($isLabel ? theme.colors.textNeutral : theme.colors.textMain)};
`

export const AddressSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  width: 100%;
  padding-bottom: ${(p) => p.theme.spacing.sm};
  border-bottom: 1px solid ${(p) => p.theme.colors.separator};
`

export const AddressTitle = styled.span`
  color: ${(p) => p.theme.colors.textMain};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`

export const StatusWrapper = styled.span<{ $status?: Status }>`
  margin-left: auto;
  font-size: ${(p) => p.theme.fontSize.xs};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  padding: ${(p) => `${p.theme.spacing.xxs} ${p.theme.spacing.xs}`};
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${({ $status, theme }) => getStatusColor($status, theme)};
  color: ${({ $status, theme }) => getStatusColor($status, theme)};
`

export const IconWrapper = styled.div<{ $status?: Status }>`
  margin-right: ${(p) => p.theme.spacing.sm};

  & svg {
    path {
      fill: ${({ $status, theme }) => {
        switch ($status) {
          case 'news':
            return theme.colors.surfacePink
          case 'contract':
            return theme.colors.surfaceInfo
          case 'default':
            return theme.colors.surface2
        }
      }};
    }
  }
`

export const PropertyLink = styled(Link)`
  color: ${(p) => p.theme.colors.textLink};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  margin-left: auto;
`
