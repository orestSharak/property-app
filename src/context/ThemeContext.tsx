import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { themes } from '../common/theme'

interface IThemeContext {
  themeMode: string
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
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
