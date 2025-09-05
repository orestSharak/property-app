import styled from 'styled-components'
import { MapContainer } from 'react-leaflet'

export const Container = styled(MapContainer)<{ height: number }>`
  border: 1px solid ${(p) => p.theme.colors.borderPrimary};
  border-radius: ${(p) => p.theme.radius.lg};
  width: 100%;
  height: ${({ height }) => `${height}px`};

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.borderPrimary};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.boxShadowInfo};
  }
}
`
