import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test-utils'
import PropertyItem from './PropertyItem'

import { Status } from '../../../common/types'
import { useMediaQuery } from '../../../hooks/helpers/useMediaQuery'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...(actual as Object),
    useNavigate: () => mockNavigate,
    Link: vi.fn(({ to, children, ...props }) => (
      <button onClick={() => mockNavigate(to)} data-href={to} {...props}>
        {children}
      </button>
    )),
  }
})

vi.mock('../../../hooks/helpers/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}))

const defaultProps = {
  id: 'prop-123',
  address: '123 Main St',
  city: 'Milano',
  clientFullName: 'Martino Rossi',
  clientPhone: '555-1234',
  status: 'news' as Status,
  onMouseEnterOrFocus: vi.fn(),
  onMouseLeaveOrBlur: vi.fn(),
}

const renderComponent = (props = {}) => {
  const mergedProps = { ...defaultProps, ...props }
  return render(
    <BrowserRouter>
      <PropertyItem {...mergedProps} />
    </BrowserRouter>,
  )
}

describe('PropertyItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly passed props', () => {
    const { getByText } = renderComponent()

    const seeMoreLink = getByText('dashboard>propertyItem>seeMore').closest('button')

    expect(seeMoreLink).toHaveAttribute('data-href', `/properties/${defaultProps.id}`)
    expect(getByText(`${defaultProps.address}, ${defaultProps.city}`)).toBeInTheDocument()
    expect(getByText('dashboard>propertyItem>name')).toBeInTheDocument()
    expect(getByText(defaultProps.clientFullName)).toBeInTheDocument()
    expect(getByText('dashboard>propertyItem>phone')).toBeInTheDocument()
    expect(getByText(defaultProps.clientPhone)).toBeInTheDocument()
    expect(getByText('dashboard>propertyItem>news')).toBeInTheDocument()
  })

  it('should not render the phone section if clientPhone is empty', () => {
    const { queryByText } = renderComponent({ clientPhone: '' })

    expect(queryByText('dashboard>propertyItem>phone')).not.toBeInTheDocument()
  })

  it('should not render status wrapper if status is "default"', () => {
    const { queryByText } = renderComponent({ status: 'default' as Status })

    expect(queryByText('dashboard>propertyItem>default')).not.toBeInTheDocument()
  })

  it('should render correct status if status is "news"', () => {
    const { getByText } = renderComponent({ status: 'news' as Status })

    expect(getByText('dashboard>propertyItem>news')).toBeInTheDocument()
  })

  it('should call onMouseEnterOrFocus when mouse enters the container', async () => {
    const user = userEvent.setup()
    const { getByText } = renderComponent()

    const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest('div')

    await user.hover(rootContainer)

    await waitFor(() => {
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledTimes(1)
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledWith(defaultProps.id)
    })
  })

  it('should call onMouseLeaveOrBlur when mouse leaves the container', async () => {
    const user = userEvent.setup()
    const { getByText } = renderComponent()
    const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest('div')

    await user.hover(rootContainer)
    await user.unhover(rootContainer)

    await waitFor(() => {
      expect(defaultProps.onMouseLeaveOrBlur).toHaveBeenCalledTimes(1)
    })
  })

  it('calls onMouseEnterOrFocus when the container gains focus', async () => {
    const user = userEvent.setup()
    const { getByText } = renderComponent()
    const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest(
      '[tabindex="0"]',
    )

    await user.tab()

    await waitFor(() => {
      expect(rootContainer).toHaveFocus()
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledTimes(1)
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledWith(defaultProps.id)
    })
  })

  it('should call onMouseLeaveOrBlur when the container loses focus', async () => {
    const user = userEvent.setup()
    const { getByText } = renderComponent()
    const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest(
      '[tabindex="0"]',
    )

    await user.tab()

    await waitFor(() => {
      expect(rootContainer).toHaveFocus()
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledTimes(1)
      expect(defaultProps.onMouseEnterOrFocus).toHaveBeenCalledWith(defaultProps.id)
    })

    await user.tab()

    await waitFor(() => {
      expect(rootContainer).not.toHaveFocus()
      expect(defaultProps.onMouseLeaveOrBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Desktop/Tablet View (isMobile is false)', () => {
    it('should render the "See More" link and click on container does NOT navigate', async () => {
      const { getByText } = renderComponent()
      const user = userEvent.setup()

      const seeMoreLink = getByText('dashboard>propertyItem>seeMore')
      expect(seeMoreLink).toBeInTheDocument()

      expect(seeMoreLink.closest('button')).toHaveAttribute(
        'data-href',
        `/properties/${defaultProps.id}`,
      )

      const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest(
        'div',
      )
      await user.click(rootContainer)

      expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('should render the "See More" link and click on "See More" should navigate properly', async () => {
      const { getByText } = renderComponent()
      const user = userEvent.setup()

      const seeMoreLink = getByText('dashboard>propertyItem>seeMore')
      expect(seeMoreLink).toBeInTheDocument()
      expect(seeMoreLink.closest('button')).toHaveAttribute(
        'data-href',
        `/properties/${defaultProps.id}`,
      )

      await user.click(seeMoreLink)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith(`/properties/${defaultProps.id}`)
      })
    })
  })

  describe('Mobile View (isMobile is true)', () => {
    it('should not render the "See More" link and click on container should navigate properly', async () => {
      ;(useMediaQuery as Mock).mockReturnValue(true)

      const { queryByText, getByText } = renderComponent()
      const user = userEvent.setup()

      expect(queryByText('dashboard>propertyItem>seeMore')).not.toBeInTheDocument()

      const rootContainer = getByText(`${defaultProps.address}, ${defaultProps.city}`).closest(
        'div',
      )
      await user.click(rootContainer!)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith(`/properties/${defaultProps.id}`)
      })
    })
  })
})
