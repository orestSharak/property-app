import styled, { css } from 'styled-components'

export const ExternalLinkContainer = styled.div<{ $hasList: boolean; $link?: boolean }>`
  margin-bottom: ${({ $hasList, theme }) => ($hasList ? theme.spacing.xxs : '0')};

  ${({ $link }) =>
    $link &&
    css`
      display: flex;
      align-items: baseline;
      gap: ${(p) => p.theme.spacing.lg};
    `}
`

export const ExternalLinkWrapper = styled.a<{ $link?: boolean; $isMobile: boolean }>`
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

  ${({ $link, $isMobile }) =>
    $link &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      width: ${$isMobile ? '170px' : '290px'};
    `}
`

export const IconWrapper = styled.div`
  path {
    fill: none;
    stroke: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
