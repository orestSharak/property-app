import styled, { createGlobalStyle } from 'styled-components'
import { MapContainer } from 'react-leaflet'

export const LeafletStyle = createGlobalStyle<{ themeMode: string }>`
  /* --- Conditional Leaflet styles --- */
  ${({ themeMode }) =>
    themeMode === 'dark'
      ? `
          .leaflet-layer,
          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out,
          .leaflet-control-attribution {
            filter: brightness(0.7) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
          }
      `
      : `
          .leaflet-layer,
          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out,
          .leaflet-control-attribution {
            filter: none;
          }
      `}
`

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
