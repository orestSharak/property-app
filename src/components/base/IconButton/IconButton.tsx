import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { Tooltip } from '../Tooltip/Tooltip'
import { Size } from './IconButton.types'
import { StyledIconButton } from './IconButton.styles'
import { TooltipPlacement } from '../Tooltip/Tooltip.types'

export type IconButtonProps = {
  icon: ReactNode
  title: string
  size?: Size
  color?: string
  disabled?: boolean
  className?: string
  noTooltip?: boolean
  tooltipPlacement?: TooltipPlacement
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * `IconButton` is a reusable component that renders a button with an icon.
 * It's designed for simple, clickable actions and includes a built-in tooltip for accessibility and user guidance.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.icon - The icon to be displayed inside the button.
 * @param {string} props.title - The text content for the button's accessible label and tooltip. This is required.
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - The size of the button and icon.
 * @param {string} [props.color] - A custom color for the icon.
 * @param {boolean} [props.noTooltip] - Hide tooltip.
 * @param {boolean} [props.disabled=false] - If `true`, the button is disabled and non-interactive.
 * @param {React.HTMLAttributes<HTMLButtonElement>} rest - All other standard HTML button attributes.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the underlying HTML button element.
 * @returns {JSX.Element} The rendered IconButton component with a Tooltip.
 *
 * @example
 * // A small, primary icon button with a tooltip
 * <IconButton icon={<InfoIcon />} title="Learn more about this feature" />
 *
 * @example
 * // A large, disabled icon button with a custom color
 * <IconButton icon={<DeleteIcon />} title="Delete item" size="lg" color="red" disabled />
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      title: title,
      color,
      disabled = false,
      size = 'md',
      noTooltip = false,
      tooltipPlacement = 'top',
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        {noTooltip ? (
          <StyledIconButton
            ref={ref}
            type="button"
            aria-label={title}
            $color={color}
            $size={size}
            $disabled={!!disabled}
            disabled={disabled}
            tabIndex={0}
            {...rest}
          >
            {icon}
          </StyledIconButton>
        ) : (
          <Tooltip id={'icon-button-tooltip'} content={title} placement={tooltipPlacement}>
            <StyledIconButton
              ref={ref}
              type="button"
              aria-label={title}
              $color={color}
              $size={size}
              $disabled={!!disabled}
              disabled={disabled}
              tabIndex={0}
              {...rest}
            >
              {icon}
            </StyledIconButton>
          </Tooltip>
        )}
      </>
    )
  },
)

IconButton.displayName = 'IconButton'
export { IconButton }
