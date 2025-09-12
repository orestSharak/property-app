import { useTranslation } from 'react-i18next'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProperties } from '../../hooks/useGetProperties'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout'

const PropertiesPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { properties } = useGetProperties()
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const counter = properties?.length

  // view
  const handleView = (id: string) => {
    navigate(`/properties/${id}`)
  }
  //add
  const handleAdd = () => {
    setOpenAddEditModal(false)
    setAddMode(false)
  }
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // edit
  const handleEdit = () => {
    setOpenAddEditModal(false)
  }
  const handleOpenEditModal = () => {
    setOpenAddEditModal(true)
  }
  // delete
  const handleDelete = () => {
    setOpenDeleteModal(false)
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
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
        columnDefinition={columnDefinition(
          t,
          handleOpenEditModal,
          handleOpenDeleteModal,
          handleView,
        )}
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
