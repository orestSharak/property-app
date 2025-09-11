import { useTranslation } from 'react-i18next'
import React, { memo, useState } from 'react'
import { useGerProperties } from '../../hooks/useGetProperties'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout'

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
    <>
      <TableLayout
        title={t('properties>table>title')}
        count={counter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleOpenAdd={handleOpenAddModal}
        data={properties}
        columnDefinition={columnDefinition(t, handleOpenEditModal, handleOpenDeleteModal)}
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
    </>
  )
}

export default memo(PropertiesPage)
