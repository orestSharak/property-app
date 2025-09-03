import React, { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'
import { ButtonSize, ButtonVariant } from './Button.types'
import { StyledButton } from './Button.styles'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
} & PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

/**
 * `Button` is a versatile component that renders a stylized HTML `<button>` element.
 * It supports different visual styles and sizes and can be easily disabled.
 *
 * @param {object} props - The component props.
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} [props.variant='primary'] - The visual style of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {boolean} [props.disabled=false] - If true, the button is disabled and non-interactive.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {string} [props.className] - Optional CSS class for custom styling.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} rest - All other standard HTML button attributes.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the underlying HTML button element.
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * // A primary button with default size
 * <Button variant="primary">Click Me</Button>
 *
 * @example
 * // A small, secondary button
 * <Button variant="secondary" size="sm">Cancel</Button>
 *
 * @example
 * // A disabled danger button
 * <Button variant="danger" disabled>Delete</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled = false, children, className, ...rest }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'
export { Button }
