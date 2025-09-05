import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
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
  margin-left: auto;
`

export const Title = styled.h3`
  color: ${(p) => p.theme.colors.textMain};
  font-size: ${(p) => p.theme.fontSize.lg};
  font-weight: ${(p) => p.theme.fontWeight.bold};
  margin-bottom: 0;
  margin-left: ${(p) => p.theme.spacing.xl};
`

export const CardContainer = styled.div<{ hasContent: boolean; compact?: boolean }>`
  border: 1px solid ${(p) => p.theme.colors.borderPrimary};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${({ hasContent, compact, theme }) =>
    compact ? theme.spacing.xs : hasContent ? theme.spacing.xs : theme.spacing.xl};
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
  font-weight: ${(p) => p.theme.fontWeight.normal};
`

export const StyledLink = styled(Link)`
  width: 120px;
  text-align: right;
`

export const ChildWrapper = styled.div<{ hasList?: boolean }>`
  ${({ hasList }) =>
    hasList
      ? css`
          display: flex;
          flex-direction: column;
          gap: ${(p) => p.theme.spacing.lg};
        `
      : undefined}
`
