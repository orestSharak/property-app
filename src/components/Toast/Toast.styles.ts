import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer)`
  min-height: 60px;
  min-width: 450px;

  .Toastify__toast {
    width: 100%;
    padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.sm};
    min-height: unset;
    box-shadow: unset;
    align-items: center;
    z-index: ${({ theme }) => theme.orderLevel.toast};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textOnSurfaceAlert};

    &--info {
      background: ${({ theme }) => theme.colors.toastInfo};
    }

    &--success {
      background: ${({ theme }) => theme.colors.toastSuccess};
    }

    &--error {
      background: ${({ theme }) => theme.colors.toastError};
    }

    &:focus-visible {
      border-color: ${({ theme }) => theme.colors.boxShadowInfo};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.boxShadowInfo};
      outline: none;
    }
  }

  .Toastify__toast-icon {
    display: none;
  }

  .Toastify__close-button {
    transition: all 0.2s;
    top: 14px;
    opacity: 1;
    color: ${({ theme }) => theme.colors.surface1};

    &:hover {
      opacity: 0.8;
    }

    &:focus-visible {
      border-color: ${({ theme }) => theme.colors.boxShadowInfo};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.boxShadowInfo};
      outline: none;
      border-radius: ${({ theme }) => theme.radius.round};
    }
  }
`
