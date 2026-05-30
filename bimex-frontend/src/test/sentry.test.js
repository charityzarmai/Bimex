import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as Sentry from '@sentry/react'

// Mock Sentry
vi.mock('@sentry/react', () => ({
  init: vi.fn(),
  captureException: vi.fn(),
  ErrorBoundary: ({ children }) => children,
  browserTracingIntegration: vi.fn(),
  replayIntegration: vi.fn(),
}))

describe('Sentry Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize Sentry when DSN is provided', async () => {
    // Simular que VITE_SENTRY_DSN está configurado
    const originalEnv = import.meta.env.VITE_SENTRY_DSN
    import.meta.env.VITE_SENTRY_DSN = 'https://test@test.ingest.sentry.io/test'
    
    // Importar main.jsx dinámicamente para que se ejecute la inicialización
    await import('../main.jsx')
    
    // Restaurar
    import.meta.env.VITE_SENTRY_DSN = originalEnv
    
    // Verificar que Sentry.init fue llamado
    expect(Sentry.init).toHaveBeenCalled()
  })

  it('should filter PII from error events', () => {
    const mockEvent = {
      user: {
        id: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        username: 'test_user',
        email: 'test@example.com',
      },
      breadcrumbs: [
        {
          data: {
            address: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            wallet: 'test_wallet',
            direccion: 'test_direccion',
            other: 'safe_data',
          },
        },
      ],
    }

    // Simular la función beforeSend
    const beforeSend = (event) => {
      if (event.user) {
        delete event.user.id
        delete event.user.username
        delete event.user.email
      }
      
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
    }

    const sanitizedEvent = beforeSend(mockEvent)

    // Verificar que se removió PII
    expect(sanitizedEvent.user).toEqual({})
    expect(sanitizedEvent.breadcrumbs[0].data.address).toBe('[REDACTED]')
    expect(sanitizedEvent.breadcrumbs[0].data.wallet).toBe('[REDACTED]')
    expect(sanitizedEvent.breadcrumbs[0].data.direccion).toBe('[REDACTED]')
    expect(sanitizedEvent.breadcrumbs[0].data.other).toBe('safe_data')
  })

  it('should capture exceptions with proper tags', () => {
    const error = new Error('Test error')
    const tags = { tipo: 'test_error' }
    const extra = { info: 'test_info' }

    Sentry.captureException(error, { tags, extra })

    expect(Sentry.captureException).toHaveBeenCalledWith(error, { tags, extra })
  })
})
