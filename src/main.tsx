import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Hide FOUC of fallback font — swap once Cormorant loads
document.documentElement.classList.add('fonts-loading')
document.fonts?.ready.then(() => {
  document.documentElement.classList.remove('fonts-loading')
  document.documentElement.classList.add('fonts-ready')
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)