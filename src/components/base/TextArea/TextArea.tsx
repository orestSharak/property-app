import { forwardRef, TextareaHTMLAttributes } from 'react'
import {
  ErrorText,
  HintText,
  TextAreaContainer,
  TextAreaWrapper,
  Label,
  LabelStar,
  StyledTextArea,
} from './TextAreat.styles'

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  id: string
  label: string
  hideLabel?: boolean
  hint?: string
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, hint, error, required, disabled, hideLabel = false, ...rest }, ref) => {
    // for aria-describedby links
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <TextAreaWrapper>
        {!hideLabel && (
          <Label htmlFor={id} disabled={disabled}>
            {label}
            {required && <LabelStar aria-hidden="true">*</LabelStar>}
          </Label>
        )}
        <TextAreaContainer>
          <StyledTextArea
            ref={ref}
            id={id}
            hasError={!!error}
            required={required}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={required || undefined}
            aria-label={hideLabel ? label : undefined}
            {...rest}
          />
          {hint && <HintText id={hintId}>{hint}</HintText>}
          {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
        </TextAreaContainer>
      </TextAreaWrapper>
    )
  },
)

TextArea.displayName = 'TextArea'
export { TextArea }
