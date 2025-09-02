import styled from 'styled-components'

export const Label = styled.label<{ disabled?: boolean }>`
  width: 100px;
  margin-bottom: ${(p) => p.theme.spacing.xxs};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.disabled : theme.colors.textSecondary};
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
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

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextAreaContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.spacing.md};
`

export const StyledTextArea = styled.textarea<{
  hasError?: boolean
  slotEnd?: boolean
}>`
  min-height: 130px;
  width: 100%;
  min-width: 300px;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.colors.borderAlert : theme.colors.borderPrimary)};
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
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.colors.borderAlert : theme.colors.borderPrimary};
    box-shadow: 0 0 0 2px
      ${({ hasError, theme }) =>
        hasError ? theme.colors.boxShadowAlert : theme.colors.boxShadowInfo};
  }

  &:disabled,
  &:read-only {
    background: ${(p) => p.theme.colors.disabled};
    color: ${(p) => p.theme.colors.textNeutral};
    cursor: not-allowed;
  }
`
