import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'

// user: alessandro@test.com
// pass: Alessandro1!

// user: orest@test.com
// pass: Orest1!

// way to use theme
// const PrimitiveButton = styled.button`
//   background-color: ${(p) => p.theme.colors.surface6};
//   padding: ${(p) => p.theme.spacing.md};
//   border-radius: ${(p) => p.theme.radius.md};
// `
//
// const MyButton = () => (
//   <PrimitiveButton onClick={() => console.log('Test')}>{'test'}</PrimitiveButton>
// )

function Login() {
  const { t } = useTranslation()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError(null)
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/dashboard')
    } catch (e) {
      setError('pages>logIn>failedLogIn')
      console.log('handleSubmit error: ', e)
    }
    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: 'calc(100vh - 68px)' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{t('pages>logIn>logIn')}</h2>
            {error && <Alert variant="danger">{t(error)}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>{t('form>email')}</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>{t('form>password')}</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button className="w-100 mt-4" type="submit" disabled={loading}>
                {t('pages>logIn>logIn')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Login
