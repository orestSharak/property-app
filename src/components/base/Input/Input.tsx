import { forwardRef, InputHTMLAttributes, HTMLInputTypeAttribute, ReactNode } from 'react'
import {
  ErrorText,
  HintText,
  IconContainer,
  InputWrap,
  Label,
  LabelStar,
  StyledInput,
} from './Input.styles'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  id: string
  label: string
  hint?: string
  error?: string
  type?: HTMLInputTypeAttribute
  slotEnd?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, hint, error, type = 'text', required, disabled, slotEnd, ...rest }, ref) => {
    // for aria-describedby links
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <InputWrap>
        <Label htmlFor={id} disabled={disabled}>
          {label}
          {required && <LabelStar aria-hidden="true">*</LabelStar>}
        </Label>
        <StyledInput
          ref={ref}
          id={id}
          type={type}
          hasError={!!error}
          required={required}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          aria-describedby={ariaDescribedBy}
          aria-required={required || undefined}
          {...rest}
        />
        {slotEnd && <IconContainer aria-hidden="true">{slotEnd}</IconContainer>}
        {hint && <HintText id={hintId}>{hint}</HintText>}
        {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
      </InputWrap>
    )
  },
)

Input.displayName = 'Input'
export { Input }
