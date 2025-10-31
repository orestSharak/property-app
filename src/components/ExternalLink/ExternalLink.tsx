import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { EMPTY_VALUE } from '../../common/constants'
import { ExternalLinkContainer, ExternalLinkWrapper, IconWrapper } from './ExternalLink.styles'
import CopyIcon from '../../assets/icons/copy-icon.svg'
import { IconButton } from '../base/IconButton/IconButton'
import { useMediaQuery } from '../../hooks/helpers/useMediaQuery'
import { useCopyToClipboard } from '../../hooks/helpers/useCopyToClipboard'

type ExternalLinkProps = {
  isPhone?: boolean
  isEmail?: boolean
  isLink?: boolean
  value?: string | string[]
}

const getLinkPrefix = (isPhone: boolean, isEmail: boolean): string | null => {
  if (isPhone) return 'tel:'
  if (isEmail) return 'mailto:'
  return null
}

const ExternalLink = memo(({ isPhone, isEmail, isLink, value }: ExternalLinkProps) => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery()
  const copyToClipboard = useCopyToClipboard()

  if (!value || (Array.isArray(value) && value.length === 0)) {
    return EMPTY_VALUE
  }

  const values = Array.isArray(value) ? value : [value]

  const prefix = getLinkPrefix(!!isPhone, !!isEmail)

  if (!prefix && !isLink) {
    return <>{values.join(', ')}</>
  }

  return (
    <>
      {values.map((item, index) => {
        if (!item) return null

        const linkValue = isPhone ? item.replace(/[\s-()]/g, '') : item
        const href = isLink && !Array.isArray(value) ? value : `${prefix}${linkValue}`

        return (
          <ExternalLinkContainer $link={isLink} key={index} $hasList={index < values.length - 1}>
            <ExternalLinkWrapper
              $link={isLink}
              $isMobile={isMobile}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item}
            </ExternalLinkWrapper>
            {isLink && (
              <IconButton
                noTooltip
                icon={
                  <IconWrapper>
                    <CopyIcon />
                  </IconWrapper>
                }
                title={t('externalLink>copy')}
                onClick={async () => await copyToClipboard(item)}
              />
            )}
          </ExternalLinkContainer>
        )
      })}
    </>
  )
})

ExternalLink.displayName = 'ExternalLink'
export { ExternalLink }
