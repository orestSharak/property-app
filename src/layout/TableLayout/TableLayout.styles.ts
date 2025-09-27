import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${(p) => p.theme.spacing.xl};
`
