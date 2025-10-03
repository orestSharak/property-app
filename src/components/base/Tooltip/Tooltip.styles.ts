import styled, { css } from 'styled-components'
import { TooltipPlacement } from './Tooltip.types'

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: column;
`

export const TooltipPopover = styled.div<{
  $placement: TooltipPlacement
  $visible: boolean
  $length: number
}>`
  max-width: 300px;
  min-width: max-content;
  display: block;
  position: absolute;

  background: ${(p) => p.theme.colors.surface2};
  color: ${(p) => p.theme.colors.textOnSurface2};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  border-radius: ${(p) => p.theme.radius.sm};
  box-shadow: ${(p) => p.theme.colors.boxShadow2};
  z-index: ${(p) => p.theme.orderLevel.tooltip};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return css`
          left: 50%;
          bottom: 100%;
          margin-bottom: ${(p) => p.theme.spacing.sm};
          transform: translateX(-50%);
        `
      case 'bottom':
        return css`
          left: 50%;
          top: 100%;
          margin-top: ${(p) => p.theme.spacing.sm};
          transform: translateX(-50%);
        `
      case 'left':
        return css`
          top: 50%;
          right: 100%;
          margin-right: ${(p) => p.theme.spacing.sm};
          transform: translateY(-50%);
        `
      default:
        return css`
          left: 50%;
          top: 100%;
          margin-top: ${(p) => p.theme.spacing.sm};
          transform: translateX(-50%);
        `
    }
  }}

  ${({ $length }) =>
    $length > 15 &&
    css`
      min-width: 120px;
    `}
  padding: ${(p) => `${p.theme.spacing.xs} ${p.theme.spacing.sm}`};
  white-space: pre-line;
`

export const TooltipArrow = styled.div<{ $placement: TooltipPlacement }>`
  position: absolute;
  width: ${(p) => p.theme.spacing.xl};
  height: ${(p) => p.theme.spacing.sm};

  ${({ $placement, theme }) => {
    switch ($placement) {
      case 'top':
        return css`
          left: 50%;
          transform: translateX(-50%);
          bottom: -${theme.spacing.sm};
        `
      case 'bottom':
        return css`
          left: 50%;
          transform: translateX(-50%);
          top: -${theme.spacing.sm};
        `
      case 'left':
        return css`
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          right: -${theme.spacing.sm};
        `
      default:
        return css`
          left: 50%;
          transform: translateX(-50%);
          top: -${theme.spacing.sm};
        `
    }
  }}
  &::after {
    content: '';
    display: block;
    width: ${(p) => p.theme.spacing.sm};
    height: ${(p) => p.theme.spacing.sm};
    background: ${(p) => p.theme.colors.surface2};
    transform: rotate(45deg);
    margin: 0 auto;
    position: relative;

    ${({ $placement, theme }) => {
      switch ($placement) {
        case 'top':
          return css`
            top: -${theme.spacing.xs};
          `
        case 'bottom':
          return css`
            top: ${theme.spacing.xs};
          `
        case 'left':
          return css`
            top: 0;
          `
        default:
          return css`
            top: ${theme.spacing.xs};
          `
      }
    }}
  }
`
