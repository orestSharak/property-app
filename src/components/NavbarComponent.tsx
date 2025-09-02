import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'

const NavbarComponent = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { logout, currentUser } = useAuth()

  async function handleLogOut() {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.log('Log out error: ', e)
    }
  }

  const handleLanguageToggle = async () => {
    const currentLang = i18n.language

    if (currentLang === 'en') {
      await i18n.changeLanguage('it')
    } else if (currentLang === 'it') {
      await i18n.changeLanguage('en')
    } else {
      await i18n.changeLanguage('it')
    }
  }

  const getButtonText = () => {
    const currentLang = i18n.language

    if (currentLang === 'en') {
      return t('navbar>it')
    } else if (currentLang === 'it') {
      return t('navbar>en')
    } else {
      return t('navbar>it')
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          {currentUser && (
            <>
              <Nav.Link as={Link} to="/dashboard">
                {t('navbar>dashboard')}
              </Nav.Link>
              <Nav.Link as={Link} to="/properties">
                {t('navbar>properties')}
              </Nav.Link>
              <Nav.Link as={Link} to="/cities">
                {t('navbar>cities')}
              </Nav.Link>
              <Nav.Link as={Link} to="/settings">
                {t('navbar>settings')}
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link onClick={handleLogOut}> {t('navbar>logOut')}</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">
              {t('navbar>logIn')}
            </Nav.Link>
          )}
        </Nav>
        <Nav style={{ marginLeft: 20 }}>
          <Button variant="dark" onClick={handleLanguageToggle}>
            {getButtonText()}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
