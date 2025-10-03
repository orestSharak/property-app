import { FC, JSX, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { formatTimestamp } from '../../../utils/utils'
import {
  CardContainer,
  CardHeaderRow,
  ChildWrapper,
  Date,
  DeleteIcon,
  IconWrapper,
  StyledLink,
  TopContainer,
  Wrapper,
} from './Card.styles'
import CrossIcon from '../../../assets/icons/cross-icon.svg'

type CardProps = {
  header?: string
  headerId?: string
  link?: string
  date?: number
  as?: keyof JSX.IntrinsicElements
  ariaLabelledBy?: string
  width?: number
  hasList?: boolean
  compact?: boolean
  deleteMessage?: string
  onDelete?: () => void
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
 * @param  [props.as='div'] - The HTML element type to render the card container as (e.g., 'div', 'section', 'article').
 * @param  [props.hasList=false] - A boolean flag to apply specific styles when the children are a list.
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
  as = 'div',
  ariaLabelledBy,
  width,
  hasList = false,
  compact = false,
  deleteMessage,
  onDelete,
}) => {
  const { t } = useTranslation()

  const hasContent = !!header || !!link
  const hasTopContent = !!onDelete || !!date
  const hasLinkOnly = !header && !!link
  const labelledBy = ariaLabelledBy || (headerId && header ? headerId : undefined)

  return (
    <Wrapper width={width} as={as} $hasDelete={!!onDelete} tabIndex={onDelete ? 0 : undefined}>
      {hasTopContent && (
        <TopContainer>
          {date && <Date dateTime={formatTimestamp(date)}>{formatTimestamp(date)}</Date>}
          {!!onDelete && deleteMessage && (
            <DeleteIcon
              size="sm"
              onClick={onDelete}
              icon={
                <IconWrapper>
                  <CrossIcon />
                </IconWrapper>
              }
              title={deleteMessage}
            />
          )}
        </TopContainer>
      )}
      <CardContainer $hasContent={hasContent} aria-labelledby={labelledBy} $compact={compact}>
        {hasContent && (
          <CardHeaderRow $hasLinkOnly={hasLinkOnly}>
            {header && <div id={headerId}>{header}</div>}
            {link && <StyledLink to={link}>{t('card>seeDetails')}</StyledLink>}
          </CardHeaderRow>
        )}
        <ChildWrapper $hasList={hasList}>{children}</ChildWrapper>
      </CardContainer>
    </Wrapper>
  )
}

Card.displayName = 'Card'
export { Card }
