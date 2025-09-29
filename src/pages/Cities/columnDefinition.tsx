import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { City } from '../../common/types'
import TextCellRenderer from '../../components/Table/cellRenderer/Text/TextCellRenderer'
import ActionsCellRenderer from '../../components/Table/cellRenderer/Actions/ActionsCellRenderer'

const columnHelper = createColumnHelper<City>()

export const columnDefinition: (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => ColumnDef<City, any>[] = (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => [
  columnHelper.accessor('name', {
    id: 'name',
    header: t('cities>table>name'),
    size: 7,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),

  columnHelper.accessor('id', {
    id: 'id',
    header: t('cities>table>actions'),
    cell: (info) => (
      <ActionsCellRenderer
        id={info.getValue()}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ),
    enableSorting: false,
    size: 1,
  }),
]
