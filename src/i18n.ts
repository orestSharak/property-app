import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import enTranslation from '../public/locales/en/translation.json'
import itTranslation from '../public/locales/it/translation.json'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslation,
      },
      it: {
        translation: itTranslation,
      },
    },

    preload: ['en', 'it'],

    debug: import.meta.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    ns: ['translation'],
    defaultNS: 'translation',

    keySeparator: '>',

    react: {
      useSuspense: true,
    },
    detection: {
      order: ['localStorage', 'navigator', 'cookie', 'querystring', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })

export default i18n
