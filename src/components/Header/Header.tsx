import { memo } from 'react'
import { Container, Count, Title } from './Header.styles'
import { Size } from './Heasder.types'

type HeaderProps = {
  title: string
  count?: number
  size?: Size
  hideCount?: boolean
}

/**
 * `Header` is a versatile component that displays a title and an optional count.
 *
 * @param {object} props - The component's props.
 * @param {string} [props.title] - The title text to display.
 * @param {number} [props.count] - An optional numerical value to show next to the title.
 * @param {boolean} [props.hideCount] - An optional boolean to hide the count.
 * @param {'sm' | 'md' | 'lg'} [props.size='lg'] - The size of the title text.
 *
 * @example
 * // A header with a title and a count
 * <Header title="Cities" count={12} />
 */
function _Header({ title, count = 0, size = 'lg', hideCount }: HeaderProps) {
  return (
    <Container>
      <Title $size={size}>{title}</Title>
      {!hideCount && <Count>{count}</Count>}
    </Container>
  )
}

export const Header = memo(_Header)
