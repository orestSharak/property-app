import styled from 'styled-components'
import { Button } from '../../components/base/Button/Button'

export const StyledHeaderWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: flex;
    align-self: center;
    justify-content: center;
  }
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.lg};
`

export const StyledButton = styled(Button)`
  width: 324px;
  margin-left: auto;
  margin-top: ${(p) => p.theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    width: 100%;
  }
`
