import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { City, Property } from '../../common/types'
import TextCellRenderer from '../../components/Table/cellRenderer/Text/TextCellRenderer'
import ActionsCellRenderer from '../../components/Table/cellRenderer/Actions/ActionsCellRenderer'

const columnHelper = createColumnHelper<City>()

export const columnDefinition: (
  t: TFunction,
  handleView: (id: string) => void,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => ColumnDef<City, any>[] = (
  t: TFunction,
  handleView: (id: string) => void,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => [
  columnHelper.accessor('name', {
    id: 'name',
    header: t('cities>table>name'),
    size: 3,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),

  columnHelper.accessor('properties', {
    id: 'properties',
    header: t('cities>table>numberOfProperties'),
    size: 1,
    cell: (info) => {
      const count = info.getValue() ? String(Object.values(info.getValue())?.length) : ''
      return <TextCellRenderer title={count} />
    },
  }),

  columnHelper.accessor('properties', {
    id: 'contract',
    header: t('cities>table>numberOfContracts'),
    size: 1,
    cell: (info) => {
      const contractsCount = info.getValue()
        ? String(
            Object.values(info.getValue())?.filter((item: Property) => item.status === 'contract')
              ?.length,
          )
        : ''
      return <TextCellRenderer isContract title={contractsCount} />
    },
  }),

  columnHelper.accessor('properties', {
    id: 'news',
    header: t('cities>table>numberOfNews'),
    size: 1,
    cell: (info) => {
      const newsCount = info.getValue()
        ? String(
            Object.values(info.getValue())?.filter((item: Property) => item.status === 'news')
              ?.length,
          )
        : ''
      return <TextCellRenderer isNews title={newsCount} />
    },
  }),

  columnHelper.accessor('id', {
    id: 'id',
    header: t('cities>table>actions'),
    cell: (info) => (
      <ActionsCellRenderer
        id={info.getValue()}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ),
    enableSorting: false,
    size: 1,
  }),
]
