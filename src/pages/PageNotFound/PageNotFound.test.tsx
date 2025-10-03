import { Mock, vi } from 'vitest'
import PageNotFound from './PageNotFound'
import { render } from '../../test-utils'
import { useAuth } from '../../context/AuthContext'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({})),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('PageNotFound', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render Page not found text', () => {
    const { getByText } = render(<PageNotFound />)
    expect(getByText('pageNotFound>notFound')).toBeInTheDocument()
  })

  it('should render Page not found description', () => {
    const { getByText } = render(<PageNotFound />)
    expect(getByText('pageNotFound>notFoundDescription')).toBeInTheDocument()
  })

  it('should render a Go to Login button', () => {
    const { getByText } = render(<PageNotFound />)
    expect(getByText('pageNotFound>goToLogin')).toBeInTheDocument()
  })

  it('should render a Go to Dashboard button', () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: { uid: '123', email: 'test@user.com' },
    })

    const { getByText } = render(<PageNotFound />)
    expect(getByText('pageNotFound>goToDashboard')).toBeInTheDocument()
  })
})
