import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { IconButton } from '../IconButton/IconButton'

export const DeleteIcon = styled(IconButton)`
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  &:focus {
    visibility: visible;
    opacity: 1;
  }
`

export const Wrapper = styled.div<{ width?: number; $hasDelete?: boolean }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};

  ${({ $hasDelete }) =>
    $hasDelete
      ? `
        &:focus,
        &:focus-visible {
          outline: none;
        }
      `
      : ''}
  &:hover,
  &:focus,
  &:focus-visible {
    ${DeleteIcon} {
      visibility: visible;
      opacity: 1;
    }
  }
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${(p) => p.theme.spacing.xxs};
`

export const Date = styled.time`
  margin-right: ${(p) => p.theme.spacing.xl};
  color: ${(p) => p.theme.colors.textNeutral};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
`

export const CardContainer = styled.div<{ $hasContent: boolean; $compact?: boolean }>`
  border: 1px solid ${(p) => p.theme.colors.borderPrimary};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${({ $hasContent, $compact, theme }) =>
    $compact ? theme.spacing.xs : $hasContent ? theme.spacing.xs : theme.spacing.xl};
  background: ${(p) => p.theme.colors.surface1};
`

export const CardHeaderRow = styled.div<{ $hasLinkOnly?: boolean }>`
  display: flex;
  justify-content: ${(p) => (p.$hasLinkOnly ? 'flex-end' : 'space-between')};
  gap: ${(p) => p.theme.spacing.xs};
  align-items: baseline;
  margin-bottom: ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.bold};
`

export const StyledLink = styled(Link)`
  width: 120px;
  text-align: right;
  color: ${(p) => p.theme.colors.textLink};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`

export const ChildWrapper = styled.div<{ $hasList?: boolean }>`
  white-space: pre-line;

  ${({ $hasList }) =>
    $hasList
      ? css`
          display: flex;
          flex-direction: column;
          gap: ${(p) => p.theme.spacing.lg};
        `
      : undefined}
`
