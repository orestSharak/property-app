import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  padding: ${(p) => p.theme.spacing.max} ${(p) => p.theme.spacing.xxl} ${(p) => p.theme.spacing.xxl}
    ${(p) => p.theme.spacing.xxl};
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
