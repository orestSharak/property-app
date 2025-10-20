import { afterEach, describe, expect, it, Mock, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { fireEvent, waitFor } from '@testing-library/react'
import { render } from '../../test-utils'
import Login from './Login'
import { useLogin } from '../../hooks/auth/useLogin'
import { LoginFormData } from '../../common/types'
import { useTheme } from '../../context/ThemeContext'

const mockLogin = vi.fn()
const mockShowToast = vi.fn()
const mockToggleTheme = vi.fn()
const mockChangeLanguage = vi.fn()

const VALID_EMAIL = 'test@example.com'
const VALID_PASSWORD = 'password123'
const LOGIN_SUCCESS_DATA = { email: VALID_EMAIL, password: VALID_PASSWORD }

vi.mock('../../hooks/auth/useLogin', () => ({
  useLogin: vi.fn(() => ({
    login: vi.fn(),
    isLoggingIn: false,
  })),
}))

vi.mock('../../context/ThemeContext', () => ({
  useTheme: vi.fn(() => ({
    themeMode: 'light', // Default theme mode
    toggleTheme: vi.fn(),
  })),
}))

vi.mock('../../hooks/toast/useToast', () => ({
  useToast: vi.fn(() => ({ showToast: mockShowToast })),
}))

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    control: {},
    handleSubmit: vi.fn((cb) => () => cb()),
    watch: vi.fn((name) => {
      if (name === 'email') return VALID_EMAIL
      if (name === 'password') return VALID_PASSWORD
      return ''
    }),
    formState: { isDirty: false, errors: {} },
  })),
  Controller: ({ render, ...props }: any) => {
    const value = props.name === 'email' ? '' : ''
    const error = undefined

    return render({
      field: {
        value,
        onChange: vi.fn(),
        onBlur: vi.fn(),
        name: props.name,
        ref: vi.fn(),
      },
      fieldState: { error },
    })
  },
}))

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  })),
}))

describe('Login', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render all form elements and action buttons', () => {
    const { getByText, getByLabelText } = render(<Login />)

    expect(getByText('login>title')).toBeInTheDocument()
    expect(getByLabelText('login>email')).toBeInTheDocument()
    expect(getByLabelText('login>password')).toBeInTheDocument()
    expect(getByText('login>login')).toBeInTheDocument()
  })

  it('should call login with correct data and status on successful submission', async () => {
    ;(useLogin as Mock).mockReturnValue({
      isLoggingIn: false,
      login: (data: LoginFormData, options: any) => {
        mockLogin(data, options)

        return Promise.resolve(undefined)
      },
      loginError: null as any,
    })

    const user = userEvent.setup()
    const { getByLabelText, container } = render(<Login />)

    const emailInput = getByLabelText('login>email')
    const passwordInput = getByLabelText('login>password')
    const form = container.querySelector('form')

    await user.clear(emailInput)
    await user.type(emailInput, VALID_EMAIL)

    await user.clear(passwordInput)
    await user.type(passwordInput, VALID_PASSWORD)

    // await user.click(loginButton)
    // to prevent this error: Not implemented: HTMLFormElement.prototype.requestSubmit
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(LOGIN_SUCCESS_DATA, expect.anything())
    })

    expect(mockShowToast).not.toHaveBeenCalled()
  })

  it('should show an error toast on failed login submission', async () => {
    ;(useLogin as Mock).mockReturnValue({
      isLoggingIn: false,
      login: (data: LoginFormData, options: any) => {
        mockLogin(data, options)
        options.onError()
      },
      loginError: null as any,
    })

    const user = userEvent.setup()
    const { getByLabelText, container } = render(<Login />)

    const emailInput = getByLabelText('login>email')
    const passwordInput = getByLabelText('login>password')
    const form = container.querySelector('form')

    await user.clear(emailInput)
    await user.type(emailInput, VALID_EMAIL)

    await user.clear(passwordInput)
    await user.type(passwordInput, VALID_PASSWORD)

    // await user.click(loginButton)
    // to prevent this error: Not implemented: HTMLFormElement.prototype.requestSubmit
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1)

      expect(mockShowToast).toHaveBeenCalledWith({
        content: 'login>failedLoginError',
        status: 'error',
      })
    })
  })

  it('should toggle theme on click', async () => {
    ;(useTheme as Mock).mockReturnValue({
      themeMode: 'light',
      toggleTheme: mockToggleTheme,
    })
    const user = userEvent.setup()

    const { getByLabelText } = render(<Login />)

    const themeButton = getByLabelText('login>dark')
    await user.click(themeButton)

    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('should switch language on click', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(<Login />)

    const langButton = getByLabelText('login>language')
    await user.click(langButton)

    expect(mockChangeLanguage).toHaveBeenCalledWith('it')
  })
})
