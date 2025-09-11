import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { SortIndicator, TableHeaderCell } from './HeaderCell.styles'
import { handleArrowKeyNavigation } from '../helpers/helpers'

export function HeaderCell({ header }: { header: any }) {
  const getSortIndicator = () => {
    if (header.column.getIsSorted() === 'asc') {
      return '▲'
    }
    if (header.column.getIsSorted() === 'desc') {
      return '▼'
    }
    return ''
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (event.key === 'Enter' && header.column.getCanSort()) {
      header.column.getToggleSortingHandler()(event)
    }
    handleArrowKeyNavigation(event)
  }

  return (
    <TableHeaderCell
      tabIndex={0}
      $canSort={header.column.getCanSort()}
      size={header.column.columnDef.size as number}
      onKeyDown={handleKeyDown}
      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
      role="cell"
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanSort() && <SortIndicator>{getSortIndicator()}</SortIndicator>}
    </TableHeaderCell>
  )
}
