import { createContext, PropsWithChildren, useState, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components'
import { themes } from '../common/theme'

interface IThemeContext {
  theme: DefaultTheme
  toggleTheme: () => void
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState('light')

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = themes[themeMode]

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
