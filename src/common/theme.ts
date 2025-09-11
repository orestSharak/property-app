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
  surface8: '#f6f6f6',
  surface9: '#fdfdfd',

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
  boxShadow4: `0 0 2px 0 rgba(0, 0, 0, 0.15)`,
  gradientShadow: `linear-gradient(to bottom, rgba(30, 30, 30, 0.7) 0%, rgba(10, 10, 10, 0.85) 100%
);`,
} as const

const darkTokens = {
  // Surface colors (for backgrounds)
  surface1: '#161616', // Dark background
  surface2: '#D9D9D9', // Lighter accent surface
  surface3: '#F1F1F1', // Lightest surface for contrast
  surface4: '#FAFAFA', // White-like surface
  surface5: '#545454', // Gray surface
  surface6: '#FEC640', // Primary brand color
  surface6Light: '#ffdf94',
  surface7: '#222222', // Darker background for depth

  surfaceAlert: '#DB0404',
  surfaceAlertStrong: '#ba0505',
  surfaceInfo: '#00CFFF',
  surfacePink: '#F011D6',

  // On-surface colors (for text, icons)
  textPrimary: '#FEC640',
  textMain: '#D9D9D9', // Main text is now a light gray for readability
  textStrong: '#ffffff', // Strong text is now pure white for maximum contrast
  textNeutral: '#818181', // Neutral gray for secondary info
  textSecondary: '#9E9E9E', // Lighter secondary gray

  textPink: '#F011D6',
  textAlert: '#DB0404',
  textInfo: '#00CFFF',
  textLink: '#7FCFFF', // Lighter, more vibrant link color

  textOnSurface6: '#161616', // Text on primary brand color remains dark
  textOnSurface3: '#161616',
  textOnSurface4: '#161616',
  textOnSurface7: '#D9D9D9',
  textOnSurface2: '#161616',
  textOnSurface1: '#D9D9D9', // Text on dark background is now light
  textOnSurfaceAlert: '#ffffff',

  iconOnSurface3: '#161616',
  iconOnSurface4: '#161616',

  // Border colors
  borderPrimary: '#545454', // Darker border
  borderSecondary: '#363636', // Even darker border
  borderStrong: '#D9D9D9', // Lighter border for separation
  borderIntense: '#ffffff', // Pure white for intense borders
  borderAlert: '#DB0404',

  // Box shadows
  boxShadowAlert: '#680202', // Darker, more subtle shadow
  boxShadowInfo: '#00475b', // Darker, more subtle shadow

  // Other tokens
  separator: '#545454',
  disabled: '#333333', // Darker disabled state
  boxShadow1: `0 4px 24px rgba(0, 0, 0, 0.4)`, // Shadow becomes a bit more pronounced
  boxShadow2: `0 6px 20px rgba(0, 0, 0, 0.3)`,
  boxShadow3: `0 4px 20px rgba(0, 0, 0, 0.35)`,
  boxShadow4: `0 4px 6px rgba(0, 0, 0, 0.05)`,
  gradientShadow: `linear-gradient(to top, rgba(200, 200, 200, 0.7) 0%, rgba(100, 100, 100, 0.85) 100%
);`,
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
