import styled, { css } from 'styled-components'
import { InputDirection } from './Input.types'

export const IconContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing.lg};

  svg {
    width: ${({ theme }) => theme.spacing.md};
    height: ${({ theme }) => theme.spacing.md};
  }
`

export const Label = styled.label<{ disabled?: boolean; $direction: InputDirection }>`
  width: 100px;
  margin-bottom: ${(p) => p.theme.spacing.xxs};
  color: ${({ disabled, theme, $direction }) =>
    disabled
      ? theme.colors.disabled
      : $direction
        ? theme.colors.textStrong
        : theme.colors.textSecondary};
  display: block;
  font-size: ${({ theme, $direction }) =>
    $direction === 'inline' ? theme.fontSize.md : theme.fontSize.xs};
  font-weight: ${(p) => p.theme.fontWeight.normal};
`

export const LabelStar = styled.span`
  color: ${(p) => p.theme.colors.textAlert};
  margin: ${(p) => p.theme.spacing.xxxs};
`

export const ErrorText = styled.div`
  color: ${(p) => p.theme.colors.textAlert};
  font-size: ${(p) => p.theme.fontSize.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
`

export const HintText = styled.div`
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: ${(p) => p.theme.fontSize.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
`

export const InputWrap = styled.div<{ $direction: InputDirection }>`
  ${({ $direction }) =>
    $direction === 'overline'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: baseline;
          gap: ${(p) => p.theme.spacing.xxxl};
        `}
  display: flex;
`

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(p) => p.theme.spacing.md};
`

export const StyledInput = styled.input<{
  $hasError?: boolean
  $hasSlotEnd?: boolean
}>`
  width: 100%;
  min-width: 300px;
  height: 40px;
  padding: ${({ $hasSlotEnd, theme }) =>
    $hasSlotEnd
      ? css`
          ${theme.spacing.sm} ${theme.spacing.xxl} ${theme.spacing.sm} ${theme.spacing.sm}
        `
      : theme.spacing.sm};
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.borderAlert : theme.colors.borderPrimary)};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.colors.surface1};
  color: ${(p) => p.theme.colors.textMain};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.normal};
  transition: all 0.2s;

  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.borderAlert : theme.colors.borderPrimary};
    box-shadow: 0 0 0 2px
      ${({ $hasError, theme }) =>
        $hasError ? theme.colors.boxShadowAlert : theme.colors.boxShadowInfo};
  }

  &:disabled,
  &:read-only {
    background: ${(p) => p.theme.colors.disabled};
    color: ${(p) => p.theme.colors.textNeutral};
    cursor: not-allowed;
  }
`
