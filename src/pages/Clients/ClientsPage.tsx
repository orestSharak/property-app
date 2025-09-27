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
import { useGerClients } from '../../hooks/useGetClients'
import { useCreateClient } from '../../hooks/useCreateClient'
import { useToast } from '../../hooks/useToast'
import { useAuth } from '../../context/AuthContext'
import { useClient } from '../../hooks/useGetClient'
import { getClientNameAndSurname } from '../../utils/utils'

const ClientsPage = () => {
  const { t } = useTranslation()
  const [selectedClientId, setSelectedClientId] = useState<string | null>('')
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { clients } = useGerClients()
  const { createClient } = useCreateClient()
  const { client } = useClient(selectedClientId)
  const { showToast } = useToast()

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
        city: client?.city,
        address: client?.address,
        email: client?.email,
        phone: client?.phone,
      })
    } else {
      reset(defaultFormValues)
    }
  }, [client, defaultFormValues, reset, selectedClientId])

  console.log('selectedClientId', selectedClientId)

  const counter = clients?.length

  // view
  const handleView = (id: string) => {
    navigate(`/clients/${id}`)
  }
  //add
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // edit
  const handleOpenEditModal = (id: string) => {
    setSelectedClientId(id)
    setOpenAddEditModal(true)
  }
  // delete
  const handleDelete = (id: string) => {
    console.log('id', id)
    setOpenDeleteModal(false)
  }

  const handleOpenDeleteModal = (id: string) => {
    setSelectedClientId(id)
    setOpenDeleteModal(true)
  }

  const onSubmitAdd = (data: ClientFormData) => {
    const preparedValues = {
      fullName: `${data.name} ${data.surname}`,
      city: data.city,
      address: data.address,
      email: data.email,
      phone: data.phone ?? null,
      createdAt: Date.now(),
      userEmail: userEmail,
      userId: userUid,
    }

    createClient(preparedValues, {
      onSuccess: () => {
        showToast({
          content: t('success'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('error'),
          status: 'error',
        })
      },
    })

    setOpenAddEditModal(false)
    setAddMode(false)
    reset()
  }

  const onSubmitEdit = (data: ClientFormData) => {
    console.log('Editing client:', data)
    setOpenAddEditModal(false)
    setSelectedClientId(null)
    reset()
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
          onClick: () => selectedClientId && handleDelete(selectedClientId),
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
          setAddMode(false)
          setSelectedClientId(null)
          reset()
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
            <AddEditClientForm />
          </FormProvider>
        </form>
      </Modal>
    </>
  )
}

export default memo(ClientsPage)
