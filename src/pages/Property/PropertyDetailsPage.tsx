import React, { memo, useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ButtonSection,
  CardWrapper,
  Container,
  HeaderSection,
  IconWrapper,
  MainWrapper,
  NotesWrapper,
  TextAreaWrapper,
  Wrapper,
} from './PropertyDetailsPage.styles'
import { Header } from '../../components/Header/Header'
import { IconButton } from '../../components/base/IconButton/IconButton'
import ArrowIcon from '../../assets/icons/arrow-left-icon.svg'
import EditIcon from '../../assets/icons/pencil-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import { Card } from '../../components/base/Card/Card'
import { InfoRow } from '../../components/InfoRow/InfoRow'
import { PropertyFormData, Status } from '../../common/types'
import { Map } from '../../components/Map/Map'
import { Modal } from '../../components/base/Modal/Modal'
import { AddEditPropertyForm } from '../Properties/AddEditPropertyForm/AddEditPropertyForm'
import { PropertyFromSchema } from '../../common/formSchema'
import { TextArea } from '../../components/base/TextArea/TextArea'
import { Button } from '../../components/base/Button/Button'
import { useAuth } from '../../context/AuthContext'
import { useGetProperty } from '../../hooks/property/useGetProperty'
import { useAddPropertyNote } from '../../hooks/property/useAddPropertyNote'
import { useUpdateProperty } from '../../hooks/property/useUpdateProperty'
import { useDeleteProperty } from '../../hooks/property/useDeleteProperty'
import { useToast } from '../../hooks/toast/useToast'
import { useGetClients } from '../../hooks/client/useGetClients'
import { useGetCities } from '../../hooks/city/useGetCities'
import { getClientEmailAndPhone, truncateByWords } from '../../utils/utils'
import { useDeletePropertyNote } from '../../hooks/property/useDeletePropertyNote'

