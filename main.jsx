
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import '../styles/base.css'
import '../styles/variables.css'
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
)
