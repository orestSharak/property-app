import { render } from '@testing-library/react'
import PageNotFound from './PageNotFound'

describe('PageNotFound', () => {
  it('should render correct text', () => {
    const { getByText } = render(<PageNotFound />)
    expect(getByText('pages>pageNotFound')).toBeInTheDocument()
  })
})
