import styled from 'styled-components'
import { Status } from '../../common/types'

const getStatusColor = ($status, theme) => {
  if ($status === 'news') {
    return theme.colors.textPink
  }
  if ($status === 'contract') {
    return theme.colors.textInfo
  }
  return theme.colors.textMain
}

export const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${(p) => p.theme.spacing.md};
  background: ${(p) => p.theme.colors.surface1};
`

export const Label = styled.span`
  color: ${(p) => p.theme.colors.textNeutral};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  min-width: 80px;
`

export const Value = styled.span<{ $variant: Status }>`
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  white-space: pre-line;
  word-break: break-all;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    word-break: break-word;
  }

  ${({ $variant, theme }) => {
    const color = getStatusColor($variant, theme)
    const shouldApplyBorder = $variant === 'news' || $variant === 'contract'

    return `
      color: ${color};
      
      ${
        shouldApplyBorder
          ? `
          border: 1px solid ${color};
          border-radius: ${theme.radius.sm};
          padding: ${theme.spacing.xxs} ${theme.spacing.xs};
        `
          : ''
      }
    `
  }}
`
