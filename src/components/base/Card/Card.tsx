import { FC, JSX, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { formatTimestamp } from '../../../utils/utils'
import { CardContainer, CardHeaderRow, DateWrapper, StyledLink } from './Card.styles'

type CardProps = {
  header?: string
  headerId?: string
  link?: string
  date?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  ariaLabelledBy?: string
}

/**
 * `Card` is a flexible container component used to display content in a card-like layout.
 * It can include a header, a link for navigation, and an optional date, and accepts any child elements.
 *
 * @param  props - The component props.
 * @param  [props.header] - The text content for the card's header.
 * @param  [props.headerId] - An optional ID for the header element, useful for accessibility.
 * @param  [props.link] - The URL for the "See details" link, which is displayed in the header.
 * @param  [props.date] - A Unix timestamp to display a formatted date above the card.
 * @param  [props.className] - Optional CSS class for custom styling.
 * @param  [props.as='div'] - The HTML element type to render the card container as (e.g., 'div', 'section', 'article').
 * @param  [props.ariaLabelledBy] - The ID of the element that labels the card, for accessibility.
 * @param  props.children - The content to be rendered inside the card container.
 * @example
 * // A basic card with a header and a link
 * <Card header="User Profile" link="/profile">
 * <p>This is the user's profile information.</p>
 * </Card>
 *
 * @example
 * // A card with a date, rendered as an <article> element
 * <Card date={1672531200000} as="article">
 * <h3>Latest Blog Post</h3>
 * <p>Here is some content for the blog post.</p>
 * </Card>
 */
const Card: FC<PropsWithChildren<CardProps>> = ({
  header,
  headerId,
  link,
  date,
  children,
  className,
  as = 'div',
  ariaLabelledBy,
}) => {
  const { t } = useTranslation()

  const hasTopContent = !!header || !!link
  const hasLinkOnly = !header && !!link
  const labelledBy = ariaLabelledBy || (headerId && header ? headerId : undefined)

  return (
    <>
      {date && (
        <DateWrapper>
          <time dateTime={formatTimestamp(date)}>{formatTimestamp(date)}</time>
        </DateWrapper>
      )}
      <CardContainer
        hasTopContent={hasTopContent}
        className={className}
        as={as}
        aria-labelledby={labelledBy}
      >
        {hasTopContent && (
          <CardHeaderRow $hasLinkOnly={hasLinkOnly}>
            {header && <div id={headerId}>{header}</div>}
            {link && <StyledLink to={link}>{t('card>seeDetails')}</StyledLink>}
          </CardHeaderRow>
        )}
        {children}
      </CardContainer>
    </>
  )
}

Card.displayName = 'Card'
export { Card }
