import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import {
  IconWrapper,
  StyledButton,
  StyledInput,
  TopContainer,
  TopSection,
  Wrapper,
} from './TableLayout.styles'
import { Header } from '../../components/Header/Header'
import SearchIcon from '../../assets/icons/search-icon.svg'
import Table from '../../components/Table/Table'
import { useMediaQuery } from '../../hooks/helpers/useMediaQuery'

type TableLayoutProps = {
  title: string
  count: number
  globalFilter: string
  setGlobalFilter: (filter: string) => void
  handleOpenAdd: () => void
  data: any[]
  columnDefinition: ColumnDef<any, any>[]
  searchRef?: React.Ref<HTMLInputElement | null>
}

const TableLayout = ({
  title,
  count = 0,
  globalFilter,
  setGlobalFilter,
  handleOpenAdd,
  data,
  columnDefinition,
  searchRef = null,
}: TableLayoutProps) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery()

  return (
    <Wrapper>
      <TopContainer>
        <Header mobileCentered title={title} count={count} />
        <TopSection>
          <StyledInput
            id="seacrh"
            ref={searchRef}
            label={t('layout>table>search')}
            hideLabel
            value={globalFilter}
            slotEnd={
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
            }
            placeholder={t('layout>table>search')}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <StyledButton
            variant="primary"
            size="sm"
            onClick={handleOpenAdd}
            aria-label={t('layout>table>add')}
          >
            {isMobile ? '+' : t('layout>table>add')}
          </StyledButton>
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
