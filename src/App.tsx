import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'
import CitiesPage from './pages/CitiesPage'
import GlobalStyles from './common/globalStyles'
import Settings from './pages/Settings'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import PropertiesPage from './pages/Properties/PropertiesPage'
import PropertyDetailsPage from './pages/Property/PropertyDetailsPage'
import { Toast } from './components/Toast/Toast'
import PageLayout from './layout/PageLayout/PageLayout'

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('app>title')
  }, [t])

  return (
    <ErrorBoundary>
      <HashRouter>
        <ThemeProvider>
          <AuthProvider>
            <GlobalStyles />
            <Toast />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <Dashboard />
                    </PageLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/cities"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <CitiesPage />
                    </PageLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/properties"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <PropertiesPage />
                    </PageLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/properties/:id"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <PropertyDetailsPage />
                    </PageLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <Settings />
                    </PageLayout>
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App
