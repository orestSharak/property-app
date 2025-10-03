import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUpdateUser } from '../../hooks/user/useUpdateUser'
import { UserFormData } from '../../common/types'
import { UserFromSchema } from '../../common/formSchema'
import { getClientNameAndSurname } from '../../utils/utils'
import { useToast } from '../../hooks/toast/useToast'
import { Input } from '../../components/base/Input/Input'
import { Card } from '../../components/base/Card/Card'
import { StyledButton, StyledForm } from './Settings.styles'
import { Header } from '../../components/Header/Header'

function Settings() {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const { updateUser } = useUpdateUser()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const defaultFormValues = useMemo(
    () => ({
      name: '',
      surname: '',
    }),
    [],
  )

  const userForm = useForm<UserFormData>({
    resolver: zodResolver(UserFromSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  })

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty },
  } = userForm

  useEffect(() => {
    if (currentUser && currentUser.displayName) {
      reset({
        name: getClientNameAndSurname(currentUser.displayName).name,
        surname: getClientNameAndSurname(currentUser.displayName).surname,
      })
    } else {
      reset(defaultFormValues)
    }
  }, [currentUser, defaultFormValues, reset])

  useEffect(() => {
    if (currentUser && !currentUser.displayName) {
      setError('name', {
        type: 'custom',
        message: 'provideName',
      })
      setError('surname', {
        type: 'custom',
        message: 'provideSurname',
      })
    }
  }, [currentUser, setError])

  const preparedUserData = (data: UserFormData) => ({
    displayName: `${data.name.trim()} ${data.surname.trim()}`,
  })

  const onUpdate = async (data: UserFormData) => {
    const preparedValues = preparedUserData(data)

    await updateUser(preparedValues, {
      onSuccess: () => {
        // to re-render a page
        navigate('/settings')
        showToast({
          content: t('settings>toast>successfullyUpdate'),
          status: 'success',
        })
      },

      onError: () => {
        showToast({
          content: t('settings>toast>failedUpdate'),
          status: 'error',
        })
      },
    })
  }

  return (
    <>
      <Header marginBottom={24} title={t('settings>userSettings')} hideCount />
      <Card width={500}>
        <StyledForm onSubmit={handleSubmit(onUpdate)}>
          <Input
            value={currentUser?.email}
            id="email"
            disabled
            label={t('settings>email')}
            direction="inline"
          />
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                placeholder={t('settings>namePlaceholder')}
                id="name"
                label={t('settings>name')}
                error={fieldState.error?.message ? t(`settings>${fieldState.error?.message}`) : ''}
                direction="inline"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="surname"
            render={({ field, fieldState }) => (
              <Input
                placeholder={t('settings>surnamePlaceholder')}
                id="surname"
                label={t('settings>surname')}
                error={fieldState.error?.message ? t(`settings>${fieldState.error?.message}`) : ''}
                direction="inline"
                {...field}
              />
            )}
          />
          <StyledButton disabled={!isDirty} onClick={handleSubmit(onUpdate)}>
            {t('settings>update')}
          </StyledButton>
        </StyledForm>
      </Card>
    </>
  )
}

export default Settings
