import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoot from '../App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
)
