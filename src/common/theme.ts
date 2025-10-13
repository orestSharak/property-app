export const sidebarWidth = '250px'

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

const fontWeight = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  xxl: '2rem',
  xxxl: '2.5rem',
  max: '6rem',
} as const

const iconSize = {
  sm: '16px',
  md: '18px',
} as const

const spacing = {
  xxxs: '2px',
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '36px',
  xxxl: '48px',
  max: '72px',
} as const

const radius = {
  xs: '4px',
  sm: '6px',
  md: '10px',
  lg: '20px',
  round: '50%',
} as const

const orderLevel = {
  loginBackground: 1,
  loginImage: 2,
  tableHeader: 10,
  selectDropdown: 20,
  toast: 100,
  tooltip: 999,
  modalBackdrop: 1001,
  menuButton: 999,
} as const

const lightTokens = {
  // Surface colors (for backgrounds)
  surface1: '#ffffff',
  surface2: '#000000',
  surface3: '#161616',
  surface4: '#1F1F1F',
  surface5: '#D9D9D9',
  surface6: '#FEC640',
  surface6Light: '#ffdf94',
  surface7: '#FAFAFA',
  surface8: '#f6f6f6',

  surfaceAlert: '#DB0404',
  surfaceAlertStrong: '#ba0505',
  surfaceInfo: '#00B3E6',
  surfacePink: '#D80FC1',

  // On-surface colors (for text, icons)
  textPrimary: '#FEC640',
  textMain: '#161616',
  textStrong: '#000000',
  textNeutral: '#606060',
  textSecondary: '#6C696D',

  textPink: '#A50085',
  textAlert: '#DB0404',
  textInfo: '#007DAB',
  textInfo2: '#0074A5',
  textLink: '#0067C1',

  textOnSurface6: '#161616',
  textOnSurface3: '#D9D9D9',
  textOnSurface4: '#B0B0B0',
  textOnSurface2: '#ffffff',
  textOnSurface1: '#000000',
  textOnSurfaceAlert: '#ffffff',

  iconOnSurface1: '#000000',
  iconOnSurface3: '#ffffff',

  // Border colors
  borderPrimary: '#D9D9D9',
  borderSecondary: '#D1CECE',
  borderStrong: '#222222',
  borderIntense: '#000000',
  borderAlert: '#DB0404',
  borderExtraButton: '#ffffff',

  // Box shadows
  boxShadowAlert: '#ffd6d4',
  boxShadowInfo: '#cce0fa',

  // Toast
  toastSuccess: '#008563',
  toastError: '#de3030',
  toastInfo: '#4e69f4',

  // Other tokens
  separator: '#D9D9D9',
  disabled: '#eee',
  boxShadow1: `0 4px 24px rgba(0, 0, 0, 0.08)`,
  boxShadow2: `0 6px 20px rgba(10, 20, 50, 0.16)`,
  boxShadow3: `0 4px 20px rgba(0, 0, 0, 0.15)`,
  boxShadow4: `0 0 2px 0 rgba(0, 0, 0, 0.15)`,
  gradientShadow: `linear-gradient(to bottom, rgba(30, 30, 30, 0.7) 0%, rgba(10, 10, 10, 0.85) 100%
);`,
} as const

const darkTokens = {
  // Surface colors (for backgrounds)
  surface1: '#161616', // Primary dark background
  surface2: '#333333', // Revised: Professional, elevated dark gray for button/input backgrounds
  surface3: '#000000',
  surface4: '#1F1F1F',
  surface5: '#222222',
  surface6: '#FEC640',
  surface6Light: '#D4A737',
  surface7: '#0a0a0a',
  surface8: '#111111',

  surfaceAlert: '#DB0404',
  surfaceAlertStrong: '#ba0505',
  surfaceInfo: '#00B3E6',
  surfacePink: '#ff66cc',

  // On-surface colors (for text, icons)
  textPrimary: '#FEC640',
  textMain: '#D9D9D9',
  textStrong: '#ffffff',
  textNeutral: '#9E9E9E',
  textSecondary: '#A9A9A9',

  textPink: '#ff66cc',
  textAlert: '#FF6F6F',
  textInfo: '#66D9FF',
  textInfo2: '#0074A5',
  textLink: '#40A8FF',

  textOnSurface6: '#161616',
  textOnSurface3: '#D9D9D9',
  textOnSurface4: '#BCBCBC',
  textOnSurface2: '#ffffff', // Light text on new dark surface2 (#333333)
  textOnSurface1: '#ffffff',
  textOnSurfaceAlert: '#ffffff',

  iconOnSurface1: '#ffffff',
  iconOnSurface3: '#ffffff',

  // Border colors
  borderPrimary: '#444444',
  borderSecondary: '#333333',
  borderStrong: '#666666',
  borderIntense: '#ffffff',
  borderAlert: '#DB0404',
  borderExtraButton: '#ffffff',

  // Box shadows
  boxShadowAlert: '#600e0e',
  boxShadowInfo: '#003a57',

  // Toast
  toastSuccess: '#38A88D',
  toastError: '#de3030',
  toastInfo: '#7799ff',

  // Other tokens
  separator: '#333333',
  disabled: '#333333',
  boxShadow1: `0 4px 12px rgba(0, 0, 0, 0.5)`,
  boxShadow2: `0 6px 12px rgba(0, 0, 0, 0.7)`,
  boxShadow3: `0 4px 10px rgba(0, 0, 0, 0.45)`,
  boxShadow4: `0 0 1px 0 rgba(255, 255, 255, 0.15)`,
  gradientShadow: `rgba(0, 0, 0, 0.8)`,
} as const
const commonValues = {
  spacing,
  radius,
  fontSize,
  iconSize,
  fontWeight,
  orderLevel,
  breakpoints,
}

export const LightPalette = {
  colors: lightTokens,
  ...commonValues,
}

export const DarkPalette = {
  colors: darkTokens,
  ...commonValues,
}

export const themes = {
  light: LightPalette,
  dark: DarkPalette,
}
