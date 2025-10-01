import { Outlet } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import PageLayout from './PageLayout/PageLayout'

function AuthenticatedLayout() {
  return (
    <PrivateRoute>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </PrivateRoute>
  )
}

export default AuthenticatedLayout
