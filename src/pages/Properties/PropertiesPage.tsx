import { useTranslation } from 'react-i18next'
import React, { memo, useState } from 'react'
import { useGerProperties } from '../../hooks/useGetProperties'
import Table from '../../components/Table/Table'
import { columnDefinition } from './columnDefinition'
import { TopContainer, TopSection, Wrapper } from './PropertiesPage.styles'
import { Header } from '../../components/Header/Header'
import { Input } from '../../components/base/Input/Input'
import SearchIcon from '../../assets/icons/search-icon.svg'
import { Button } from '../../components/base/Button/Button'
import { Modal } from '../../components/base/Modal/Modal'

const PropertiesPage = () => {
  const { t } = useTranslation()
  const { properties } = useGerProperties()
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const counter = properties?.length

  const handleDelete = () => {
    setOpenDeleteModal(false)
  }

  const handleEdit = () => {
    setOpenAddEditModal(false)
  }

  const handleAdd = () => {
    setOpenAddEditModal(false)
    setAddMode(false)
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }

  const handleOpenEditModal = () => {
    setOpenAddEditModal(true)
  }

  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }

  return (
    <Wrapper>
      <TopContainer>
        <Header title={t('properties>table>title')} count={counter ?? 0} />
        <TopSection>
          <Input
            minWidth={390}
            id="seacrhProperties"
            label={t('properties>table>search')}
            hideLabel
            value={globalFilter}
            slotEnd={<SearchIcon />}
            placeholder={t('properties>table>search')}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Button variant="primary" size="sm" onClick={handleOpenAddModal}>
            {t('properties>table>add')}
          </Button>
        </TopSection>
      </TopContainer>
      <Table
        data={properties ?? []}
        columns={columnDefinition(t, handleOpenEditModal, handleOpenDeleteModal)}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/* --- Delete Modal --- */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title={t('properties>table>delete')}
        size="sm"
        primaryButton={{
          label: t('properties>table>delete'),
          onClick: handleDelete,
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('properties>table>cancel'),
          onClick: () => setOpenDeleteModal(false),
        }}
      >
        {t('properties>table>sureWantDelete')}
      </Modal>

      {/* --- Add/Edit Modal --- */}
      <Modal
        isOpen={openAddEditModal}
        onClose={() => {
          setOpenAddEditModal(false)
          setAddMode(false)
        }}
        title={addMode ? t('properties>table>addProperty') : t('properties>table>editProperty')}
        size="lg"
        primaryButton={{
          label: addMode ? t('properties>table>add') : t('properties>table>edit'),
          onClick: addMode ? handleAdd : handleEdit,
          variant: 'primary',
        }}
        secondaryButton={{
          label: t('properties>table>cancel'),
          onClick: () => {
            setOpenAddEditModal(false)
            setAddMode(false)
          },
        }}
      >
        <span>{'Some filed will be added'}</span>
      </Modal>
    </Wrapper>
  )
}

export default memo(PropertiesPage)
