import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import SearchIcon from '../../assets/icons/search-icon.svg'
import { HeaderCell } from './HeaderCell/HeaderCell'
import {
  HeaderRow,
  NoDataContainer,
  NoDataText,
  ScrollableTableBody,
  StyledTable,
  TableBody,
  TableDataCell,
  TableRow,
} from './Table.styles'
import { handleArrowKeyNavigation } from './helpers/helpers'

type TableProps = {
  data: any[]
  columns: ColumnDef<any, any>[]
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
}

export default function Table({ data, columns, globalFilter, setGlobalFilter }: TableProps) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId) ?? '')
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    },
    enableSorting: true,
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    handleArrowKeyNavigation(event)
  }

  return (
    <StyledTable role="table" aria-label={'Client table'}>
      {/* HEADER REMAINS OUTSIDE THE SCROLLABLE WRAPPER */}
      <thead role="rowgroup">
        {table.getHeaderGroups().map((headerGroup) => (
          <HeaderRow key={headerGroup.id} role="row">
            {headerGroup.headers.map((header) => (
              <HeaderCell key={header.column.id} header={header} />
            ))}
          </HeaderRow>
        ))}
      </thead>

      {/* BODY CONTENT IS WRAPPED IN THE SCROLLABLE CONTAINER */}
      <ScrollableTableBody>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id} $isOdd={index % 2 !== 0} role="row">
                {row.getVisibleCells().map((cell) => (
                  <TableDataCell
                    tabIndex={0}
                    key={cell.id}
                    size={cell.column.columnDef.size as number}
                    role="cell"
                    onKeyDown={handleKeyDown}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableDataCell>
                ))}
              </TableRow>
            ))
          ) : (
            // This 'No Data' row needs a full span cell to look correct
            // NOTE: Using the first column's size to span.
            <TableRow $isOdd={false} role="row">
              <TableDataCell size={1}>
                <NoDataContainer>
                  <SearchIcon />
                  <NoDataText>{t('table>noResult')}</NoDataText>
                </NoDataContainer>
              </TableDataCell>
            </TableRow>
          )}
        </TableBody>
      </ScrollableTableBody>
    </StyledTable>
  )
}
