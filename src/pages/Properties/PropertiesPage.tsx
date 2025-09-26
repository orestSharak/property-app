import { useTranslation } from 'react-i18next'
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetProperties } from '../../hooks/useGetProperties'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout/TableLayout'
import { PropertyFormData } from '../../common/types'
import { PropertyFromSchema } from '../../common/formSchema'
import { AddEditPropertyForm } from './AddEditPropertyForm/AddEditPropertyForm'

const PropertiesPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { properties } = useGetProperties()
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const propertyForm = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFromSchema),
    defaultValues: { address: '', position: '', client: '', city: '', status: 'default' },
    mode: 'onChange',
  })

  const { handleSubmit, reset } = propertyForm

  const counter = properties?.length

  // view
  const handleView = (id: string) => {
    navigate(`/properties/${id}`)
  }
  //add
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // edit
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

  const onSubmitAdd = (data: PropertyFormData) => {
    console.log('Adding property:', data)
    setOpenAddEditModal(false)
    setAddMode(false)
    reset()
  }

  const onSubmitEdit = (data: PropertyFormData) => {
    console.log('Editing property:', data)
    setOpenAddEditModal(false)
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
          reset()
        }}
        title={addMode ? t('properties>table>addProperty') : t('properties>table>editProperty')}
        size="lg"
        primaryButton={{
          label: addMode ? t('properties>table>add') : t('properties>table>edit'),
          variant: 'primary',
          onClick: handleSubmit(addMode ? onSubmitAdd : onSubmitEdit),
        }}
        secondaryButton={{
          label: t('properties>table>cancel'),
          onClick: () => {
            setOpenAddEditModal(false)
            setAddMode(false)
            reset()
          },
        }}
      >
        <form onSubmit={handleSubmit(addMode ? onSubmitAdd : onSubmitEdit)}>
          <FormProvider {...propertyForm}>
            <AddEditPropertyForm />
          </FormProvider>
        </form>
      </Modal>
    </>
  )
}

export default memo(PropertiesPage)
