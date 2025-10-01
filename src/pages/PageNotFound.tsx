import React from 'react'
import { useTranslation } from 'react-i18next'

const PageNotFound = () => {
  const { t } = useTranslation()

  return <h1>{t('pages>pageNotFound')}</h1>
}

export default PageNotFound
