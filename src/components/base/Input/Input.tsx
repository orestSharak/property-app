import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'
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
import { InputDirection, PasswordToggleIconType } from './Input.types'
import { PasswordToggle } from './PasswordToggle'
import EyeIcon from '../../../assets/icons/eye-icon.svg'
import EyeIconHide from '../../../assets/icons/eye-hide-icon.svg'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  PasswordToggleIconType & {
    id: string
    direction?: InputDirection
    label: string
    hideLabel?: boolean
    hint?: string
    error?: string
    type?: HTMLInputTypeAttribute
    slotEnd?: ReactNode
    minWidth?: number
  }

/**
 * `Input` is a flexible and accessible text input component.
 * It supports various states like `disabled` and `error`, includes optional hint text, and can display a custom element or a built-in password toggle icon at the end of the input field.
 *
 * @param {object} props - The component props.
 * @param {string} props.id - A unique ID for the input, required for accessibility.
 * @param {string} props.label - The label text for the input.
 * @param {'inline' | 'overline'} [props.direction='overline'] - Defines the layout of the label and the input field.
 * @param {boolean} [props.hideLabel=false] - If `true`, the label is visually hidden but remains accessible to screen readers.
 * @param {string} [props.hint] - A hint text displayed below the input.
 * @param {string} [props.error] - An error message displayed below the input.
 * @param {string} [props.minWidth] - A minimal width for the input.
 * @param {HTMLInputTypeAttribute} [props.type='text'] - The type of the input element (e.g., 'text', 'password', 'email'). If the type is 'password', a toggle icon is automatically added to show/hide the password.
 * @param {boolean} [props.required] - If `true`, a required indicator (`*`) is displayed next to the label.
 * @param {boolean} [props.disabled] - If `true`, the input is disabled and non-interactive.
 * @param {React.ReactNode} [props.slotEnd] - An optional element to display at the end of the input field. This takes precedence over the default password toggle icon.
 * @param {{show: React.ReactNode; hide: React.ReactNode}} [props.passwordToggleIcons] - Custom icons for the password show/hide toggle. Requires `type="password"`.
 * @param {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>} rest - All other standard HTML input attributes.
 * @param {React.Ref<HTMLInputElement>} ref - A ref to the underlying HTML input element.
 * @returns {JSX.Element} The rendered Input component.
 *
 * @example
 * // A standard text input with a label
 * <Input id="name" label="Full Name" />
 *
 * @example
 * // A password input with built-in show/hide functionality
 * <Input id="password" label="Password" type="password" />
 *
 * @example
 * // A password input with custom show/hide icons
 * <Input
 * id="password-custom"
 * label="Password"
 * type="password"
 * passwordToggleIcons={{
 * show: <VisibleIcon />,
 * hide: <InvisibleIcon />,
 * }}
 * />
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
      minWidth,
      hideLabel = false,
      passwordToggleIcons = {
        show: <EyeIcon />,
        hide: <EyeIconHide />,
      },
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    // for aria-describedby links
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    const isPassword = type === 'password'
    const hasSlotEnd = !!slotEnd || isPassword
    const inputType: HTMLInputTypeAttribute = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : type
    const isOverlineDirection = direction === 'overline'

    return (
      <InputWrap $direction={direction}>
        {!hideLabel && (
          <Label $direction={direction} htmlFor={id}>
            {label}
            {required && isOverlineDirection && <LabelStar aria-hidden="true">*</LabelStar>}
          </Label>
        )}
        <InputContainer $hasError={!!error}>
          <StyledInput
            autoComplete="off"
            $hasSlotEnd={hasSlotEnd}
            ref={ref}
            id={id}
            $minWidth={minWidth}
            type={inputType}
            $hasError={!!error}
            required={required}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={required || undefined}
            aria-label={hideLabel ? label : undefined}
            {...rest}
          />
          {/* slotEnd has precedence unless it's password */}
          {slotEnd && <IconContainer aria-hidden="true">{slotEnd}</IconContainer>}
          {!slotEnd && isPassword && (
            <IconContainer>
              {
                <PasswordToggle
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  passwordToggleIcons={passwordToggleIcons}
                />
              }
            </IconContainer>
          )}
          {hint && <HintText id={hintId}>{hint}</HintText>}
          {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
        </InputContainer>
      </InputWrap>
    )
  },
)

Input.displayName = 'Input'
export { Input }
