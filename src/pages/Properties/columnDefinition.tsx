import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { Properties } from '../../common/types'
import TextCellRenderer from '../../components/Table/cellRenderer/Text/TextCellRenderer'
import ActionsCellRenderer from '../../components/Table/cellRenderer/Actions/ActionsCellRenderer'

const columnHelper = createColumnHelper<Properties>()

export const columnDefinition: (
  // eslint-disable-next-line no-unused-vars
  t: TFunction,
  // eslint-disable-next-line no-unused-vars
  handleEdit: () => void,
  // eslint-disable-next-line no-unused-vars
  handleDelete: () => void,
) => ColumnDef<Properties, any>[] = (
  t: TFunction,
  handleEdit: () => void,
  handleDelete: () => void,
) => [
  columnHelper.accessor('city', {
    id: 'city',
    header: t('properties>table>city'),
    size: 1.5,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('address', {
    id: 'address',
    header: t('properties>table>address'),
    size: 2.5,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('clientName', {
    id: 'clientName',
    header: t('properties>table>clientName'),
    size: 2,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('clientPhoneNumber', {
    id: 'clientPhoneNumber',
    header: t('properties>table>phoneOfClient'),
    size: 2,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('clientEmail', {
    id: 'clientEmail',
    header: t('properties>table>clientEmail'),
    size: 2.5,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: t('properties>table>status'),
    size: 1,
    cell: (info) => <TextCellRenderer title={info.getValue()} isStatus />,
  }),
  columnHelper.accessor('id', {
    id: 'id',
    header: t('properties>table>actions'),
    cell: (info) => (
      <ActionsCellRenderer
        id={info.getValue()}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ),
    enableSorting: false,
    size: 1.5,
  }),
]
