import styled from 'styled-components'

export const ExternalLinkWrapper = styled.a`
  color: ${(p) => p.theme.colors.textLink};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  padding: ${(p) => p.theme.spacing.xxxs};

  &:focus {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }
`
