import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { APP_ROUTES } from '../routes'
import Loader from './Loader/Loader'

export function AppRouter() {
  const routeElements = useRoutes(APP_ROUTES)

  return <Suspense fallback={<Loader />}>{routeElements}</Suspense>
}
