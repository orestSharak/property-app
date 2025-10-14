import styled from 'styled-components'
import { Size } from './Heasder.types'

export const Container = styled.header<{ $mobileCentered?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${(p) => p.theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    align-self: ${({ $mobileCentered }) => ($mobileCentered ? 'center' : 'flex-start')};
  }
`

export const Title = styled.h1<{ $size: Size; $marginBottom?: number }>`
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${({ $size, theme }) => {
    switch ($size) {
      case 'lg':
        return theme.fontSize.xl
      case 'md':
        return theme.fontSize.lg
      case 'sm':
      default:
        return theme.fontSize.md
    }
  }};
  font-weight: ${({ $size, theme }) =>
    $size === 'lg' ? theme.fontWeight.semibold : theme.fontWeight.bold};
  margin: ${({ $marginBottom }) => ($marginBottom ? `0 0 ${$marginBottom}px 0` : 0)};
`

export const Count = styled.span`
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => p.theme.colors.textOnSurface6};
  background-color: ${(p) => p.theme.colors.surface6};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  padding: ${(p) => `${p.theme.spacing.xxxs} ${p.theme.spacing.xs}`};
`
