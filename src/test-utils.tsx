import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { LightPalette } from './common/theme'

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={LightPalette}>
      {/* If you had other providers (e.g., AuthProvider, QueryClientProvider),
        you would wrap them here:
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
      */}
      {children}
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
