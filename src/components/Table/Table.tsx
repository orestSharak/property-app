import React from 'react'
import {
  ColumnDef,
  createColumnHelper,
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
  StyledTable,
  TableBody,
  TableContainer,
  TableDataCell,
  TableRow,
} from './Table.styles'
import { handleArrowKeyNavigation } from './helpers/helpers'

// --- Interfaces ---

interface Client {
  fullName: string
  city: string
  address: string
  phoneNumber: string
  email: string
}

// --- Components ---

const defaultData: Client[] = [
  {
    fullName: 'Alessandro Curti',
    city: 'Torino',
    address: 'Vorem ipsum dolor sit amet, consectetur. Vorem ipsum dolor sit amet, consectetur ',
    phoneNumber: '+3345678900',
    email: 'test@gmail.com',
  },
  {
    fullName: 'Marco Rossi',
    city: 'Milano',
    address: 'Lorem ipsum dolor sit amet, consectetur',
    phoneNumber: '+3345678901',
    email: 'marco.rossi@gmail.com',
  },
  {
    fullName: 'Giulia Bianchi',
    city: 'Roma',
    address: 'Amet consectetur adipiscing elit',
    phoneNumber: '',
    email: 'giulia.b@gmail.com',
  },
]

const columnHelper = createColumnHelper<Client>()

const defaultColumns: ColumnDef<Client, any>[] = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Full name',
    size: 1.5,
  }),
  columnHelper.accessor('city', {
    id: 'city',
    header: 'City',
    size: 1,
  }),
  columnHelper.accessor('address', {
    id: 'address',
    header: 'Address',
    size: 2.5,
  }),
  columnHelper.accessor('phoneNumber', {
    id: 'phoneNumber',
    header: 'Phone number',
    size: 2,
    cell: (info) => (info.getValue() ? info.getValue() : '—'),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
    size: 2.5,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: () => (
      // creat a cell renderers
      <TableDataCell className="actions">
        <span className="action-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </span>
      </TableDataCell>
    ),
    enableSorting: false,
    size: 1,
  }),
]

export default function Table() {
  const { t } = useTranslation()
  const [data] = React.useState<Client[]>(() => [...defaultData])
  const [globalFilter, setGlobalFilter] = React.useState<string>('')
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Client, any>[]>(() => defaultColumns, [])

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
    <TableContainer>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search"
        style={{ marginBottom: 25 }}
      />
      <StyledTable role="table" aria-label={'Client table'}>
        <thead role="rowgroup">
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow key={headerGroup.id} role="row">
              {headerGroup.headers.map((header) => (
                <HeaderCell key={header.column.id} header={header} />
              ))}
            </HeaderRow>
          ))}
        </thead>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id} isOdd={index % 2 !== 0} role="row">
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
            <NoDataContainer>
              <SearchIcon />
              <NoDataText>{t('table>noResult')}</NoDataText>
            </NoDataContainer>
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}
