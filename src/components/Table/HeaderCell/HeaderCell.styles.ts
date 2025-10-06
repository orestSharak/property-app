import styled from 'styled-components'

export const TableHeaderCell = styled.th<{ $canSort: boolean; size?: number }>`
  flex: ${({ size }) => (size ? size : '1 0 180px')};
  text-align: left;
  cursor: ${({ $canSort }) => ($canSort ? 'pointer' : 'default')};
  color: ${(p) => p.theme.colors.textSecondary};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  font-size: ${(p) => p.theme.fontSize.sm};
  position: relative;
  padding: ${(p) => `${p.theme.spacing.sm} ${p.theme.spacing.md}`};
  transition: all 0.2s;
  white-space: pre-line;
  min-width: 150px;

  &:hover {
    color: ${(p) => p.theme.colors.textMain};
  }

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  &:after {
    position: absolute;
    top: ${(p) => p.theme.spacing.xs};
    right: 0;
    content: '|';
    font-size: ${(p) => p.theme.fontSize.md};
    color: ${(p) => p.theme.colors.textOnSurface3};
  }
`
export const SortIndicator = styled.span`
  margin-left: ${(p) => p.theme.spacing.xs};
  font-size: ${(p) => p.theme.fontSize.sm};
  color: ${(p) => p.theme.colors.surface5};
`
