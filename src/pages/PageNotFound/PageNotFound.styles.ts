import styled from 'styled-components'

export const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-weight: ${(p) => p.theme.fontWeight.semibold};
  background: ${(p) => p.theme.colors.surface1};
  text-align: center;
  gap: ${(p) => p.theme.spacing.lg};
`

export const Title = styled.h1`
  font-size: ${(p) => p.theme.fontSize.max};
  color: ${(p) => p.theme.colors.textOnSurface1};
  font-weight: ${(p) => p.theme.fontWeight.semibold};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${(p) => p.theme.fontSize.lg};
  }
`

export const Description = styled.p`
  font-size: ${(p) => p.theme.fontSize.lg};
  margin-bottom: ${(p) => p.theme.spacing.xxl};
  max-width: 500px;
  color: ${(p) => p.theme.colors.textOnSurface1};
  text-align: center;
  font-weight: ${(p) => p.theme.fontWeight.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${(p) => p.theme.fontSize.md};
    margin-bottom: ${(p) => p.theme.spacing.sm};
  }
`

export const IconWrapper = styled.div`
  border-radius: ${(p) => p.theme.radius.round};
  background-color: ${(p) => p.theme.colors.surface6};
  padding: ${(p) => p.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 100px;
    height: 100px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: 50px;
      height: 50px;
    }
  }
`
