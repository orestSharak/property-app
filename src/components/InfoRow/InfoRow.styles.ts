import styled from 'styled-components'
import { Status } from '../../common/types'

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

export const Value = styled.span<{ variant: Status }>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'news':
        return theme.colors.textInfo
      case 'contract':
        return theme.colors.textPink
      case 'default':
      default:
        return theme.colors.textMain
    }
  }};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  white-space: pre-line;
`
