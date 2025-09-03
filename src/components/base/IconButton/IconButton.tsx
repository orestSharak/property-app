import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { Tooltip } from '../Tooltip/Tooltip'
import { Size } from './IconButton.types'
import { StyledIconButton } from './IconButton.styles'

export type IconButtonProps = {
  icon: ReactNode
  title: string
  size?: Size
  color?: string
  disabled?: boolean
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, title: title, color, disabled = false, size = 'sm', className, ...rest }, ref) => {
    return (
      <Tooltip id={'icon-button-tooltip'} content={title} placement="top">
        <StyledIconButton
          ref={ref}
          type="button"
          aria-label={title}
          $color={color}
          $size={size}
          $disabled={!!disabled}
          disabled={disabled}
          tabIndex={0}
          className={className}
          {...rest}
        >
          {icon}
        </StyledIconButton>
      </Tooltip>
    )
  },
)

IconButton.displayName = 'IconButton'
export { IconButton }
