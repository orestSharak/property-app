import { memo } from 'react'
import { EMPTY_VALUE } from '../../common/constants'
import { ExternalLinkContainer, ExternalLinkWrapper } from './ExternalLink.styles'

type ExternalLinkProps = {
  isPhone?: boolean
  isEmail?: boolean
  value?: string | string[]
}

const getLinkPrefix = (isPhone: boolean, isEmail: boolean): string | null => {
  if (isPhone) return 'tel:'
  if (isEmail) return 'mailto:'
  return null
}

function _ExternalLink({ isPhone, isEmail, value }: ExternalLinkProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return EMPTY_VALUE
  }

  const values = Array.isArray(value) ? value : [value]

  const prefix = getLinkPrefix(!!isPhone, !!isEmail)

  if (!prefix) {
    return <>{values.join(', ')}</>
  }

  return (
    <>
      {values.map((item, index) => {
        if (!item) return null

        const linkValue = isPhone ? item.replace(/[\s-()]/g, '') : item
        const href = `${prefix}${linkValue}`

        return (
          <ExternalLinkContainer key={index} $hasList={index < values.length - 1}>
            <ExternalLinkWrapper href={href} target="_blank" rel="noopener noreferrer">
              {item}
            </ExternalLinkWrapper>
          </ExternalLinkContainer>
        )
      })}
    </>
  )
}

export const ExternalLink = memo(_ExternalLink)
