import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import {
  AuthActionButton,
  UserEmail,
  UserInfo,
  UserName,
  UserSectionContainer,
} from './UserDetails.styles'
import LogOutIcon from '../../../assets/icons/log-out-icon.svg'
import { useAuth } from '../../../context/AuthContext'
import { useLogout } from '../../../hooks/auth/useLogout'

const UserDetails = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslation()
  const { logout } = useLogout()
  const navigate = useNavigate()

  async function handleLogOut() {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.log('Log out error: ', e)
    }
  }

  return (
    <UserSectionContainer aria-label={t('sidebar>userProfile')}>
      <UserInfo>
        <UserName>{currentUser?.displayName}</UserName>
        <UserEmail>{currentUser?.email}</UserEmail>
      </UserInfo>
      <AuthActionButton onClick={handleLogOut} title={t('sidebar>logOut')}>
        <LogOutIcon />
      </AuthActionButton>
    </UserSectionContainer>
  )
}

export default UserDetails
