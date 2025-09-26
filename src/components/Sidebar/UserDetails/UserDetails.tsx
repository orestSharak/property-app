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

const UserDetails = () => {
  const { logout, currentUser } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  async function handleLogOut() {
    try {
      logout()
      navigate('/')
    } catch (e) {
      console.log('Log out error: ', e)
    }
  }

  return (
    <UserSectionContainer aria-label="User Profile and Authentication">
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
