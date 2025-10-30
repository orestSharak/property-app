import { memo } from 'react'
import { EMPTY_VALUE } from '../../common/constants'
import { ExternalLinkWrapper } from './ExternalLink.styles'

type ExternalLinkProps = { isPhone?: boolean; isEmail?: boolean; value?: string }

function _ExternalLink({ isPhone, isEmail, value }: ExternalLinkProps) {
  if (!value) return EMPTY_VALUE
  let href: string | undefined

  if (isPhone) {
    const cleanPhoneNumber = value.replace(/[\s-()]/g, '')
    href = `tel:${cleanPhoneNumber}`
  } else if (isEmail) {
    href = `mailto:${value}`
  }

  if (!href) return value

  return (
    <ExternalLinkWrapper href={href} target="_blank" rel="noopener noreferrer">
      {value}
    </ExternalLinkWrapper>
  )
}
export const ExternalLink = memo(_ExternalLink)
