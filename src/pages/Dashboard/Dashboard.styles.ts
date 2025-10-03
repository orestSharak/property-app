import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 470px;
  gap: ${(p) => p.theme.spacing.xl};
  overflow: auto;
  padding: ${(p) => p.theme.spacing.xxxs};
`

export const MapContainer = styled.div`
  display: flex;
  flex: 1;
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.lg};
`

export const PropertyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.md};
  padding: ${(p) =>
    `${p.theme.spacing.xxxs} ${p.theme.spacing.lg} ${p.theme.spacing.xxxs} ${p.theme.spacing.xxxs}`};
  overflow: auto;
  height: calc(100vh - 366px);
}
`
export const NoResult = styled.p`
  color: ${(p) => p.theme.colors.textMain};
  font-size: ${(p) => p.theme.fontSize.md};
  font-weight: ${(p) => p.theme.fontWeight.medium};
`

export const IconWrapper = styled.div`
  path {
    fill: ${(p) => p.theme.colors.iconOnSurface1};
  }
`
