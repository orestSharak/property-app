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

/**
 * `Tooltip` is a component that provides a contextual popover with information when a user hovers over or focuses on an element.
 * It automatically handles visibility, positioning, and accessibility, making it a valuable tool for providing extra details without cluttering the UI.
 *
 * @param  props - The component's props.
 * @param  props.content - The text content to be displayed inside the tooltip popover.
 * @param  props.id - A unique ID for the tooltip. This is crucial for accessibility, as it links the trigger element to the popover via `aria-describedby`.
 * @param  [props.placement='top'] - The position of the tooltip relative to its child element.
 * @param  [props.disabled] - If `true`, the tooltip will not be shown on hover or focus.
 * @param  [props.hideDelay=90] - The delay in milliseconds before the tooltip hides after the user stops hovering. This prevents the tooltip from flickering when moving the cursor between the trigger and the tooltip.
 * @param  [props.className] - Optional CSS class for custom styling.
 * @param  props.children - The single child element that will trigger the tooltip.
 * @returns - The rendered Tooltip component.
 *
 * @example
 * // A basic tooltip on a button
 * <Tooltip content="Click to submit" id="submit-tooltip">
 * <button>Submit</button>
 * </Tooltip>
 *
 * @example
 * // A tooltip with a different placement and a longer hide delay
 * <Tooltip
 * content="This is an informational message."
 * id="info-tooltip"
 * placement="right"
 * hideDelay={200}
 * >
 * <span tabIndex={0}>i</span>
 * </Tooltip>
 */
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
  const length = content.length

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
          $length={length}
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
