# Commit Message

```
feat: add Sentry error tracking for production observability

Implements comprehensive error tracking with Sentry to capture production
errors that currently die silently in browser consoles.

Changes:
- Install @sentry/react ^8.47.0
- Initialize Sentry in main.jsx with conditional loading
- Add ErrorBoundary wrapper for React crash handling
- Implement PII filtering in beforeSend (wallet addresses redacted)
- Add Sentry.captureException() to all contract error handlers:
  - simularLectura, firmarYEnviar, obtenerBalanceMXNe
  - obtenerTotalProyectos, calcularYield, obtenerAportacion
  - calcularYieldDetallado, obtenerEstadoCapital
- Add error capture to parsearError utility
- Configure VITE_SENTRY_DSN in all environment files
- Add comprehensive documentation and setup guides
- Add unit tests for Sentry integration

Features:
- Automatic error capture with full stack traces
- Error tagging by type (firma_rechazada, tx_fallida, timeout, etc.)
- Session Replay for visual debugging (10% sample rate)
- Performance monitoring (10% trace sample rate)
- Graceful degradation when DSN not configured
- Zero PII sent to Sentry (addresses, IDs, emails filtered)

Documentation:
- SENTRY_SETUP.md - Complete setup guide
- SENTRY_QUICK_START.md - 1-minute quick start
- SENTRY_IMPLEMENTATION.md - Implementation details
- SENTRY_CHECKLIST.md - Deployment checklist

Benefits:
- Zero observability → Real-time error monitoring
- Silent failures → Automatic notifications
- No context → Full stack traces with breadcrumbs
- Reactive debugging → Proactive issue detection

Closes #[issue_number]
```

## Alternative short version:

```
feat: add Sentry error tracking

- Install @sentry/react for production error monitoring
- Add ErrorBoundary and automatic exception capture
- Filter PII (wallet addresses, user IDs) before sending
- Add error tagging to all contract operations
- Configure graceful degradation without DSN
- Add comprehensive setup documentation

Closes #[issue_number]
```
