import styled, { css, keyframes } from 'styled-components'
import { ModalSize } from './Modal.types'
import { AppTheme } from '../../../common/types'
import { sidebarWidth } from '../../../common/theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const modalSizeStyles = (size: ModalSize, theme: AppTheme) => {
  switch (size) {
    case 'sm':
      return css`
        min-height: 280px;
        border-radius: ${theme.radius.md};
        animation: ${fadeIn} 0.2s ease-out;
      `
    case 'lg':
      return css`
        min-height: 280px;
        height: calc(100vh - (${theme.spacing.md} + ${theme.spacing.md}));
        border-radius: ${theme.radius.md};
        margin-left: auto;
        right: ${theme.spacing.sm};
        animation: ${fadeIn} 0.2s ease-out;
      `
    default:
      return css``
  }
}

export const StyledBackdrop = styled.div`
  position: fixed;
  top: ${(p) => p.theme.spacing.xs};
  left: ${sidebarWidth};
  width: ${(p) => `calc(100% - ${p.theme.spacing.xs} - ${sidebarWidth})`};
  height: ${(p) => `calc(100% - ${p.theme.spacing.md})`};
  z-index: ${(p) => p.theme.orderLevel.modalBackdrop};
  border-radius: ${(p) => p.theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.gradientShadow};
  animation: ${fadeIn} 0.2s ease-out;
`

export const StyledModal = styled.div<{ $size: ModalSize }>`
  background-color: ${(p) => p.theme.colors.surface1};
  box-shadow: ${(p) => p.theme.colors.boxShadow3};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  max-height: 100%;

  ${(p) => modalSizeStyles(p.$size, p.theme)}
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => `${p.theme.spacing.md} ${p.theme.spacing.xl}`};
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
`

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${(p) => p.theme.fontSize.lg};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.spacing.sm};
  width: ${(p) => p.theme.spacing.xl};
  height: ${(p) => p.theme.spacing.xl};
  color: ${(p) => p.theme.colors.textNeutral};
  font-size: ${(p) => p.theme.fontSize.xl};
  transition: color 0.2s ease-in-out;
  border-radius: ${(p) => p.theme.radius.round};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.colors.textSecondary};
  }

  &:focus-visible,
  &:focus-within {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }
`

export const ModalBody = styled.div`
  flex: 1;
  padding: ${(p) => p.theme.spacing.lg};
  overflow-y: auto;
`

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  padding: ${(p) => `${p.theme.spacing.md} ${p.theme.spacing.xl}`};
  border-top: 1px solid ${(p) => p.theme.colors.borderPrimary};
`
