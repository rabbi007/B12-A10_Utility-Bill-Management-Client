import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router'
import Router from './Routes/Router'
import AuthProvider from './Contexts/AuthContext/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
