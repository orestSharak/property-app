import React, { memo, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ButtonSection,
  CardWrapper,
  Container,
  HeaderSection,
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

const mockPropertyDetails = {
  address: 'ul. Powstancow Slaskich 12/87',
  city: 'Wroclaw',
  status: 'contract',
  markerDetails: {
    id: '-OS5mLauNCRxW-aeLfJv',
    position: '51.110829023797024, 17.031042982059372',
    label: 'Bastion Sakwowy 26/2',
    status: 'news' as Status,
    clientId: '123',
    clientFullName: 'Alessandro Curti',
    clientEmail: 'test@test.com',
    clientPhone: '+39 122 232 224',
  },
  notes: [
    {
      id: '1',
      cratedAt: 1749244604897,
      text: 'Curabitur faucibus rhoncus justo sed viverra. Sed maximus nibh sit amet nisl tempor placerat. Cras maximus ipsum at nibh luctus, eu feugiat neque tincidunt. Nulla facilisi. Aenean vitae porta leo. Nulla facilisi. In nunc enim, mollis eu fringilla ut, laoreet quis tortor. Fusce faucibus pharetra consequat. Proin fermentum pretium lacus vel iaculis.',
    },
    {
      id: '2',
      cratedAt: 1749313853695,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus rhoncus justo sed viverra. Sed maximus nibh sit amet nisl tempor placerat. Cras maximus ipsum at nibh luctus, eu feugiat neque tincidunt. Nulla facilisi. Aenean vitae porta leo. Nulla facilisi. In nunc enim, mollis eu fringilla ut, laoreet quis tortor. Fusce faucibus pharetra consequat. Proin fermentum pretium lacus vel iaculis.',
    },
    {
      id: '3',
      cratedAt: 1749313853695,
      text: 'Sed maximus nibh sit amet nisl tempor placerat. Cras maximus ipsum at nibh luctus, eu feugiat neque tincidunt. Nulla facilisi. Aenean vitae porta leo. Nulla facilisi. In nunc enim, mollis eu fringilla ut, laoreet quis tortor. Fusce faucibus pharetra consequat. Proin fermentum pretium lacus vel iaculis.',
    },
  ],
}

const PropertyDetailsPage = () => {
  const { t } = useTranslation()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [note, setNote] = useState('')
  const navigate = useNavigate()

  const propertyForm = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFromSchema),
    defaultValues: {
      address: mockPropertyDetails.address,
      position: mockPropertyDetails.markerDetails.position,
      client: mockPropertyDetails.markerDetails.clientFullName,
      city: mockPropertyDetails.city,
      status: mockPropertyDetails.status,
    },
    mode: 'onChange',
  })

  const { handleSubmit, setError, watch, clearErrors } = propertyForm
  const city = watch('city')

  useEffect(() => {
    if (city !== mockPropertyDetails.city) {
      setError('position', {
        type: 'custom',
        message: 'positionError',
      })
    } else {
      clearErrors('position')
    }
  }, [city, clearErrors, setError, t])

  const handleBack = () => {
    navigate(-1)
  }

  // delete
  const handleDelete = () => {
    setOpenDeleteModal(false)
  }

  // edit
  const handleEditModal = () => {
    setOpenEditModal(true)
  }

  const onSubmitEdit = (data: PropertyFormData) => {
    console.log('Editing property:', data)
    setOpenEditModal(false)
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }

  const handleNote = (note: string) => {
    console.log('note', note)
    // TODO: add mutation for property notes array
    setNote('')
  }

  return (
    <MainWrapper>
      <Wrapper>
        <Container>
          <HeaderSection>
            <IconButton
              icon={<ArrowIcon />}
              title={t('propertyDetails>back')}
              onClick={handleBack}
            />
            <Header hideCount title={t('propertyDetails>title')} />
            <ButtonSection>
              <IconButton
                icon={<EditIcon />}
                title={t('propertyDetails>edit')}
                onClick={handleEditModal}
              />
              <IconButton
                icon={<DeleteIcon />}
                title={t('propertyDetails>delete')}
                onClick={handleOpenDeleteModal}
              />
            </ButtonSection>
          </HeaderSection>
          <Card hasList>
            <InfoRow label={t('propertyDetails>address')} value={mockPropertyDetails.address} />
            <InfoRow label={t('propertyDetails>city')} value={mockPropertyDetails.city} />
            <InfoRow
              label={t('propertyDetails>status')}
              value={mockPropertyDetails.status}
              valueVariant={mockPropertyDetails.status as Status}
            />
          </Card>
        </Container>
        <CardWrapper>
          <Card compact>
            <Map height={260} markers={[mockPropertyDetails.markerDetails]} />
          </Card>
        </CardWrapper>
      </Wrapper>
      <Wrapper>
        <Container>
          {!!mockPropertyDetails.notes.length && (
            <>
              <Header hideCount size="sm" title={t('propertyDetails>notes')} />
              <NotesWrapper>
                {mockPropertyDetails.notes.map((note) => (
                  <Card key={note.id} date={note.cratedAt}>
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
            <Button disabled={!note.length} size="md" onClick={() => handleNote(note)}>
              {t('propertyDetails>add')}
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
            <InfoRow
              label={t('propertyDetails>fullName')}
              value={mockPropertyDetails.markerDetails.clientFullName}
            />
            <InfoRow
              label={t('propertyDetails>email')}
              value={mockPropertyDetails.markerDetails.clientEmail}
            />
            {mockPropertyDetails.markerDetails.clientPhone && (
              <InfoRow
                label={t('propertyDetails>phone')}
                value={mockPropertyDetails.markerDetails.clientPhone}
              />
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
          values={{ address: mockPropertyDetails.address }}
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
            <AddEditPropertyForm />
          </FormProvider>
        </form>
      </Modal>
    </MainWrapper>
  )
}

export default memo(PropertyDetailsPage)
