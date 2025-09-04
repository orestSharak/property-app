import styled from 'styled-components'
import { Size } from './Heasder.types'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const Title = styled.h1<{ $size: Size }>`
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${({ $size, theme }) => ($size === 'lg' ? theme.fontSize.xl : theme.fontSize.md)};
  font-weight: ${({ $size, theme }) =>
    $size === 'lg' ? theme.fontWeight.semibold : theme.fontWeight.medium};
  margin: 0;
`

export const Count = styled.span`
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => p.theme.colors.textOnSurface6};
  background-color: ${(p) => p.theme.colors.surface6};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  padding: ${(p) => `${p.theme.spacing.xxxs} ${p.theme.spacing.xs}`};
`
