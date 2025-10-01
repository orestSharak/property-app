import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { APP_ROUTES } from '../routes'

const LoadingFallback = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>Loading application...</div>
)

export function AppRouter() {
  const routeElements = useRoutes(APP_ROUTES)

  return <Suspense fallback={<LoadingFallback />}>{routeElements}</Suspense>
}
