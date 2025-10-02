import styled from 'styled-components'
import { Button } from '../../components/base/Button/Button'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.lg};
`

export const StyledButton = styled(Button)`
  width: 324px;
  margin-left: auto;
  margin-top: ${(p) => p.theme.spacing.md};
`
