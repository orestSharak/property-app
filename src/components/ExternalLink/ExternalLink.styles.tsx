import styled from 'styled-components'

export const ExternalLinkContainer = styled.div<{ $hasList: boolean }>`
  margin-bottom: ${({ $hasList, theme }) => ($hasList ? theme.spacing.xxs : '0')};
`

export const ExternalLinkWrapper = styled.a`
  color: ${(p) => p.theme.colors.textLink};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  padding: ${(p) => p.theme.spacing.xxxs};
  word-break: break-all;
  text-decoration: none;

  transition: all 0.3s ease-in;
  position: relative;

  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 0;
    height: 1px;
    background: ${(p) => p.theme.colors.borderLink};
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    &:before {
      width: 100%;
    }
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.boxShadowInfo};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;

    &:before {
      width: 100%;
    }
  }
`
