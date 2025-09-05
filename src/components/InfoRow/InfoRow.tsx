import { memo } from 'react'
import { Container, Label, Value } from './InfoRow.styles'
import { Status } from '../../common/types'

type InfoRowProps = {
  label: string
  value: string
  valueVariant?: Status
}

function _InfoRow(props: InfoRowProps) {
  const { label, value, valueVariant } = props

  return (
    <Container>
      <Label>{label}</Label>
      <Value variant={valueVariant}>{value}</Value>
    </Container>
  )
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
export const InfoRow = memo(_InfoRow)
