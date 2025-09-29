import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '../../../components/base/Input/Input'
import { Wrapper } from './AddEditCityForm.styles'

const AddEditCityForm = memo(() => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <Wrapper>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            placeholder={t('cityModal>namePlaceholder')}
            id="name"
            label={t('cityModal>name')}
            error={fieldState.error?.message ? t(`cityModal>${fieldState.error?.message}`) : ''}
            direction="inline"
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
            placeholder={t('cityModal>positionPlaceholder')}
            label={t('cityModal>positionDetails')}
            error={fieldState.error?.message ? t(`cityModal>${fieldState.error?.message}`) : ''}
            direction="inline"
            {...field}
          />
        )}
      />
    </Wrapper>
  )
})

AddEditCityForm.displayName = 'AddEditCityForm'
export { AddEditCityForm }
