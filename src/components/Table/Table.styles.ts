import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.colors.boxShadow4};
  display: flex;
  overflow: scroll;
  flex-direction: column;
`

export const StyledTableHead = styled.thead`
  min-width: fit-content;
`

export const HeaderRow = styled.tr`
  background-color: ${(p) => p.theme.colors.surface7};
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
  display: flex;
  position: sticky;
  top: 148px;
  z-index: ${(p) => p.theme.orderLevel.tableHeader};
`

export const TableRow = styled.tr<{ $isOdd: boolean }>`
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
  display: flex;

  &:hover {
    background-color: ${(p) => p.theme.colors.surface8};
  }

  &:last-child {
    border-bottom: none;
  }

  background-color: ${({ $isOdd, theme }) =>
    $isOdd ? theme.colors.surface7 : theme.colors.surface1};
`

export const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: fit-content;
  max-height: calc(100vh - 221px);
  background-color: ${(p) => p.theme.colors.surface1};
`

export const TableDataCell = styled.td<{ size?: number }>`
  flex: ${({ size }) => (size ? size : '1 0 180px')};
  padding: ${(p) => `${p.theme.spacing.sm} ${p.theme.spacing.md}`};
  margin-bottom: 1px; // for a focus box shadow
  font-weight: ${(p) => p.theme.fontWeight.medium};
  font-size: ${(p) => p.theme.fontSize.md};
  color: ${(p) => p.theme.colors.textMain};
  white-space: pre-line;
  min-width: 150px;

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
export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
