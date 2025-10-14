import styled from 'styled-components'
import { Input } from '../../components/base/Input/Input'
import { Button } from '../../components/base/Button/Button'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
    gap: ${(p) => p.theme.spacing.xl};
  }
`

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${(p) => p.theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: 0;
    justify-content: space-between;
    width: 100%;
  }
`
export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`

export const StyledInput = styled(Input)`
  min-width: 390px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: calc(100vw - 100px);
  }
`
export const StyledButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${(p) => p.theme.fontSize.xl};
    line-height: ${(p) => p.theme.spacing.xxxs};
    padding: ${(p) => `18px ${p.theme.spacing.sm}`};
    border-radius: ${(p) => p.theme.radius.round};
    min-width: auto;
  }
`
