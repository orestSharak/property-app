import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '../../../components/base/Input/Input'
import { Wrapper } from './AddEditClientForm.styles'
import { Select } from '../../../components/base/Select/Select'
import { Options } from '../../../common/types'

type AddEditClientFormProps = {
  cities: Options[]
}

const AddEditClientForm = memo(({ cities }: AddEditClientFormProps) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <Wrapper>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('clientModal>namePlaceholder')}
            id="name"
            label={t('clientModal>name')}
            error={fieldState.error?.message ? t(`clientModal>${fieldState.error?.message}`) : ''}
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
            placeholder={t('clientModal>surnamePlaceholder')}
            id="surname"
            label={t('clientModal>surname')}
            error={fieldState.error?.message ? t(`clientModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState }) => (
          <Select
            id="city"
            direction="inline"
            label={t('propertyModal>city')}
            placeholder={t('propertyModal>selectCity')}
            error={fieldState.error?.message ? t(`propertyModal>${fieldState.error?.message}`) : ''}
            options={cities}
            disabled={!cities.length}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('clientModal>addressPlaceholder')}
            id="address"
            label={t('clientModal>address')}
            error={fieldState.error?.message ? t(`clientModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('clientModal>emailPlaceholder')}
            id="email"
            label={t('clientModal>email')}
            error={fieldState.error?.message ? t(`clientModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('clientModal>phonePlaceholder')}
            id="phone"
            label={t('clientModal>phone')}
            error={fieldState.error?.message ? t(`clientModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            {...field}
          />
        )}
      />
    </Wrapper>
  )
})

AddEditClientForm.displayName = 'AddEditClientForm'
export { AddEditClientForm }