const PropertyDetailsPage = () => {
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

  const { property, isLoading } = useGetProperty(id)
  const { updateProperty } = useUpdateProperty()
  const { deleteProperty } = useDeleteProperty()
  const { addPropertyNote, isPending: isAddingNote } = useAddPropertyNote()
  const { deletePropertyNote } = useDeletePropertyNote()

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

  const { email: userEmail, uid: userUid } = currentUser
  const { handleSubmit, setError, watch, clearErrors, reset } = propertyForm
  const selectedCity = watch('city')

  useEffect(() => {
    if (!property && !isLoading) navigate('/non-existent-resource', { replace: true })
  }, [property, navigate, isLoading])

  useEffect(() => {
    if (selectedCity !== property?.cityId) {
      setError('position', {
        type: 'custom',
        message: 'positionError',
      })
    } else {
      clearErrors('position')
    }
  }, [selectedCity, clearErrors, property, setError])

  useEffect(() => {
    if (property) {
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
  }, [cities, clients, defaultFormValues, property, reset])

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

  const preparedPropertyData = (data: PropertyFormData, userUid: string, userEmail: string) => ({
    address: data.address.trimStart().trimEnd(),
    city: cities?.find((city) => city?.id === data.city).name,
    cityId: data.city,
    position: data.position.trimStart().trimEnd(),
    status: data.status as Status,
    clientFullName: clients?.find((client) => client?.id === data.client).fullName,
    clientId: data.client,
    clientEmail: getClientEmailAndPhone(clients, data.client).email,
    clientPhone: getClientEmailAndPhone(clients, data.client).phone,
    createdAt: property?.createdAt,
    userEmail: userEmail,
    userId: userUid,
  })

  const onSubmitEdit = (data: PropertyFormData) => {
    const preparedValues = preparedPropertyData(data, userUid, userEmail)

    updateProperty(
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
    deleteProperty(id, {
      onSuccess: () => {
        handleBack()

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
  }

  const handleNote = (text: string) => {
    if (!id || !text.trim()) return

    addPropertyNote(
      { propertyId: id, noteText: text },
      {
        onSuccess: async () => {
          showToast({
            content: t('propertyModal>toast>noteAddedSuccessfully'),
            status: 'success',
          })
        },
        onError: () => {
          showToast({
            content: t('propertyModal>toast>noteFailedToAdd'),
            status: 'error',
          })
        },
      },
    )
    setNote('')
  }

  const handleDeletePropertyNote = (propertyId: string, noteId: string) => {
    setOpenDeleteNoteModal(false)

    deletePropertyNote(
      { propertyId, noteId },
      {
        onSuccess: async () => {
          showToast({
            content: t('propertyModal>toast>noteDeletedSuccessfully'),
            status: 'success',
          })
        },
        onError: () => {
          showToast({
            content: t('propertyModal>toast>noteFailedToDelete'),
            status: 'error',
          })
        },
      },
    )
  }

  const preparedMarkerDetails = () => ({
    id: property?.id,
    position: property?.position,
    label: property?.address,
    status: property?.status,
    clientId: property?.clientId,
    clientFullName: property?.clientFullName,
    clientEmail: property?.clientEmail,
    clientPhone: property?.clientPhone,
  })

  const noteTruncatedText = selectedNoteId
    ? Object.values(property?.notes)?.find((note) => note.id === selectedNoteId)?.text
    : ''

  if (isLoading) return t('propertyDetails>loading')

  return (
    <MainWrapper>
      <Wrapper>
        <Container>
          <HeaderSection>
            <IconButton
              icon={
                <IconWrapper>
                  <ArrowIcon />
                </IconWrapper>
              }
              title={t('propertyDetails>back')}
              onClick={handleBack}
            />
            <Header hideCount title={t('propertyDetails>title')} />
            <ButtonSection>
              <IconButton
                icon={
                  <IconWrapper>
                    <EditIcon />
                  </IconWrapper>
                }
                title={t('propertyDetails>edit')}
                onClick={handleEditModal}
              />
              <IconButton
                icon={
                  <IconWrapper>
                    <DeleteIcon />
                  </IconWrapper>
                }
                title={t('propertyDetails>delete')}
                onClick={handleOpenDeleteModal}
              />
            </ButtonSection>
          </HeaderSection>
          <Card hasList>
            <InfoRow label={t('propertyDetails>address')} value={property?.address} />
            <InfoRow label={t('propertyDetails>city')} value={property?.city} />
            {property?.status !== 'default' && (
              <InfoRow
                label={t('propertyDetails>status')}
                value={property?.status}
                valueVariant={property?.status as Status}
              />
            )}
          </Card>
        </Container>
        <CardWrapper>
          <Card compact>
            {property && <Map zoom={16} height={'260px'} markers={[preparedMarkerDetails()]} />}
          </Card>
        </CardWrapper>
      </Wrapper>
      <Wrapper>
        <Container>
          {!!property?.notes && (
            <>
              <Header hideCount size="sm" title={t('propertyDetails>notes')} />
              <NotesWrapper>
                {Object.values(property?.notes)?.map((note) => (
                  <Card
                    key={note.id}
                    date={note.cratedAt}
                    deleteMessage={t('propertyDetails>deleteNote')}
                    onDelete={() => {
                      setSelectedNoteId(note.id)
                      setOpenDeleteNoteModal(true)
                    }}
                  >
                    {note.text}
                  </Card>
                ))}
              </NotesWrapper>
            </>
          )}
          <Header marginBottom={6} hideCount size="sm" title={t('propertyDetails>addNote')} />
          <TextAreaWrapper>
            <TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              hideLabel
              label={t('propertyDetails>addNote')}
              id="add-note"
            />
            <Button
              disabled={!note.length || isAddingNote}
              size="md"
              onClick={() => handleNote(note)}
            >
              {isAddingNote ? t('propertyDetails>adding') : t('propertyDetails>add')}
            </Button>
          </TextAreaWrapper>
        </Container>
        <CardWrapper>
          <Header
            marginBottom={12}
            hideCount
            size="sm"
            title={t('propertyDetails>clientDetails')}
          />
          <Card width={465} hasList>
            <InfoRow label={t('propertyDetails>fullName')} value={property?.clientFullName} />
            <InfoRow label={t('propertyDetails>email')} value={property?.clientEmail} />
            {property?.clientPhone && (
              <InfoRow label={t('propertyDetails>phone')} value={property?.clientPhone} />
            )}
          </Card>
        </CardWrapper>
      </Wrapper>
      {/* --- Delete Modal --- */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title={t('propertyDetails>deleteProperty')}
        size="sm"
        primaryButton={{
          label: t('propertyDetails>delete'),
          onClick: handleDelete,
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('propertyDetails>cancel'),
          onClick: () => setOpenDeleteModal(false),
        }}
      >
        <Trans
          i18nKey="propertyDetails>sureWantDelete"
          values={{ address: property?.address }}
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
        title={t('propertyDetails>deleteNote')}
        size="sm"
        primaryButton={{
          label: t('propertyDetails>delete'),
          onClick: () => handleDeletePropertyNote(id, selectedNoteId),
          variant: 'warning',
        }}
        secondaryButton={{
          label: t('propertyDetails>cancel'),
          onClick: () => {
            setOpenDeleteNoteModal(false)
            setSelectedNoteId(null)
          },
        }}
      >
        <Trans
          i18nKey="propertyDetails>sureWantDeleteNote"
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
        title={t('propertyDetails>editProperty')}
        size="lg"
        primaryButton={{
          label: t('propertyDetails>edit'),
          variant: 'primary',
          onClick: handleSubmit(onSubmitEdit),
        }}
        secondaryButton={{
          label: t('propertyDetails>cancel'),
          onClick: () => {
            setOpenEditModal(false)
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <FormProvider {...propertyForm}>
            <AddEditPropertyForm clients={clientsOptions} cities={citiesOptions} />
          </FormProvider>
        </form>
      </Modal>
    </MainWrapper>
  )
}

export default memo(PropertyDetailsPage)
