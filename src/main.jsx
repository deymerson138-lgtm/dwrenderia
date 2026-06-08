import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DWRenderIA from './DWRenderIA_Pro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DWRenderIA />
  </StrictMode>,
)
