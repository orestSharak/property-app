import { Trans, useTranslation } from 'react-i18next'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetProperties } from '../../hooks/property/useGetProperties'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout/TableLayout'
import { PropertyFormData, Status } from '../../common/types'
import { PropertyFromSchema } from '../../common/formSchema'
import { AddEditPropertyForm } from './AddEditPropertyForm/AddEditPropertyForm'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../hooks/toast/useToast'
import { useCreateProperty } from '../../hooks/property/useCreateProperty'
import { useUpdateProperty } from '../../hooks/property/useUpdateProperty'
import { useDeleteProperty } from '../../hooks/property/useDeleteProperty'
import { useGetProperty } from '../../hooks/property/useGetProperty'
import { useGetClients } from '../../hooks/client/useGetClients'
import { useGetCities } from '../../hooks/city/useGetCities'
import { getClientEmailAndPhone } from '../../utils/utils'

const PropertiesPage = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>('')
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { properties } = useGetProperties()
  const { createProperty } = useCreateProperty()
  const { updateProperty } = useUpdateProperty()
  const { deleteProperty } = useDeleteProperty()
  const { property } = useGetProperty(selectedPropertyId)
  const { clients } = useGetClients()
  const { cities } = useGetCities()

  const defaultFormValues = useMemo(
    () => ({
      address: '',
      position: '',
      client: '',
      city: '',
      status: 'default',
    }),
    [],
  )
  const propertyForm = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFromSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  })

  const { handleSubmit, reset, watch, clearErrors, setError } = propertyForm
  const { email: userEmail, uid: userUid } = currentUser
  const cityField = watch('city')
  const selectedClient = watch('client')

  useEffect(() => {
    if (!addMode && cityField !== property?.cityId) {
      setError('position', {
        type: 'custom',
        message: 'positionError',
      })
    } else if (addMode && cityField) {
      setError('position', {
        type: 'custom',
        message: 'positionError',
      })
    } else {
      clearErrors('position')
    }
  }, [cityField, clearErrors, property, setError, addMode])

  useEffect(() => {
    if (property && selectedPropertyId) {
      reset({
        address: property?.address,
        position: property?.position,
        client: property?.clientId,
        city: property?.cityId,
        status: property?.status,
      })
    } else {
      reset(defaultFormValues)
    }
  }, [cities, clients, defaultFormValues, property, reset, selectedPropertyId])

  const counter = properties?.length

  // navigate to client details
  const handleView = (id: string) => {
    navigate(`/properties/${id}`)
  }
  // open add modal
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // open edit modal
  const handleOpenEditModal = (id: string) => {
    setSelectedPropertyId(id)
    setOpenAddEditModal(true)
  }
  // open delete modal
  const handleOpenDeleteModal = (id: string) => {
    setSelectedPropertyId(id)
    setOpenDeleteModal(true)
  }

  const clientsOptions = useMemo(() => {
    if (!clients) return []

    return clients.map((client) => ({
      value: client.id,
      label: client.fullName,
    }))
  }, [clients])

  const citiesOptions = useMemo(() => {
    if (!cities) return []

    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }))
  }, [cities])

  const preparedPropertyData = (
    data: PropertyFormData,
    userUid: string,
    userEmail: string,
    isEdit?: boolean,
  ) => ({
    address: data.address.trimStart().trimEnd(),
    city: cities?.find((city) => city?.id === data.city).name,
    cityId: data.city,
    position: data.position.trimStart().trimEnd(),
    status: data.status as Status,
    clientFullName: clients?.find((client) => client?.id === data.client).fullName,
    clientId: data.client,
    clientEmail: getClientEmailAndPhone(clients, selectedClient).email,
    clientPhone: getClientEmailAndPhone(clients, selectedClient).phone,
    createdAt: isEdit ? property?.createdAt : Date.now(),
    userEmail: userEmail,
    userId: userUid,
  })

  const onSubmitAdd = (data: PropertyFormData) => {
    const preparedValues = preparedPropertyData(data, userUid, userEmail)

    createProperty(preparedValues, {
      onSuccess: () => {
        showToast({
          content: t('propertyModal>toast>successfullyAdded'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('propertyModal>toast>failedAdd'),
          status: 'error',
        })
      },
    })

    setOpenAddEditModal(false)
    setAddMode(false)
    reset()
  }

  const onSubmitEdit = (data: PropertyFormData) => {
    const preparedValues = preparedPropertyData(data, userUid, userEmail, true)

    updateProperty(
      { id: selectedPropertyId, updates: preparedValues },
      {
        onSuccess: () => {
          showToast({
            content: t('propertyModal>toast>successfullyUpdated'),
            status: 'success',
          })
        },

        onError: () => {
          showToast({
            content: t('propertyModal>toast>failedUpdate'),
            status: 'error',
          })
        },
      },
    )

    setOpenAddEditModal(false)
    setSelectedPropertyId(null)
    reset()
  }

  const handleDelete = () => {
    deleteProperty(selectedPropertyId, {
      onSuccess: () => {
        showToast({
          content: t('propertyModal>toast>successfullyDeleted'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('propertyModal>toast>failedDelete'),
          status: 'error',
        })
      },
    })

    setOpenDeleteModal(false)
    setSelectedPropertyId(null)
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
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedPropertyId(null)
        }}
        title={t('properties>table>delete')}
        size="sm"
        primaryButton={{
          label: t('properties>table>delete'),
          onClick: handleDelete,
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('properties>table>cancel'),
          onClick: () => {
            setOpenDeleteModal(false)
            setSelectedPropertyId(null)
          },
        }}
      >
        <Trans
          i18nKey="properties>table>sureWantDelete"
          values={{ address: property?.address }}
          components={{ bold: <strong /> }}
        />
      </Modal>

      {/* --- Add/Edit Modal --- */}
      <Modal
        isOpen={openAddEditModal}
        onClose={() => {
          setOpenAddEditModal(false)
          setSelectedPropertyId(null)
          reset()

          addMode && setAddMode(false)
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

            !addMode && setSelectedPropertyId(null)
          },
        }}
      >
        <form onSubmit={handleSubmit(addMode ? onSubmitAdd : onSubmitEdit)}>
          <FormProvider {...propertyForm}>
            <AddEditPropertyForm clients={clientsOptions} cities={citiesOptions} />
          </FormProvider>
        </form>
      </Modal>
    </>
  )
}

export default memo(PropertiesPage)
