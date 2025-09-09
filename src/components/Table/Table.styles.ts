import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  padding: ${(p) => p.theme.spacing.lg};
`

export const StyledTable = styled.table`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.colors.boxShadow4};
  display: flex;
  flex-direction: column;
`
export const HeaderRow = styled.tr`
  background-color: ${(p) => p.theme.colors.surface7};
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
  display: flex;
`

export const TableRow = styled.tr<{ isOdd: boolean }>`
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
  display: flex;

  &:hover {
    background-color: ${(p) => p.theme.colors.surface8};
  }

  &:last-child {
    border-bottom: none;
  }

  background-color: ${({ isOdd, theme }) =>
    isOdd ? theme.colors.surface7 : theme.colors.surface9};
`

export const TableBody = styled.tbody`
  background-color: ${(p) => p.theme.colors.surface1};
  display: flex;
  flex-direction: column;
`

export const TableDataCell = styled.td<{ size?: number }>`
  flex: ${({ size }) => (size ? size : '1 0 180px')};
  padding: ${(p) => `${p.theme.spacing.xxs} ${p.theme.spacing.md}`};
  margin-bottom: 1px; // for a focus box shadow
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.fontSize.md};
  color: ${(p) => p.theme.colors.textMain};
  white-space: pre-line;

  &:focus,
  &:focus-visible {
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }
`

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.spacing.md};
  text-align: center;

  & > svg {
    margin-bottom: ${(p) => p.theme.spacing.sm};
    width: ${(p) => p.theme.spacing.lg};
    height: ${(p) => p.theme.spacing.lg};
    color: ${(p) => p.theme.colors.textSecondary};
  }
`
export const NoDataText = styled.h4`
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  color: ${(p) => p.theme.colors.textSecondary};
`
