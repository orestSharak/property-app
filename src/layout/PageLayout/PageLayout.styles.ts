import styled from 'styled-components'
import { sidebarWidth } from '../../common/theme'

export const StyledMain = styled.main`
  height: ${(p) => `calc(100vh - (${p.theme.spacing.sm} + ${p.theme.spacing.sm}))`};
  background-color: ${(p) => p.theme.colors.surface1};
  margin: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.sm} 0 ${sidebarWidth};
  border-radius: ${(p) => p.theme.radius.lg};
  overflow: auto;
  padding: ${(p) => p.theme.spacing.max} ${(p) => p.theme.spacing.xxl} 0
    ${(p) => p.theme.spacing.xxl};
`
