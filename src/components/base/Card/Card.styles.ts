import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(p) => p.theme.spacing.xxs};
  margin-right: ${(p) => p.theme.spacing.xl};
  color: ${(p) => p.theme.colors.textNeutral};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
`

export const CardContainer = styled.div<{ hasTopContent: boolean }>`
  border: 1px solid ${(p) => p.theme.colors.borderPrimary};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${(p) => (p.hasTopContent ? p.theme.spacing.xs : p.theme.spacing.xl)}
    ${(p) => p.theme.spacing.xl} ${(p) => p.theme.spacing.xl};
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
