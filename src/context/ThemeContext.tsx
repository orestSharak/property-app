import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { themes } from '../common/theme'
import { STORAGE_THEME_KEY } from '../common/constants'

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
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem(STORAGE_THEME_KEY)
    return storedTheme || 'light'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeMode)
    } catch (error) {
      console.error('Could not save theme to local storage:', error)
    }
  }, [themeMode])

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
