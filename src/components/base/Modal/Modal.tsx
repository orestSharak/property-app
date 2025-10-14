import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'
import { ModalButtonVariant, ModalSize } from './Modal.types'
import {
  CloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  StyledBackdrop,
  StyledModal,
} from './Modal.styles'
import { useMediaQuery } from '../../../hooks/helpers/useMediaQuery'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: ModalSize
  children: React.ReactNode
  primaryButton?: {
    label: string
    onClick?: () => void
    disabled?: boolean
    variant?: ModalButtonVariant
    type?: 'submit' | 'button' | 'reset'
  }
  secondaryButton?: {
    label: string
    onClick: () => void
  }
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, size = 'sm', children, primaryButton, secondaryButton }, ref) => {
    const { t } = useTranslation()
    const isMobile = useMediaQuery()

    const modalRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLButtonElement>(null)

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      },
      [onClose],
    )

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        // If the modal ref exists and the click is outside of the modal, close it.
        // The check 'contains(event.target)' is a robust way to determine if the click was inside the element.
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose()
        }
      },
      [onClose],
    )

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleClickOutside)

        // Manually focus the close button when the modal opens
        // This is the key change to ensure the close button is the first element to receive focus.
        if (headerRef.current) {
          headerRef.current.focus()
        }
      } else {
        document.body.style.overflow = ''
      }

      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
        // Clean up the event listener when the modal is closed or unmounted.
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen, handleKeyDown, handleClickOutside])

    if (!isOpen) {
      return null
    }

    return (
      <StyledBackdrop onClick={onClose}>
        <StyledModal
          ref={ref || modalRef}
          $size={size}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()} // Prevents closing on modal body click
        >
          <ModalHeader ref={headerRef} tabIndex={0}>
            <ModalTitle id="modal-title">{title}</ModalTitle>
            <CloseButton onClick={onClose} aria-label={t('modal>closeModal')}>
              &times;
            </CloseButton>
          </ModalHeader>
          <ModalBody $size={size}>{children}</ModalBody>
          {(primaryButton || secondaryButton) && (
            <ModalFooter>
              {secondaryButton && (
                <Button
                  variant="outline"
                  size={isMobile ? 'sm' : 'lg'}
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.label}
                </Button>
              )}
              {primaryButton && (
                <Button
                  variant={primaryButton.variant || 'primary'}
                  size={isMobile ? 'sm' : 'lg'}
                  onClick={primaryButton.onClick}
                  disabled={primaryButton.disabled}
                >
                  {primaryButton.label}
                </Button>
              )}
            </ModalFooter>
          )}
        </StyledModal>
      </StyledBackdrop>
    )
  },
)

Modal.displayName = 'Modal'
export { Modal }
