import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import { TopContainer, TopSection, Wrapper } from './TableLayout.styles'
import { Header } from '../../components/Header/Header'
import { Input } from '../../components/base/Input/Input'
import SearchIcon from '../../assets/icons/search-icon.svg'
import { Button } from '../../components/base/Button/Button'
import Table from '../../components/Table/Table'

type TableLayoutProps = {
  title: string
  count: number
  globalFilter: string
  // eslint-disable-next-line no-unused-vars
  setGlobalFilter: (filter: string) => void
  handleOpenAdd: () => void
  data: any[]
  columnDefinition: ColumnDef<any, any>[]
}

const TableLayout = ({
  title,
  count = 0,
  globalFilter,
  setGlobalFilter,
  handleOpenAdd,
  data,
  columnDefinition,
}: TableLayoutProps) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <TopContainer>
        <Header title={title} count={count} />
        <TopSection>
          <Input
            minWidth={390}
            id="seacrh"
            label={t('layout>table>search')}
            hideLabel
            value={globalFilter}
            slotEnd={<SearchIcon />}
            placeholder={t('layout>table>search')}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Button variant="primary" size="sm" onClick={handleOpenAdd}>
            {t('layout>table>add')}
          </Button>
        </TopSection>
      </TopContainer>
      <Table
        data={data ?? []}
        columns={columnDefinition}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Wrapper>
  )
}

export default memo(TableLayout)
