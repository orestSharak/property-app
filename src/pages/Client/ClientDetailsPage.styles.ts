import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.max};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${(p) => p.theme.spacing.xxl};
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${(p) => p.theme.spacing.xl};
  }
`

export const Container = styled.div`
  flex: 1;
  min-width: 465px;
  max-width: 500px;
  margin-bottom: ${(p) => p.theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: 100%;
    max-width: 100%;
  }
`

export const StyledWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: 100%;
  }
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.xs})`};
    margin-top: ${(p) => p.theme.spacing.xs};
  }
`

export const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  margin-left: auto;
`

export const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing.xxl};
  margin-top: ${(p) => p.theme.spacing.sm};
`

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(p) => p.theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-bottom: ${(p) => p.theme.spacing.xs};
  }
`
export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
