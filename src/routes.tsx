import React from 'react'
import AuthenticatedLayout from './layout/AuthenticatedLayout'
import Dashboard from './pages/Dashboard'
import CitiesPage from './pages/Cities/CitiesPage'
import PropertiesPage from './pages/Properties/PropertiesPage'
import PropertyDetailsPage from './pages/Property/PropertyDetailsPage'
import ClientsPage from './pages/Clients/ClientsPage'
import Settings from './pages/Settings'
import Login from './pages/Login/Login'
import PageNotFound from './pages/PageNotFound'
import ClientDetailsPage from './pages/Client/ClientDetailsPage'

export const APP_ROUTES = [
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cities', element: <CitiesPage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'properties/:id', element: <PropertyDetailsPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'clients/:id', element: <ClientDetailsPage /> },
      { path: 'settings', element: <Settings /> },
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
