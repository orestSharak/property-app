import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { City } from '../../common/types'
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
    size: 6,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),

  columnHelper.accessor('properties', {
    id: 'properties',
    header: t('cities>table>numberOfProperties'),
    size: 1,
    cell: (info) => {
      const count = String(Object.values(info.getValue())?.length)
      return <TextCellRenderer title={count} />
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
