import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import App from './App'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading ...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
