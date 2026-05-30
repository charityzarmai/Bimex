import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Inicializar Sentry solo si está configurado
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_NETWORK || 'testnet',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event, hint) {
      // Filtrar PII — remover wallet addresses del contexto
      if (event.user) {
        delete event.user.id
        delete event.user.username
        delete event.user.email
      }
      
      // Remover wallet addresses de los breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
          if (breadcrumb.data) {
            const sanitized = { ...breadcrumb.data }
            Object.keys(sanitized).forEach(key => {
              if (key.toLowerCase().includes('address') || 
                  key.toLowerCase().includes('wallet') ||
                  key.toLowerCase().includes('direccion')) {
                sanitized[key] = '[REDACTED]'
              }
            })
            return { ...breadcrumb, data: sanitized }
          }
          return breadcrumb
        })
      }
      
      return event
    },
  })
}

createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Algo salió mal</h2>
    <p>Por favor recarga la página. Si el problema persiste, contacta a soporte.</p>
  </div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
)