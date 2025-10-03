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
  left: 50%;
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
  transform: translateX(-50%)
    ${({ $placement }) => ($placement === 'top' ? 'translateY(0)' : 'translateY(0)')};
  ${({ $placement }) =>
    $placement === 'top'
      ? css`
          bottom: 100%;
          margin-bottom: ${(p) => p.theme.spacing.sm};
        `
      : css`
          top: 100%;
          margin-top: ${(p) => p.theme.spacing.sm};
        `}
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
  left: 50%;
  transform: translateX(-50%);
  width: ${(p) => p.theme.spacing.xl};
  height: ${(p) => p.theme.spacing.sm};
  overflow: hidden;

  ${({ $placement }) =>
    $placement === 'top'
      ? css`
          bottom: -${(p) => p.theme.spacing.sm};
        `
      : css`
          top: -${(p) => p.theme.spacing.sm};
        `}
  &::after {
    content: '';
    display: block;
    width: ${(p) => p.theme.spacing.sm};
    height: ${(p) => p.theme.spacing.sm};
    top: ${({ $placement, theme }) =>
      $placement === 'top' ? `-${theme.spacing.xs}` : theme.spacing.xs};
    background: ${(p) => p.theme.colors.surface2};
    box-shadow: ${(p) => p.theme.colors.boxShadow2};
    transform: rotate(45deg);
    margin: 0 auto;
    position: relative;
  }
`
