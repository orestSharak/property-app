import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from './TextCellRenderer.styles'
import { Status } from '../../../../common/types'
import { EMPTY_VALUE } from '../../../../common/constants'
import { ExternalLink } from '../../../ExternalLink/ExternalLink'

type TextCellRendererProps = {
  title?: string | string[]
  isStatus?: boolean
  isNews?: boolean
  isContract?: boolean
  isPhone?: boolean
  isEmail?: boolean
}

const TextCellRenderer = ({
  title,
  isStatus,
  isNews = false,
  isContract = false,
  isPhone = false,
  isEmail = false,
}: TextCellRendererProps) => {
  const { t } = useTranslation()

  if (!title || title === '0') return EMPTY_VALUE

  if (isEmail || isPhone) return <ExternalLink isEmail={isEmail} isPhone={isPhone} value={title} />

  const status = isStatus ? (title as Status) : undefined
  const statusTitle = status === 'default' ? EMPTY_VALUE : t(`table>cellRenderer>text>${status}`)
  const text = status ? statusTitle : title

  return (
    <Text $status={status} $isNews={isNews} $isContract={isContract}>
      {text}
    </Text>
  )
}

export default memo(TextCellRenderer)
