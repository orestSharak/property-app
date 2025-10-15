import styled from 'styled-components'
import mapSurface from '../../assets/map-surface.png'
import lightHouse from '../../assets/light-house.png'
import darkHouse from '../../assets/dark-house.png'
import { Button } from '../../components/base/Button/Button'
import { IconButton } from '../../components/base/IconButton/IconButton'

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface1};
`

export const FormWrapper = styled.div`
  min-width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: 100vw;
  }
`

export const StyledForm = styled.form`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.md};
  padding: ${(p) => p.theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-width: 100vw;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing.sm};
`
export const Header = styled.h1`
  color: ${(p) => p.theme.colors.textStrong};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 0;
`
export const SubHeader = styled.span`
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

export const StyledButton = styled(Button)`
  margin-top: ${(p) => p.theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-top: ${(p) => p.theme.spacing.lg};
  }
`

export const MapSection = styled.div<{ $themeMode: string }>`
  width: ${(p) => `calc(50vw - ${p.theme.spacing.md})`};
  position: relative;
  margin: ${(p) => p.theme.spacing.md};
  background-image: url(${mapSurface});
  background-repeat: no-repeat;
  background-size: cover;
  //transition: all 0.5s;
  z-index: ${(p) => p.theme.orderLevel.loginBackground};
  border-radius: ${(p) => p.theme.radius.lg};
  filter: ${({ $themeMode }) => ($themeMode === 'dark' ? `invert(0.9)` : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`

export const PropertySection = styled.div<{ $themeMode: string }>`
  z-index: ${(p) => p.theme.orderLevel.loginImage};
  width: 100%;
  height: 475px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -120px;
  content: '';
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: ${({ $themeMode }) =>
    $themeMode === 'light' ? `url(${lightHouse})` : `url(${darkHouse})`};
  transition:
    background-image 0.3s,
    left 0.3s;
  filter: ${({ $themeMode }) => ($themeMode === 'dark' ? `invert(1)` : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    left: 0;
  }
`

export const LanguageIconButton = styled(IconButton)`
  position: fixed;
  top: ${(p) => p.theme.spacing.lg};
  left: ${(p) => p.theme.spacing.md};

  & svg {
    path {
      fill: ${(p) => p.theme.colors.iconOnSurface1};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
      width: ${(p) => p.theme.spacing.xl};
      height: ${(p) => p.theme.spacing.xl};
    }
  }
`

export const StyledIconButton = styled(IconButton)`
  position: fixed;
  top: ${(p) => p.theme.spacing.lg};
  left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.md})`};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    left: ${(p) => `calc(${p.theme.spacing.xxxl} + ${p.theme.spacing.lg})`};
  }

  & svg {
    stroke: ${(p) => p.theme.colors.iconOnSurface1};

    path {
      fill: ${(p) => p.theme.colors.iconOnSurface1};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
      width: ${(p) => p.theme.spacing.xl};
      height: ${(p) => p.theme.spacing.xl};
    }
  }
`
