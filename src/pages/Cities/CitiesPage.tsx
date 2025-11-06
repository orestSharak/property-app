import { Trans, useTranslation } from 'react-i18next'
import { memo, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { columnDefinition } from './columnDefinition'
import { Modal } from '../../components/base/Modal/Modal'
import TableLayout from '../../layout/TableLayout/TableLayout'
import { CityFormData } from '../../common/types'
import { CityFromSchema } from '../../common/formSchema'
import { AddEditCityForm } from './AddEditCityForm/AddEditCityForm'
import { useToast } from '../../hooks/toast/useToast'
import { useAuth } from '../../context/AuthContext'
import { useCreateCity } from '../../hooks/city/useCreateCity'
import { useUpdateCity } from '../../hooks/city/useUdateCity'
import { useDeleteCity } from '../../hooks/city/useDeleteCity'
import { useGetCity } from '../../hooks/city/useGetCity'
import { useGetCities } from '../../hooks/city/useGetCities'
import { useGetProperties } from '../../hooks/property/useGetProperties'

const CitiesPage = () => {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [selectedCityId, setSelectedCityId] = useState<string | null>('')
  const [addMode, setAddMode] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddEditModal, setOpenAddEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { cities } = useGetCities()
  const { createCity } = useCreateCity()
  const { updateCity } = useUpdateCity()
  const { deleteCity } = useDeleteCity()
  const { city } = useGetCity(selectedCityId)
  const { properties } = useGetProperties()

  const propertyExistInCity =
    (properties && Object.values(properties)?.some((item) => item.cityId === selectedCityId)) ||
    false

  const defaultFormValues = useMemo(
    () => ({
      name: '',
      position: '',
    }),
    [],
  )

  const cityForm = useForm<CityFormData>({
    resolver: zodResolver(CityFromSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  })

  const { handleSubmit, reset } = cityForm
  const { email: userEmail, uid: userUid } = currentUser

  useEffect(() => {
    if (city && selectedCityId) {
      reset({
        name: city?.name,
        position: city?.position,
      })
    } else {
      reset(defaultFormValues)
    }
  }, [city, defaultFormValues, reset, selectedCityId])

  const counter = cities?.length

  // open add modal
  const handleOpenAddModal = () => {
    setAddMode(true)
    setOpenAddEditModal(true)
  }
  // open edit modal
  const handleOpenEditModal = (id: string) => {
    setSelectedCityId(id)
    setOpenAddEditModal(true)
  }
  // open delete modal
  const handleOpenDeleteModal = (id: string) => {
    setSelectedCityId(id)
    setOpenDeleteModal(true)
  }

  // handle navigate to Properties page with search param in the url
  const handleNavigateWithSearch = (id: string) => {
    const cityName = Object.values(cities)?.find((city) => city.id === id)?.name || ''
    navigate(`/properties?search=${cityName}`)
  }

  const preparedCityData = (
    data: CityFormData,
    userUid: string,
    userEmail: string,
    isEdit?: boolean,
  ) => ({
    name: data.name.trimStart().trimEnd(),
    position: data.position.trimStart().trimEnd(),
    createdAt: isEdit ? city?.createdAt : Date.now(),
    userEmail: userEmail,
    userId: userUid,
  })

  const onSubmitAdd = (data: CityFormData) => {
    const preparedValues = preparedCityData(data, userUid, userEmail)

    createCity(preparedValues, {
      onSuccess: () => {
        showToast({
          content: t('cityModal>toast>successfullyAdded'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('cityModal>toast>failedAdd'),
          status: 'error',
        })
      },
    })

    setOpenAddEditModal(false)
    setAddMode(false)
    reset()
  }

  const onSubmitEdit = (data: CityFormData) => {
    const preparedValues = preparedCityData(data, userUid, userEmail, true)

    updateCity(
      { id: selectedCityId, updates: preparedValues },
      {
        onSuccess: () => {
          showToast({
            content: t('cityModal>toast>successfullyUpdated'),
            status: 'success',
          })
        },

        onError: () => {
          showToast({
            content: t('cityModal>toast>failedUpdate'),
            status: 'error',
          })
        },
      },
    )

    setOpenAddEditModal(false)
    setSelectedCityId(null)
    reset()
  }

  const handleDelete = () => {
    deleteCity(selectedCityId, {
      onSuccess: () => {
        showToast({
          content: t('cityModal>toast>successfullyDeleted'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('cityModal>toast>failedDelete'),
          status: 'error',
        })
      },
    })

    setOpenDeleteModal(false)
    setSelectedCityId(null)
  }

  return (
    <>
      <TableLayout
        title={t('cities>table>title')}
        count={counter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        handleOpenAdd={handleOpenAddModal}
        data={cities}
        columnDefinition={columnDefinition(
          t,
          handleNavigateWithSearch,
          handleOpenEditModal,
          handleOpenDeleteModal,
        )}
      />

      {/* --- Delete Modal --- */}
      <Modal
        isOpen={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedCityId(null)
        }}
        title={t('cities>table>deleteCity')}
        size="sm"
        primaryButton={{
          label: t('cities>table>delete'),
          onClick: () => selectedCityId && handleDelete(),
          variant: 'warning',
          disabled: propertyExistInCity,
        }}
        secondaryButton={{
          label: t('cities>table>cancel'),
          onClick: () => {
            setOpenDeleteModal(false)
            setSelectedCityId(null)
          },
        }}
      >
        {propertyExistInCity ? (
          <Trans
            i18nKey="cities>table>canNotDeleteCity"
            values={{ city: city?.name }}
            components={{ bold: <strong /> }}
          />
        ) : (
          <Trans
            i18nKey="cities>table>sureWantDelete"
            values={{ city: city?.name }}
            components={{ bold: <strong /> }}
          />
        )}
      </Modal>

      {/* --- Add/Edit Modal --- */}
      <Modal
        isOpen={openAddEditModal}
        onClose={() => {
          setOpenAddEditModal(false)
          setSelectedCityId(null)
          reset()

          addMode && setAddMode(false)
        }}
        title={addMode ? t('cities>table>addCity') : t('cities>table>editCity')}
        size="lg"
        primaryButton={{
          label: addMode ? t('cities>table>add') : t('cities>table>edit'),
          variant: 'primary',
          onClick: handleSubmit(addMode ? onSubmitAdd : onSubmitEdit),
        }}
        secondaryButton={{
          label: t('cities>table>cancel'),
          onClick: () => {
            setOpenAddEditModal(false)
            setAddMode(false)
            reset()

            !addMode && setSelectedCityId(null)
          },
        }}
      >
        <form onSubmit={handleSubmit(addMode ? onSubmitAdd : onSubmitEdit)}>
          <FormProvider {...cityForm}>
            <AddEditCityForm />
          </FormProvider>
        </form>
      </Modal>
    </>
  )
}

export default memo(CitiesPage)
