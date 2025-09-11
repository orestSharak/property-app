import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from './TextCellRenderer.styles'
import { Status } from '../../../../common/types'
import { EMPTY_VALUE } from '../../../../common/constants'

type TextCellRendererProps = {
  title?: string
  isStatus?: boolean
}

const TextCellRenderer = ({ title, isStatus }: TextCellRendererProps) => {
  const { t } = useTranslation()
  if (!title) return EMPTY_VALUE

  const status = isStatus ? (title as Status) : undefined
  const statusTitle = status === 'default' ? EMPTY_VALUE : t(`table>cellRenderer>text>${status}`)
  const text = status ? statusTitle : title

  return <Text $status={status}>{text}</Text>
}

export default memo(TextCellRenderer)
