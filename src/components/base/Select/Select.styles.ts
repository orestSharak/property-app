import styled, { css } from 'styled-components'
import { SelectDirection } from './Select.types'

export const SelectWrapper = styled.div<{ $direction: SelectDirection }>`
  ${({ $direction }) =>
    $direction === 'overline'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: baseline;
          gap: ${(p) => p.theme.spacing.xl};
        `}
  display: flex;
`

export const Label = styled.label<{ disabled?: boolean; $direction: SelectDirection }>`
  width: 155px;
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

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`

export const StyledButton = styled.button<{
  $hasError?: boolean
  disabled?: boolean
  $open?: boolean
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: ${(p) => `0 ${p.theme.spacing.xxl} 0 ${p.theme.spacing.sm}`};
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.disabled : theme.colors.surface1};
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.colors.borderAlert : theme.colors.borderPrimary)};
  border-radius: ${(p) => p.theme.radius.md};
  outline: none;
  font-size: ${(p) => p.theme.radius.md}
  color: ${({ disabled, theme }) => (disabled ? theme.colors.disabled : theme.colors.textMain)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: none;
  position: relative;
  transition: all 0.2s;

  &:hover,
  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.borderAlert : theme.colors.borderPrimary};
    box-shadow: 0 0 0 2px ${({ $hasError, theme }) =>
      $hasError ? theme.colors.boxShadowAlert : theme.colors.boxShadowInfo};
  }

  &:disabled {
    background: ${(p) => p.theme.colors.disabled};
    color: ${(p) => p.theme.colors.textNeutral};
    cursor: not-allowed;
  }
`

export const DisplayText = styled.span<{ selected?: boolean; disabled?: boolean }>`
  flex: 1;
  text-align: left;
  opacity: ${({ selected }) => (selected ? 1 : 0.55)};
  color: ${({ selected, disabled, theme }) =>
    disabled
      ? theme.colors.textNeutral
      : selected
        ? theme.colors.textStrong
        : theme.colors.textSecondary};
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const IconContainer = styled.span<{ $open?: boolean; $disabled?: boolean }>`
  position: absolute;
  right: ${(p) => p.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.spacing.xl};

  svg {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    display: block;
    opacity: ${({ $disabled }) => ($disabled ? 0.2 : 0.4)};
  }
`

export const DropList = styled.ul`
  max-height: 210px;
  min-width: 100%;
  overflow-y: auto;
  cursor: pointer;
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  left: 0;
  top: calc(100% + 3px);
  z-index: ${(p) => p.theme.orderLevel.selectDropdown};
  background: ${(p) => p.theme.colors.surface1};
  border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
  border-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.colors.boxShadow1};
`

export const DropItem = styled.li<{
  $highlighted?: boolean
  selected?: boolean
  disabled?: boolean
}>`
  padding: ${(p) => `${p.theme.spacing.xs} ${p.theme.spacing.sm}`};
  color: ${({ $highlighted, disabled, theme }) =>
    disabled
      ? theme.colors.textSecondary
      : $highlighted
        ? theme.colors.textStrong
        : theme.colors.textStrong};
  background: ${({ $highlighted, disabled, theme }) =>
    disabled ? theme.colors.disabled : $highlighted ? theme.colors.surface6Light : 'transparent'};
  font-weight: ${({ selected, theme }) =>
    selected ? theme.fontWeight.semibold : theme.fontWeight.normal};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        background: ${theme.colors.surface6Light};
      }
    `}
  &[aria-selected='true'] {
    background: ${(p) => p.theme.colors.surface6};
  }
`
export const HintText = styled.div`
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: ${(p) => p.theme.fontSize.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
`

export const ErrorText = styled.div`
  color: ${(p) => p.theme.colors.textAlert};
  font-size: ${(p) => p.theme.fontSize.xs};
  margin-top: ${(p) => p.theme.spacing.xxs};
`
