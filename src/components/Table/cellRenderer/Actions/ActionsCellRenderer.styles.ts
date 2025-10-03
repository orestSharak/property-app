import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${(p) => p.theme.spacing.sm};
`

export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
