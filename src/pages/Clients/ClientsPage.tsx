import { Trans, useTranslation } from 'react-i18next'
import { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout/TableLayout'
import { ClientFormData } from '../../common/types'
import { ClientFromSchema } from '../../common/formSchema'
import { AddEditClientForm } from './AddEditClientForm/AddEditClientForm'
import { useGetClients } from '../../hooks/client/useGetClients'
import { useCreateClient } from '../../hooks/client/useCreateClient'
import { useToast } from '../../hooks/useToast'
import { useAuth } from '../../context/AuthContext'
import { useGetClient } from '../../hooks/client/useGetClient'
import { getClientNameAndSurname } from '../../utils/utils'
import { useUpdateClient } from '../../hooks/client/useUpdateClient'
import { useDeleteClient } from '../../hooks/client/useDeleteClient'
import { useGetCities } from '../../hooks/city/useGetCities'

const ClientsPage = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [selectedClientId, setSelectedClientId] = useState<string | null>('')
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { clients } = useGetClients()
  const { createClient } = useCreateClient()
  const { updateClient } = useUpdateClient()
  const { deleteClient } = useDeleteClient()
  const { client } = useGetClient(selectedClientId)
  const { cities } = useGetCities()

  const defaultFormValues = useMemo(
    () => ({
      name: '',
      surname: '',
      city: '',
      address: '',
      email: '',
      phone: '',
    }),
    [],
  )

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(ClientFromSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  })

  const { handleSubmit, reset } = clientForm
  const { email: userEmail, uid: userUid } = currentUser

  useEffect(() => {
    if (client && selectedClientId) {
      reset({
        name: getClientNameAndSurname(client?.fullName).name,
        surname: getClientNameAndSurname(client?.fullName).surname,
        city: client?.cityId,
        address: client?.address,
        email: client?.email,
        phone: client?.phone,
      })
    } else {
      reset(defaultFormValues)
    }
  }, [client, defaultFormValues, reset, selectedClientId])

  const counter = clients?.length

  // navigate to client details
  const handleView = (id: string) => {
    navigate(`/clients/${id}`)
  }
  // open add modal
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // open edit modal
  const handleOpenEditModal = (id: string) => {
    setSelectedClientId(id)
    setOpenAddEditModal(true)
  }
  // open delete modal
  const handleOpenDeleteModal = (id: string) => {
    setSelectedClientId(id)
    setOpenDeleteModal(true)
  }

  const citiesOptions = useMemo(() => {
    if (!cities) return []

    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }))
  }, [cities])

  const preparedClientData = (
    data: ClientFormData,
    userUid: string,
    userEmail: string,
    isEdit?: boolean,
  ) => ({
    fullName: `${data.name} ${data.surname}`,
    city: cities?.find((city) => city?.id === data.city).name,
    cityId: data.city,
    address: data.address,
    email: data.email,
    phone: data.phone ?? null,
    createdAt: isEdit ? client?.createdAt : Date.now(),
    userEmail: userEmail,
    userId: userUid,
  })

  const onSubmitAdd = (data: ClientFormData) => {
    const preparedValues = preparedClientData(data, userUid, userEmail)

    createClient(preparedValues, {
      onSuccess: () => {
        showToast({
          content: t('clientModal>toast>successfullyAdded'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('clientModal>toast>failedAdd'),
          status: 'error',
        })
      },
    })

    setOpenAddEditModal(false)
    setAddMode(false)
    reset()
  }

  const onSubmitEdit = (data: ClientFormData) => {
    const preparedValues = preparedClientData(data, userUid, userEmail, true)

    updateClient(
      { id: selectedClientId, updates: preparedValues },
      {
        onSuccess: () => {
          showToast({
            content: t('clientModal>toast>successfullyUpdated'),
            status: 'success',
          })
        },

        onError: () => {
          showToast({
            content: t('clientModal>toast>failedUpdate'),
            status: 'error',
          })
        },
      },
    )

    setOpenAddEditModal(false)
    setSelectedClientId(null)
    reset()
  }

  const handleDelete = () => {
    deleteClient(selectedClientId, {
      onSuccess: () => {
        showToast({
          content: t('clientModal>toast>successfullyDeleted'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('clientModal>toast>failedDelete'),
          status: 'error',
        })
      },
    })

    setOpenDeleteModal(false)
    setSelectedClientId(null)
  }

  return (
    <>
      <TableLayout
        title={t('clients>table>title')}
        count={counter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleOpenAdd={handleOpenAddModal}
        data={clients}
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
          setSelectedClientId(null)
        }}
        title={t('clients>table>deleteClient')}
        size="sm"
        primaryButton={{
          label: t('clients>table>delete'),
          onClick: () => selectedClientId && handleDelete(),
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('clients>table>cancel'),
          onClick: () => {
            setOpenDeleteModal(false)
            setSelectedClientId(null)
          },
        }}
      >
        <Trans
          i18nKey="clients>table>sureWantDelete"
          values={{ client: client?.fullName }}
          components={{ bold: <strong /> }}
        />
      </Modal>

      {/* --- Add/Edit Modal --- */}
      <Modal
        isOpen={openAddEditModal}
        onClose={() => {
          setOpenAddEditModal(false)
          setSelectedClientId(null)
          reset()

          addMode && setAddMode(false)
        }}
        title={addMode ? t('clients>table>addClient') : t('clients>table>editClient')}
        size="lg"
        primaryButton={{
          label: addMode ? t('clients>table>add') : t('clients>table>edit'),
          variant: 'primary',
          onClick: handleSubmit(addMode ? onSubmitAdd : onSubmitEdit),
        }}
        secondaryButton={{
          label: t('clients>table>cancel'),
          onClick: () => {
            setOpenAddEditModal(false)
            setAddMode(false)
            reset()

            !addMode && setSelectedClientId(null)
          },
        }}
      >
        <form onSubmit={handleSubmit(addMode ? onSubmitAdd : onSubmitEdit)}>
          <FormProvider {...clientForm}>
            <AddEditClientForm cities={citiesOptions} />
          </FormProvider>
        </form>
      </Modal>
    </>
  )
}

export default memo(ClientsPage)
