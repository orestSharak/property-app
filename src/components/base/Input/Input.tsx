import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react'
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

/**
 * `Input` is a flexible and accessible text input component.
 * It supports various states like `disabled` and `error`, includes optional hint text, and can display an icon or other element at the end of the input field.
 *
 * @param {object} props - The component props.
 * @param {string} props.id - A unique ID for the input, required for accessibility.
 * @param {string} props.label - The label text for the input.
 * @param {'inline' | 'overline'} [props.direction='overline'] - Defines the layout of the label and the input field.
 * @param {boolean} [props.hideLabel=false] - If `true`, the label is visually hidden but remains accessible to screen readers.
 * @param {string} [props.hint] - A hint text displayed below the input.
 * @param {string} [props.error] - An error message displayed below the input.
 * @param {HTMLInputTypeAttribute} [props.type='text'] - The type of the input element (e.g., 'text', 'password', 'email').
 * @param {boolean} [props.required] - If `true`, a required indicator (`*`) is displayed next to the label.
 * @param {boolean} [props.disabled] - If `true`, the input is disabled and non-interactive.
 * @param {React.ReactNode} [props.slotEnd] - An optional element to display at the end of the input field.
 * @param {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>} rest - All other standard HTML input attributes.
 * @param {React.Ref<HTMLInputElement>} ref - A ref to the underlying HTML input element.
 * @returns {JSX.Element} The rendered Input component.
 *
 * @example
 * // A standard text input with a label
 * <Input id="name" label="Full Name" />
 *
 * @example
 * // An email input with hint and error messages
 * <Input
 * id="email"
 * label="Email Address"
 * type="email"
 * hint="Enter a valid email"
 * error="Please use the correct format"
 * />
 *
 * @example
 * // A password input with a slot for an icon and inline label
 * <Input
 * id="password"
 * label="Password"
 * type="password"
 * direction="inline"
 * slotEnd={<LockIcon />}
 * />
 */
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
            $hasSlotEnd={!!slotEnd}
            ref={ref}
            id={id}
            type={type}
            $hasError={!!error}
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
