import styled, { css } from 'styled-components'
import { ButtonSize, ButtonVariant } from './Button.types'
import { AppTheme } from '../../../common/types'

const getButtonStyles = (size: ButtonSize, theme: AppTheme) => {
  switch (size) {
    case 'sm':
      return css`
        font-size: ${theme.fontSize.sm};
        min-width: 130px;
      `
    case 'lg':
      return css`
        font-size: ${theme.fontSize.md};
        min-width: 230px;
      `

    case 'xl':
      return css`
        font-size: ${theme.fontSize.md};
        min-width: 100%;
      `
    case 'md':
    default:
      return css`
        font-size: ${theme.fontSize.md};
        min-width: 180px;
      `
  }
}

const getButtonVariantStyles = (variant: ButtonVariant, theme: AppTheme) => {
  switch (variant) {
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.textStrong};
        border-color: ${theme.colors.borderStrong};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.surface5};
          border-color: ${theme.colors.borderIntense};
        }
      `
    case 'warning':
      return css`
        background-color: ${theme.colors.surfaceAlert};
        color: ${theme.colors.textOnSurfaceAlert};
        border-color: ${theme.colors.borderAlert};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.surfaceAlertStrong};
          border-color: ${theme.colors.borderAlert};
        }
      `
    case 'primary':
    default:
      return css`
        background-color: ${theme.colors.surface2};
        color: ${theme.colors.textOnSurface2};
        border-color: ${theme.colors.borderIntense};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.surface4};
          border-color: ${theme.colors.borderIntense};
        }
      `
  }
}

export const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  disabled: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  font-weight: ${(p) => p.theme.fontWeight.medium};
  border-radius: ${(p) => p.theme.radius.md};
  transition: all 0.3s;
  padding: ${(p) => `${p.theme.spacing.sm} ${p.theme.spacing.xxs}`};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ $variant, theme }) => getButtonVariantStyles($variant, theme)}
  ${({ $size, theme }) => getButtonStyles($size, theme)}
  &:focus-visible,
  &:focus-within {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }

  &:hover:disabled {
    border-color: ${(p) => p.theme.colors.disabled};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: ${theme.colors.disabled};
      border-color: ${theme.colors.disabled};
      color: ${theme.colors.textNeutral};
    `}
`
