import React, { memo, useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ButtonSection,
  Container,
  HeaderSection,
  MainWrapper,
  NotesWrapper,
  TextAreaWrapper,
  Wrapper,
} from './ClientDetailsPage.styles'
import { Header } from '../../components/Header/Header'
import { IconButton } from '../../components/base/IconButton/IconButton'
import ArrowIcon from '../../assets/icons/arrow-left-icon.svg'
import EditIcon from '../../assets/icons/pencil-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import { Card } from '../../components/base/Card/Card'
import { InfoRow } from '../../components/InfoRow/InfoRow'
import { ClientFormData, PropertyDetails } from '../../common/types'
import { Map } from '../../components/Map/Map'
import { Modal } from '../../components/base/Modal/Modal'
import { ClientFromSchema } from '../../common/formSchema'
import { TextArea } from '../../components/base/TextArea/TextArea'
import { Button } from '../../components/base/Button/Button'
import { AddEditClientForm } from '../Clients/AddEditClientForm/AddEditClientForm'
import { useGetClient } from '../../hooks/client/useGetClient'
import { getClientNameAndSurname, truncateByWords } from '../../utils/utils'
import { useUpdateClient } from '../../hooks/client/useUpdateClient'
import { useDeleteClient } from '../../hooks/client/useDeleteClient'
import { useToast } from '../../hooks/toast/useToast'
import { useAuth } from '../../context/AuthContext'
import { useAddClientNote } from '../../hooks/client/useAddClientNote'
import { useGetCities } from '../../hooks/city/useGetCities'
import { useDeleteClientNote } from '../../hooks/client/useDeleteClientNote'

