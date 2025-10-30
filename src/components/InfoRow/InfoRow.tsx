import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Label, Value } from './InfoRow.styles'
import { Status } from '../../common/types'
import { EMPTY_VALUE } from '../../common/constants'
import { ExternalLink } from '../ExternalLink/ExternalLink'

type InfoRowProps = {
  label: string
  value: string
  valueVariant?: Status
  isPhone?: boolean
  isEmail?: boolean
}

/**
 * `InfoRow` is a simple component that displays a key-value pair of information.
 * It's perfect for use in lists or detail views to clearly present labeled data.
 * The value text can also be styled with different variants.
 *
 * @param {object} props - The component's props.
 * @param {string} props.label - The label for the information (e.g., "Email", "Phone Number").
 * @param {string} props.value - The value associated with the label (e.g., "user@example.com", "555-123-4567").
 * @param {Status} [props.valueVariant='default'] - The visual variant for the value text.
 * @returns {JSX.Element} The rendered InfoRow component.
 *
 * @example
 * // Displaying a user's email address
 * <InfoRow label="Email" value="john.doe@example.com" />
 *
 * @example
 * // Displaying a user's status with a success variant
 * <InfoRow label="Status" value="Active" valueVariant={Status.NEWS} />
 */
const InfoRow = memo((props: InfoRowProps) => {
  const { t } = useTranslation()

  const { label, value, valueVariant, isPhone, isEmail } = props

  const getValue = useCallback(() => {
    if (isPhone) return <ExternalLink isPhone value={value} />
    if (isEmail) return <ExternalLink isEmail value={value} />
    if (!valueVariant) return value
    if (value !== 'default') return t(`infoRow>${value}`)

    return EMPTY_VALUE
  }, [isPhone, value, isEmail, valueVariant, t])

  return (
    <Container>
      <Label>{label}</Label>
      <Value $variant={valueVariant}>{getValue()}</Value>
    </Container>
  )
})

InfoRow.displayName = 'InfoRow'
export { InfoRow }
