export const sidebarWidth = '212px'

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
} as const

const iconSize = {
  sm: '18px',
  md: '22px',
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
} as const

const radius = {
  xs: '4px',
  sm: '6px',
  md: '10px',
  lg: '20px',
  round: '50%',
} as const

const orderLevel = {
  selectDropdown: 20,
  tooltip: 999,
  modalBackdrop: 1000,
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

  surfaceAlert: '#DB0404',
  surfaceAlertStrong: '#ba0505',
  surfaceInfo: '#00CFFF',
  surfacePink: '#F011D6',

  // On-surface colors (for text, icons)
  textPrimary: '#FEC640',
  textMain: '#161616',
  textStrong: '#000000',
  textNeutral: '#9E9E9E',
  textSecondary: '#6C696D',

  textPink: '#F011D6',
  textAlert: '#DB0404',
  textInfo: '#00CFFF',
  textLink: '#117CEF',

  textOnSurface6: '#161616',
  textOnSurface3: '#D9D9D9',
  textOnSurface4: '#545454',
  textOnSurface7: '#818181',
  textOnSurface2: '#ffffff',
  textOnSurface1: '#000000',
  textOnSurfaceAlert: '#ffffff',

  iconOnSurface3: '#D9D9D9',
  iconOnSurface4: '#797979',

  // Border colors
  borderPrimary: '#D9D9D9',
  borderSecondary: '#D1CECE',
  borderStrong: '#222222',
  borderIntense: '#000000',
  borderAlert: '#DB0404',

  // Box shadows
  boxShadowAlert: '#ffd6d4',
  boxShadowInfo: '#cce0fa',

  // Other tokens
  separator: '#D9D9D9',
  disabled: '#eee',
  boxShadow1: `0 4px 24px rgba(0, 0, 0, 0.08)`,
  boxShadow2: `0 6px 20px rgba(10, 20, 50, 0.16)`,
  boxShadow3: `0 4px 20px rgba(0, 0, 0, 0.15)`,
  gradientShadow: `linear-gradient(to bottom, rgba(30, 30, 30, 0.7) 0%, rgba(10, 10, 10, 0.85) 100%
);`,
} as const

const darkTokens = {
  // Surface colors (for backgrounds)
  surface1: '#121212',
  surface2: '#1E1E1E',
  surface3: '#2C2C2C',
  surface4: '#404040',
  surface5: '#545454',
  surface6: '#FEC640',
  surface7: '#D1CECE',

  surfaceAlert: '#DB0404',
  surfaceInfo: '#00CFFF',
  surfacePink: '#F011D6',

  // On-surface colors (for text, icons)
  textPrimary: '#FEC640',
  textMain: '#D9D9D9',
  textStrong: '#ffffff',
  textNeutral: '#A5A5A5',

  textPink: '#F011D6',
  textInfo: '#00CFFF',
  textLink: '#117CEF',

  textOnSurface6: '#161616',
  textOnSurface3: '#ffffff',
  textOnSurface4: '#D1CECE',
  textOnSurface7: '#000000',

  iconOnSurface3: '#D9D9D9',
  iconOnSurface4: '#AEAEAE',

  // Border colors
  borderPrimary: '#2C2C2C',
  borderSecondary: '#3F3F3F',
  borderStrong: '#545454',
  borderIntense: '#818181',

  // Other tokens
  separator: '#2C2C2C',
  disabled: '#eee',
  gradient: `linear-gradient(180deg, #161616 0%, #000000 75.48%)`,
} as const

const commonValues = {
  spacing,
  radius,
  fontSize,
  iconSize,
  fontWeight,
  orderLevel,
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
