import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/index.css'
import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    </Router>
  </StrictMode>
)
