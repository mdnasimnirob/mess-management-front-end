import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router.jsx'
import AuthProviders from './providers/AuthProviders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProviders>
  </StrictMode>,
)
