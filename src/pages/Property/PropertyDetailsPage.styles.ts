import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${(p) => p.theme.spacing.xxl};
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.spacing.max};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${(p) => p.theme.spacing.xl};
  }
`

export const Container = styled.div`
  flex: 1;
  min-width: 465px;
  max-width: 500px;
  margin-bottom: ${(p) => p.theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 0;
  }
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
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
export const CardWrapper = styled.div`
  flex: 1;
  min-width: 370px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    min-width: 100%;
    order: 1;
  }
`
export const OrderWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    order: 2;
  }
`

export const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing.xxl};
`

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(p) => p.theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-bottom: ${(p) => p.theme.spacing.xs};
  }
`

export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
