import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { TooltipArrow, TooltipPopover, TooltipWrapper } from './Tooltip.styles'
import { TooltipPlacement } from './Tooltip.types'

type TooltipProps = {
  content: string
  id: string
  placement?: TooltipPlacement
  disabled?: boolean
  hideDelay?: number
  className?: string
}

const Tooltip = ({
  content,
  children,
  placement = 'top',
  id,
  disabled,
  hideDelay = 90,
  className,
}: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(false)
  const [triggerActive, setTriggerActive] = useState(false)
  const [popoverActive, setPopoverActive] = useState(false)
  const hideTimeout = useRef<number | null>(null)

  // Tooltip is visible when trigger or tooltip is hovered/focused
  const computedVisible = !disabled && (triggerActive || popoverActive)

  useEffect(() => {
    if (computedVisible) {
      setVisible(true)
      hideTimeout.current && clearTimeout(hideTimeout.current)
    } else {
      if (hideDelay > 0) {
        // Hide after a delay (so user can move cursor between trigger and tooltip)
        hideTimeout.current = window.setTimeout(() => setVisible(false), hideDelay)
      } else {
        setVisible(false)
      }
    }
    return () => {
      hideTimeout.current && clearTimeout(hideTimeout.current)
    }
  }, [computedVisible, hideDelay])

  // Accessibility ARIA
  const ariaProps = disabled
    ? {}
    : {
        'aria-describedby': visible ? id : undefined,
      }

  const childElement = React.cloneElement(
    React.Children.only(children) as React.ReactElement<any>,
    {
      ...ariaProps,
      tabIndex: (children as any).props.tabIndex ?? 0,
      onFocus: (e: any) => {
        setTriggerActive(true)
        if ((children as any).props.onFocus) (children as any).props.onFocus(e)
      },
      onBlur: (e: any) => {
        setTriggerActive(false)
        if ((children as any).props.onBlur) (children as any).props.onBlur(e)
      },
      onMouseEnter: (e: any) => {
        setTriggerActive(true)
        if ((children as any).props.onMouseEnter) (children as any).props.onMouseEnter(e)
      },
      onMouseLeave: (e: any) => {
        setTriggerActive(false)
        if ((children as any).props.onMouseLeave) (children as any).props.onMouseLeave(e)
      },
      'aria-disabled': disabled || undefined,
    },
  )

  function onPopoverEnter() {
    setPopoverActive(true)
  }

  function onPopoverLeave() {
    setPopoverActive(false)
  }

  return (
    <TooltipWrapper className={className}>
      {childElement}
      {visible && (
        <TooltipPopover
          id={id}
          role="tooltip"
          aria-hidden={!visible}
          $placement={placement}
          $visible={visible}
          onMouseEnter={onPopoverEnter}
          onFocus={onPopoverEnter}
          onMouseLeave={onPopoverLeave}
          onBlur={onPopoverLeave}
          tabIndex={-1}
        >
          <TooltipArrow $placement={placement} />
          {content}
        </TooltipPopover>
      )}
    </TooltipWrapper>
  )
}

Tooltip.displayName = 'Tooltip'
export { Tooltip }
