import styled from 'styled-components'
import { Status } from '../../../../common/types'

const getStatusColor = ($status, theme) => {
  if ($status === 'news') {
    return theme.colors.textPink
  }
  if ($status === 'contract') {
    return theme.colors.textInfo
  }
  return theme.colors.textMain
}

export const Text = styled.span<{ $status?: Status }>`
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.fontSize.md};
  word-break: break-all;
  white-space: pre-line;

  ${({ $status, theme }) => {
    const color = getStatusColor($status, theme)
    const shouldApplyBorder = $status === 'news' || $status === 'contract'

    return `
      color: ${color};
      
      ${
        shouldApplyBorder
          ? `
          border: 1px solid ${color};
          border-radius: ${theme.radius.sm};
          padding: ${theme.spacing.xxs} ${theme.spacing.xs};
        `
          : ''
      }
    `
  }}
`
