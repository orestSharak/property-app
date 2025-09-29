import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '../../../components/base/Input/Input'
import { Wrapper } from './AddEditPropertyForm.styles'
import { Select } from '../../../components/base/Select/Select'
import { EMPTY_VALUE } from '../../../common/constants'
import { Options } from '../../../common/types'

type AddEditPropertyFormProps = {
  cities: Options[]
  clients: Options[]
}

const AddEditPropertyForm = memo(({ cities, clients }: AddEditPropertyFormProps) => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const selectedCity = watch('city')

  return (
    <Wrapper>
      <Controller
        control={control}
        name="address"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('propertyModal>addressPlaceholder')}
            id="address"
            label={t('propertyModal>address')}
            error={fieldState.error?.message ? t(`propertyModal>${fieldState.error?.message}`) : ''}
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
        name="position"
        render={({ field, fieldState }) => (
          <Input
            id="position"
            placeholder={t('propertyModal>positionPlaceholder')}
            label={t('propertyModal>positionDetails')}
            error={fieldState.error?.message ? t(`propertyModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            disabled={!selectedCity}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="client"
        render={({ field, fieldState }) => (
          <Select
            id="client"
            direction="inline"
            label={t('propertyModal>client')}
            placeholder={t('propertyModal>selectClient')}
            error={fieldState.error?.message ? t(`propertyModal>${fieldState.error?.message}`) : ''}
            options={clients}
            disabled={!clients.length}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field, fieldState }) => (
          <Select
            id="status"
            direction="inline"
            label={t('propertyModal>status')}
            placeholder={t('propertyModal>selectStatus')}
            error={fieldState.error?.message ? t(`propertyModal>${fieldState.error?.message}`) : ''}
            options={[
              { value: 'default', label: EMPTY_VALUE },
              { value: 'news', label: t('propertyModal>news') },
              { value: 'contract', label: t('propertyModal>contract') },
            ]}
            {...field}
          />
        )}
      />
    </Wrapper>
  )
})

AddEditPropertyForm.displayName = 'AddEditPropertyForm'
export { AddEditPropertyForm }
