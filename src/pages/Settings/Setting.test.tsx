import { expect, Mock, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { fireEvent, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { render } from '../../test-utils'
import { useAuth } from '../../context/AuthContext'
import Settings from './Settings'
import { UserData, useUpdateUser } from '../../hooks/user/useUpdateUser'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({})),
}))

const mockNavigate = vi.fn()
const mockReset = vi.fn()
const mockSetError = vi.fn()
const mockUpdateUser = vi.fn()
const mockShowToast = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
}))

vi.mock('../../hooks/user/useUpdateUser', () => ({
  useUpdateUser: () => ({ updateUser: vi.fn() }),
}))
vi.mock('../../hooks/toast/useToast', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}))

vi.mock('../../hooks/helpers/useMediaQuery', () => ({
  useMediaQuery: () => false,
}))

vi.mock('../../hooks/user/useUpdateUser', () => ({
  useUpdateUser: vi.fn(() => ({
    updateUser: (data: any, options: any) => {
      mockUpdateUser(data, options)
      options.onSuccess()
    },
    isUpdating: false,
    updateError: null,
    updateStatus: 'idle',
  })),
}))

const userName = 'Mario'
const userSurname = 'Rossi'
const NewName = 'Luigi'
const NewSurname = 'Bianchi'

let controllerValueName = userName
let controllerValueSurname = userSurname
let controllerErrors = undefined

const UserDetails = {
  uid: '123',
  email: 'test@user.com',
  displayName: `${userName} ${userSurname}`,
}

const UserWithoutDisplayName = {
  uid: '123',
  email: 'test@user.com',
  displayName: null,
}

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    control: {},
    handleSubmit: vi.fn((cb) => (e: Event) => cb(e)),
    reset: vi.fn(),
    setError: vi.fn(),
    formState: { isDirty: false, errors: controllerErrors || {} },
  })),

  Controller: (props: any) => {
    const value = props.name === 'name' ? controllerValueName : controllerValueSurname
    const error = controllerErrors?.[props.name]

    return props.render({
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

describe('Settings', () => {
  afterEach(() => {
    vi.clearAllMocks()

    controllerValueName = userName
    controllerValueSurname = userSurname
    controllerErrors = undefined
  })

  it('should render name and surname of user', () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: UserDetails,
    })
    const { getByText, getByDisplayValue } = render(<Settings />)
    const nameLabel = getByText('settings>name')
    const surnameLabel = getByText('settings>surname')

    expect(nameLabel).toBeInTheDocument()
    expect(surnameLabel).toBeInTheDocument()
    expect(getByDisplayValue(userName)).toBeInTheDocument()
    expect(getByDisplayValue(userSurname)).toBeInTheDocument()
  })

  it('should render a user email', () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: UserDetails,
    })
    const { getByText, getByDisplayValue } = render(<Settings />)
    const emailLabel = getByText('settings>email')

    expect(emailLabel).toBeInTheDocument()
    expect(getByDisplayValue(UserDetails.email)).toBeInTheDocument()
  })

  it('should render error when no displayName', async () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: UserWithoutDisplayName,
    })

    controllerValueName = ''
    controllerValueSurname = ''

    controllerErrors = {
      name: { type: 'custom', message: 'provideName' },
      surname: { type: 'custom', message: 'provideSurname' },
    }

    const { getByText, getByPlaceholderText } = render(<Settings />)

    await waitFor(() => {
      expect(getByText('settings>provideName')).toBeInTheDocument()
      expect(getByText('settings>provideSurname')).toBeInTheDocument()
      expect(getByPlaceholderText('settings>namePlaceholder')).toHaveValue('')
    })
  })

  it('should successfully update user data', async () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: UserDetails,
    })

    const submitData = {
      name: NewName,
      surname: NewSurname,
    }

    const mockHandleSubmit = vi.fn((cb) => () => cb(submitData))

    ;(useForm as Mock).mockImplementation(() => ({
      control: {},
      handleSubmit: mockHandleSubmit,
      reset: mockReset,
      setError: mockSetError,
      formState: { isDirty: true, errors: {} },
    }))

    const user = userEvent.setup()

    const { getByText, getByLabelText, container } = render(<Settings />)

    const nameInput = getByLabelText('settings>name')
    const surnameInput = getByLabelText('settings>surname')
    const updateButton = getByText('settings>update')
    const form = container.querySelector('form')

    await user.clear(nameInput)
    await user.type(nameInput, NewName)

    await user.clear(surnameInput)
    await user.type(surnameInput, NewSurname)

    expect(updateButton).toBeEnabled()
    //await user.click(updateButton)
    // to prevent this error: Not implemented: HTMLFormElement.prototype.requestSubmit
    fireEvent.submit(form)

    await waitFor(() => {
      const expectedUpdateData = {
        displayName: `${NewName} ${NewSurname}`,
      }

      expect(mockUpdateUser).toHaveBeenCalledWith(expectedUpdateData, expect.anything())
      expect(mockShowToast).toHaveBeenCalledWith({
        content: 'settings>toast>successfullyUpdate',
        status: 'success',
      })
    })
  })

  it('should failed user data update', async () => {
    ;(useAuth as Mock).mockReturnValue({
      currentUser: UserDetails,
    })

    const submitData = {
      name: NewName,
      surname: NewSurname,
    }

    const mockHandleSubmit = vi.fn((cb) => () => cb(submitData))

    ;(useForm as Mock).mockImplementation(() => ({
      control: {},
      handleSubmit: mockHandleSubmit,
      reset: mockReset,
      setError: mockSetError,
      formState: { isDirty: true, errors: {} },
    }))
    ;(useUpdateUser as Mock).mockImplementation(() => ({
      updateUser: (data: UserData, options: any) => {
        mockUpdateUser(data, options)
        options.onError()
      },

      isUpdating: false,
      updateError: new Error('Mocked error'),
      updateStatus: 'error',
    }))

    const user = userEvent.setup()

    const { getByText, getByLabelText, container } = render(<Settings />)

    const nameInput = getByLabelText('settings>name')
    const surnameInput = getByLabelText('settings>surname')
    const updateButton = getByText('settings>update')
    const form = container.querySelector('form')

    await user.clear(nameInput)
    await user.type(nameInput, NewName)

    await user.clear(surnameInput)
    await user.type(surnameInput, NewSurname)

    expect(updateButton).toBeEnabled()
    //await user.click(updateButton)
    // to prevent this error: Not implemented: HTMLFormElement.prototype.requestSubmit
    fireEvent.submit(form)

    await waitFor(() => {
      const expectedUpdateData = {
        displayName: `${NewName} ${NewSurname}`,
      }

      expect(mockUpdateUser).toHaveBeenCalledWith(expectedUpdateData, expect.anything())
      expect(mockShowToast).toHaveBeenCalledWith({
        content: 'settings>toast>failedUpdate',
        status: 'error',
      })
    })
  })
})
