import styled, { css } from 'styled-components'
import { Size } from './IconButton.types'

export const StyledIconButton = styled.button<{
  $size: Size
  $color: string
  $disabled: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.surface1};
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.borderPrimary};
  padding: ${(p) => p.theme.spacing.xs};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.2s;
  min-width: ${({ theme }) => theme.spacing.xxl};

  &:hover,
  &:focus-visible,
  &:focus-within {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    background: ${({ $disabled, theme }) =>
      $disabled ? theme.colors.disabled : theme.colors.surface7};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }

  & > svg {
    ${({ $size }) =>
      $size === 'md'
        ? css`
            width: ${({ theme }) => theme.iconSize.md};
            height: ${({ theme }) => theme.iconSize.md};
          `
        : css`
            width: ${({ theme }) => theme.iconSize.sm};
            height: ${({ theme }) => theme.iconSize.sm};
          `}
  }

  path {
    ${({ $color, theme }) => css`
      fill: ${$color ? $color : theme.colors.surface3};
    `}
  }
`
