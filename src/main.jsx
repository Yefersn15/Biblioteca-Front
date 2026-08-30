import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ConfirmProvider } from './context/ConfirmContext'
import { ConfiguracionProvider } from './context/ConfiguracionContext'
import { AyudaProvider } from './context/AyudaContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfiguracionProvider>
        <AuthProvider>
          <ToastProvider>
            <ConfirmProvider>
              <AyudaProvider>
                <App />
              </AyudaProvider>
            </ConfirmProvider>
          </ToastProvider>
        </AuthProvider>
      </ConfiguracionProvider>
    </BrowserRouter>
  </StrictMode>,
)
