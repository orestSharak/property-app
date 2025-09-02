import { FC, JSX, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { formatTimestamp } from '../../../utils/utils'
import { DateWrapper, CardContainer, CardHeaderRow, StyledLink } from './Card.styles'

type CardProps = {
  header?: string
  headerId?: string
  link?: string
  date?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  ariaLabelledBy?: string
}

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