const ClientDetailsPage = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useToast()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDeleteNoteModal, setOpenDeleteNoteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [note, setNote] = useState('')
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const { client, isLoading } = useGetClient(id)
  const { updateClient } = useUpdateClient()
  const { deleteClient } = useDeleteClient()
  const { cities } = useGetCities()
  const { addClientNote, isPending: isAddingNote } = useAddClientNote()
  const { deleteClientNote } = useDeleteClientNote()

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
    if (!client && !isLoading) navigate('/non-existent-resource', { replace: true })
  }, [client, navigate, isLoading])

  useEffect(() => {
    if (client && id) {
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
  }, [client, defaultFormValues, reset, id])

  const handleBack = () => {
    navigate(-1)
  }

  // open edit modal
  const handleEditModal = () => {
    setOpenEditModal(true)
  }
  // open delete modal
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }

  const citiesOptions = useMemo(() => {
    if (!cities) return []

    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }))
  }, [cities])

  const preparedClientData = (data: ClientFormData, userUid: string, userEmail: string) => ({
    fullName: `${data.name.trim()} ${data.surname.trim()}`,
    city: cities?.find((city) => city?.id === data.city).name,
    cityId: data.city,
    address: data.address.trimStart().trimEnd(),
    email: data.email.trimStart().trimEnd(),
    phone: data.phone.trimStart().trimEnd() ?? null,
    createdAt: client?.createdAt,
    userEmail: userEmail,
    userId: userUid,
  })

  const onSubmitEdit = (data: ClientFormData) => {
    const preparedValues = preparedClientData(data, userUid, userEmail)

    updateClient(
      { id: id, updates: preparedValues },
      {
        onSuccess: async () => {
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

    setOpenEditModal(false)
  }

  const handleDelete = () => {
    deleteClient(id, {
      onSuccess: () => {
        handleBack()

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
  }

  const handleNote = (text: string) => {
    if (!id || !text.trim()) return

    addClientNote(
      { clientId: id, noteText: text },
      {
        onSuccess: async () => {
          showToast({
            content: t('clientModal>toast>noteAddedSuccessfully'),
            status: 'success',
          })
        },
        onError: () => {
          showToast({
            content: t('clientModal>toast>noteFailedToAdd'),
            status: 'error',
          })
        },
      },
    )
    setNote('')
  }

  const handleDeleteClientNote = (clientId: string, noteId: string) => {
    setOpenDeleteNoteModal(false)

    deleteClientNote(
      { clientId, noteId },
      {
        onSuccess: async () => {
          showToast({
            content: t('clientModal>toast>noteDeletedSuccessfully'),
            status: 'success',
          })
        },
        onError: () => {
          showToast({
            content: t('clientModal>toast>noteFailedToDelete'),
            status: 'error',
          })
        },
      },
    )
  }

  const preparedPropertiesDetails = (property: PropertyDetails) => ({
    clientId: client?.id,
    clientFullName: client?.fullName,
    clientEmail: client?.email,
    clientPhone: client?.phone,
    ...property,
  })

  const noteTruncatedText = selectedNoteId
    ? Object.values(client?.notes)?.find((note) => note.id === selectedNoteId)?.text
    : ''

  if (isLoading) return t('clientDetails>loading')

  return (
    <MainWrapper>
      <div>
        <Container>
          <HeaderSection>
            <IconButton icon={<ArrowIcon />} title={t('clientDetails>back')} onClick={handleBack} />
            <Header hideCount title={t('clientDetails>title')} />
            <ButtonSection>
              <IconButton
                icon={<EditIcon />}
                title={t('clientDetails>edit')}
                onClick={handleEditModal}
              />
              <IconButton
                icon={<DeleteIcon />}
                title={t('clientDetails>delete')}
                onClick={handleOpenDeleteModal}
              />
            </ButtonSection>
          </HeaderSection>
          <Card hasList>
            <InfoRow label={t('clientDetails>fullName')} value={client?.fullName} />
            <InfoRow label={t('clientDetails>city')} value={client?.city} />
            <InfoRow label={t('clientDetails>address')} value={client?.address} />
            <InfoRow label={t('clientDetails>email')} value={client?.email} />
            {client?.phone && <InfoRow label={t('clientDetails>phone')} value={client?.phone} />}
          </Card>
        </Container>
        <Container>
          {!!client?.notes && (
            <>
              <Header hideCount size="sm" title={t('clientDetails>notes')} />
              <NotesWrapper>
                {Object.values(client?.notes)?.map((note) => (
                  <Card
                    deleteMessage={t('clientDetails>deleteNote')}
                    onDelete={() => {
                      setSelectedNoteId(note.id)
                      setOpenDeleteNoteModal(true)
                    }}
                    key={note.id}
                    date={note.cratedAt}
                  >
                    {note.text}
                  </Card>
                ))}
              </NotesWrapper>
            </>
          )}
          <Header marginBottom={6} hideCount size="sm" title={t('clientDetails>addNote')} />
          <TextAreaWrapper>
            <TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              hideLabel
              label={t('clientDetails>addNote')}
              id="add-note"
            />
            <Button
              disabled={!note.length || isAddingNote}
              size="md"
              onClick={() => handleNote(note)}
            >
              {isAddingNote ? t('clientDetails>adding') : t('clientDetails>add')}
            </Button>
          </TextAreaWrapper>
        </Container>
      </div>
      <Wrapper>
        {client?.properties &&
          /*
          --- NOTE ---

          Needed to be wrapped in the  Object.values(...)
          because Firebase database not supporting array
          is sending object instead.

          Example:

            "properties": {
               "-OS5mLauNCRxW-aeLfJv": {
                 "id": "-OS5mLauNCRxW-aeLfJv",
                 "position": "51.110829023797024, 17.031042982059372",
                 "label": "Orla 23/45,
                 "status": "contract"
               },
               "-OS5mLauNCRxW-aeLfJv": {
                  "id": "-OS5mLauNCRxW-aeLfJv",
                  "position": "51.110829023797024, 17.031042982059372",
                  "label": "Bastion Sakwowy 26/2",
                  "status": "news"
              }
             }
           */
          Object.values(client?.properties)?.map((property) => (
            <Card key={property.id} header={property.label} link={`/properties/${property.id}`}>
              <Map zoom={16} height={'260px'} markers={[preparedPropertiesDetails(property)]} />
            </Card>
          ))}
      </Wrapper>
      {/* --- Delete Modal --- */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title={t('clientDetails>deleteClient')}
        size="sm"
        primaryButton={{
          label: t('clientDetails>delete'),
          onClick: handleDelete,
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('clientDetails>cancel'),
          onClick: () => setOpenDeleteModal(false),
        }}
      >
        <Trans
          i18nKey="clientDetails>sureWantDelete"
          values={{ client: client?.fullName }}
          components={{ bold: <strong /> }}
        />
      </Modal>

      {/* --- Delete Note Modal --- */}
      <Modal
        isOpen={openDeleteNoteModal}
        onClose={() => {
          setOpenDeleteNoteModal(false)
          setSelectedNoteId(null)
        }}
        title={t('clientDetails>deleteNote')}
        size="sm"
        primaryButton={{
          label: t('clientDetails>delete'),
          onClick: () => handleDeleteClientNote(id, selectedNoteId),
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('clientDetails>cancel'),
          onClick: () => {
            setOpenDeleteNoteModal(false)
            setSelectedNoteId(null)
          },
        }}
      >
        <Trans
          i18nKey="clientDetails>sureWantDeleteNote"
          values={{
            text: truncateByWords(noteTruncatedText),
          }}
          components={{ bold: <strong /> }}
        />
      </Modal>

      {/* --- Edit Modal --- */}
      <Modal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false)
        }}
        title={t('clientDetails>editClient')}
        size="lg"
        primaryButton={{
          label: t('clientDetails>edit'),
          variant: 'primary',
          onClick: handleSubmit(onSubmitEdit),
        }}
        secondaryButton={{
          label: t('clientDetails>cancel'),
          onClick: () => {
            setOpenEditModal(false)
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <FormProvider {...clientForm}>
            <AddEditClientForm cities={citiesOptions} />
          </FormProvider>
        </form>
      </Modal>
    </MainWrapper>
  )
}

export default memo(ClientDetailsPage)
