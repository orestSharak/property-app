import React, { lazy, Suspense } from 'react'
import AuthenticatedLayout from './layout/AuthenticatedLayout'

import PageNotFound from './pages/PageNotFound/PageNotFound'

import Loader from './components/Loader/Loader'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const CitiesPage = lazy(() => import('./pages/Cities/CitiesPage'))
const PropertiesPage = lazy(() => import('./pages/Properties/PropertiesPage'))
const PropertyDetailsPage = lazy(() => import('./pages/Property/PropertyDetailsPage'))
const ClientsPage = lazy(() => import('./pages/Clients/ClientsPage'))
const ClientDetailsPage = lazy(() => import('./pages/Client/ClientDetailsPage'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const Login = lazy(() => import('./pages/Login/Login'))

export const APP_ROUTES = [
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'cities',
        element: (
          <Suspense fallback={<Loader />}>
            <CitiesPage />
          </Suspense>
        ),
      },
      {
        path: 'properties',
        element: (
          <Suspense fallback={<Loader />}>
            <PropertiesPage />
          </Suspense>
        ),
      },
      {
        path: 'properties/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <PropertyDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <Suspense fallback={<Loader />}>
            <ClientsPage />
          </Suspense>
        ),
      },
      {
        path: 'clients/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <ClientDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]
