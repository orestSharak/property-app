import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { TFunction } from 'i18next'
import { Property } from '../../common/types'
import TextCellRenderer from '../../components/Table/cellRenderer/Text/TextCellRenderer'
import ActionsCellRenderer from '../../components/Table/cellRenderer/Actions/ActionsCellRenderer'

const columnHelper = createColumnHelper<Property>()

export const columnDefinition: (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView?: (id: string) => void,
) => ColumnDef<Property, any>[] = (
  t: TFunction,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView?: (id: string) => void,
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
  columnHelper.accessor('clientFullName', {
    id: 'clientName',
    header: t('properties>table>clientFullName'),
    size: 2,
    cell: (info) => <TextCellRenderer title={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) => ({
      phone: row.clientPhone,
      additionalPhoneOne: row.clientAdditionalPhoneOne,
      additionalPhoneTwo: row.clientAdditionalPhoneTwo,
    }),
    {
      id: 'clientPhoneNumber',
      header: t('properties>table>phoneOfClient'),
      size: 2,
      cell: (info) => {
        const { phone, additionalPhoneOne, additionalPhoneTwo } = info.getValue()
        const cleanedPhoneList = [phone, additionalPhoneOne, additionalPhoneTwo].filter(Boolean)
        const hasData = cleanedPhoneList.length > 0

        return <TextCellRenderer isPhone title={hasData ? cleanedPhoneList : ''} />
      },
    },
  ),
  columnHelper.accessor('clientEmail', {
    id: 'clientEmail',
    header: t('properties>table>clientEmail'),
    size: 2.5,
    cell: (info) => <TextCellRenderer isEmail title={info.getValue()} />,
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
        handleView={handleView}
      />
    ),
    enableSorting: false,
    size: 1.5,
  }),
]
