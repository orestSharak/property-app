import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { Client } from '../../common/types'
import TextCellRenderer from '../../components/Table/cellRenderer/Text/TextCellRenderer'
import ActionsCellRenderer from '../../components/Table/cellRenderer/Actions/ActionsCellRenderer'

const columnHelper = createColumnHelper<Client>()

export const columnDefinition: (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView?: (id: string) => void,
) => ColumnDef<Client, any>[] = (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView?: (id: string) => void,
) => [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: t('clients>table>fullName'),
    size: 2,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor('address', {
    id: 'address',
    header: t('clients>table>address'),
    size: 2.5,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) => ({
      phone: row.phone,
      additionalPhoneOne: row.additionalPhoneOne,
      additionalPhoneTwo: row.additionalPhoneTwo,
    }),
    {
      id: 'phone',
      header: t('clients>table>phone'),
      size: 1.5,
      cell: (info) => {
        const { phone, additionalPhoneOne, additionalPhoneTwo } = info.getValue()
        const cleanedPhoneList = [phone, additionalPhoneOne, additionalPhoneTwo].filter(Boolean)
        const hasData = cleanedPhoneList.length > 0

        return <TextCellRenderer isPhone title={hasData ? cleanedPhoneList : ''} />
      },
    },
  ),
  columnHelper.accessor('email', {
    id: 'email',
    header: t('clients>table>email'),
    size: 2,
    cell: (info) => <TextCellRenderer isEmail title={info.getValue()} />,
  }),
  columnHelper.accessor('id', {
    id: 'id',
    header: t('clients>table>actions'),
    cell: (info) => (
      <ActionsCellRenderer
        id={info.getValue()}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
      />
    ),
    enableSorting: false,
    size: 1,
  }),
]
