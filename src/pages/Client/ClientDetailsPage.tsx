import React, { memo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
import { ClientFormData, Status } from '../../common/types'
import { Map } from '../../components/Map/Map'
import { Modal } from '../../components/base/Modal/Modal'
import { ClientFromSchema } from '../../common/formSchema'
import { TextArea } from '../../components/base/TextArea/TextArea'
import { Button } from '../../components/base/Button/Button'
import { AddEditClientForm } from '../Clients/AddEditClientForm/AddEditClientForm'

const mockClientDetails = {
  name: 'Alessandro',
  surname: 'Curti',
  address: 'ul. Powstancow Slaskich 12/87',
  city: 'Wroclaw',
  email: 'test@test.com',
  phone: '123122323',
  markers: [
    {
      id: '-OS4v86vbW4tQue7yzdY',
      position: '51.110829023797024, 17.031042982059372',
      label: 'Bastion Sakwowy 26/2',
      status: 'news' as Status,
      clientId: '123',
      clientFullName: 'Alessandro Curti',
      clientEmail: 'test@test.com',
      clientPhone: '+39 122 232 224',
    },
    {
      id: '2',
      position: '51.10672787447582, 17.034312448691953',
      label: 'Wesola 3',
      status: 'contract' as Status,
      clientId: '123',
      clientFullName: 'Alessandro Curti',
      clientEmail: 'test@test.com',
      clientPhone: '+39 122 232 224',
    },
  ],
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

const ClientDetailsPage = () => {
  const { t } = useTranslation()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [note, setNote] = useState('')
  const navigate = useNavigate()

  const clientForm = useForm<ClientFormData>({
    resolver: zodResolver(ClientFromSchema),
    defaultValues: {
      name: mockClientDetails.name,
      surname: mockClientDetails.surname,
      city: mockClientDetails.city,
      address: mockClientDetails.address,
      email: mockClientDetails.email,
      phone: mockClientDetails.phone,
    },
    mode: 'onChange',
  })

  const { handleSubmit } = clientForm

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

  const onSubmitEdit = (data: ClientFormData) => {
    console.log('Editing Client:', data)
    setOpenEditModal(false)
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }

  const handleNote = (note: string) => {
    console.log('note', note)
    // TODO: add mutation for client notes array
    setNote('')
  }

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
            <InfoRow
              label={t('clientDetails>fullName')}
              value={`${mockClientDetails.name} ${mockClientDetails.surname}`}
            />
            <InfoRow label={t('clientDetails>city')} value={mockClientDetails.city} />
            <InfoRow label={t('clientDetails>address')} value={mockClientDetails.address} />
            <InfoRow label={t('clientDetails>email')} value={mockClientDetails.email} />
            <InfoRow label={t('clientDetails>phone')} value={mockClientDetails.phone} />
          </Card>
        </Container>
        <Container>
          {!!mockClientDetails.notes.length && (
            <>
              <Header hideCount size="sm" title={t('clientDetails>notes')} />
              <NotesWrapper>
                {mockClientDetails.notes.map((note) => (
                  <Card key={note.id} date={note.cratedAt}>
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
            <Button disabled={!note.length} size="md" onClick={() => handleNote(note)}>
              {t('clientDetails>add')}
            </Button>
          </TextAreaWrapper>
        </Container>
      </div>
      <Wrapper>
        {mockClientDetails.markers?.map((marker) => (
          <Card key={marker.id} header={marker.label} link={`/properties/${marker.id}`}>
            <Map height={260} markers={[marker]} />
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
          values={{ client: `${mockClientDetails.name} ${mockClientDetails.surname}` }}
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
            <AddEditClientForm />
          </FormProvider>
        </form>
      </Modal>
    </MainWrapper>
  )
}

export default memo(ClientDetailsPage)
