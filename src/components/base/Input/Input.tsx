import { forwardRef, InputHTMLAttributes, HTMLInputTypeAttribute, ReactNode } from 'react'
import {
  ErrorText,
  HintText,
  IconContainer,
  InputContainer,
  InputWrap,
  Label,
  LabelStar,
  StyledInput,
} from './Input.styles'
import { InputDirection } from './Input.types'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  id: string
  direction?: InputDirection
  label: string
  hideLabel?: boolean
  hint?: string
  error?: string
  type?: HTMLInputTypeAttribute
  slotEnd?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      direction = 'overline',
      label,
      hint,
      error,
      type = 'text',
      required,
      disabled,
      slotEnd,
      hideLabel = false,
      ...rest
    },
    ref,
  ) => {
    // for aria-describedby links
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    const isOverlineDirection = direction === 'overline'

    return (
      <InputWrap $direction={direction}>
        {!hideLabel && (
          <Label $direction={direction} htmlFor={id} disabled={disabled}>
            {label}
            {required && isOverlineDirection && <LabelStar aria-hidden="true">*</LabelStar>}
          </Label>
        )}
        <InputContainer>
          <StyledInput
            slotEnd={!!slotEnd}
            ref={ref}
            id={id}
            type={type}
            hasError={!!error}
            required={required}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={required || undefined}
            aria-label={hideLabel ? label : undefined}
            {...rest}
          />
          {slotEnd && <IconContainer aria-hidden="true">{slotEnd}</IconContainer>}
          {hint && <HintText id={hintId}>{hint}</HintText>}
          {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
        </InputContainer>
      </InputWrap>
    )
  },
)

Input.displayName = 'Input'
export { Input }
