import React from 'react'

const AuthenticatedLayout = React.lazy(() => import('./layout/AuthenticatedLayout'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const CitiesPage = React.lazy(() => import('./pages/Cities/CitiesPage'))
const PropertiesPage = React.lazy(() => import('./pages/Properties/PropertiesPage'))
const PropertyDetailsPage = React.lazy(() => import('./pages/Property/PropertyDetailsPage'))
const ClientsPage = React.lazy(() => import('./pages/Clients/ClientsPage'))
const ClientDetailsPage = React.lazy(() => import('./pages/Client/ClientDetailsPage'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Login = React.lazy(() => import('./pages/Login/Login'))
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'))

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
