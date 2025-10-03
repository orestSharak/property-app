import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlobalStyles from './common/globalStyles'
import ErrorBoundary from './components/ErrorBoundary'
import { Toast } from './components/Toast/Toast'
import { AppProviders } from './AppProviders'
import { AppRouter } from './components/AppRouter'
import 'leaflet/dist/leaflet.css'

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('app>title')
  }, [t])

  return (
    <ErrorBoundary>
      <HashRouter>
        <AppProviders>
          <GlobalStyles />
          <Toast />
          <AppRouter />
        </AppProviders>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App
