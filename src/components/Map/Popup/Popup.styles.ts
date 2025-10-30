import styled from 'styled-components'
import { Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

export const StyledPopup = styled(Popup)`
  background-color: ${(p) => p.theme.colors.surface1};
  box-shadow: ${(p) => p.theme.colors.boxShadow3};
  display: flex;
  flex-direction: column;
`

export const PopupHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => `${p.theme.spacing.md} ${p.theme.spacing.xl}`};
  border-bottom: 1px solid ${(p) => p.theme.colors.borderPrimary};
`

export const PopupTitle = styled.h2`
  margin: ${(p) => `${p.theme.spacing.xxs} ${p.theme.spacing.xl} 0 0`};
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.semibold};
`
export const PopupBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.sm};
  padding: ${(p) => p.theme.spacing.lg};
  overflow-y: auto;
`
export const PropertyLink = styled(Link)`
  color: ${(p) => p.theme.colors.textLink};
  font-size: ${(p) => p.theme.fontSize.sm};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  margin-left: ${(p) => p.theme.spacing.sm};

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
`
