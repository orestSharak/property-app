import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import NavbarComponent from './components/NavbarComponent'
import PropertiesPage from './pages/PropertiesPage'
import Dashboard from './pages/Dashboard'
import CitiesPage from './pages/CitiesPage'
import GlobalStyles from './common/globalStyles'
import './App.css'
import Settings from './pages/Settings'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

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
            <NavbarComponent />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cities"
                element={
                  <PrivateRoute>
                    <CitiesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/properties"
                element={
                  <PrivateRoute>
                    <PropertiesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
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
