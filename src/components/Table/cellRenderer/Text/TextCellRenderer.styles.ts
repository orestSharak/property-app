import styled from 'styled-components'
import { Status } from '../../../../common/types'

export const Text = styled.span<{ $status?: Status }>`
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.fontSize.md};

  color: ${({ $status, theme }) =>
    $status === 'news'
      ? theme.colors.textPink
      : $status === 'contract'
        ? theme.colors.textInfo
        : theme.colors.textMain};
`
