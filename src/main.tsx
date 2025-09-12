import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading ...</div>}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
)
