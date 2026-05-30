# Sentry Error Flow

## Flujo de captura de errores

```
┌─────────────────────────────────────────────────────────────────┐
│                         Usuario                                  │
│                            ↓                                     │
│                    Acción en la app                              │
│                            ↓                                     │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React)                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Componente React                                       │    │
│  │    ↓                                                    │    │
│  │  Llama función de contrato.js                          │    │
│  │    ↓                                                    │    │
│  │  Error ocurre (red, firma, tx, etc.)                   │    │
│  │    ↓                                                    │    │
│  │  catch (error) {                                        │    │
│  │    Sentry.captureException(error, { tags, extra })     │    │
│  │    throw error  // continúa el flujo normal            │    │
│  │  }                                                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  parsearError(error)                                    │    │
│  │    ↓                                                    │    │
│  │  Sentry.captureException(error, { tipo: 'parseado' })  │    │
│  │    ↓                                                    │    │
│  │  return mensaje_usuario                                │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Sentry.beforeSend()                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Filtrar PII:                                           │    │
│  │  - Remover user.id, user.email                          │    │
│  │  - Sanitizar breadcrumbs (address → [REDACTED])        │    │
│  │  - Remover wallet addresses                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Sentry Cloud                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Error almacenado con:                                  │    │
│  │  - Stack trace completo                                 │    │
│  │  - Tags (tipo, environment)                             │    │
│  │  - Extra context (sin PII)                              │    │
│  │  - Breadcrumbs (sanitizados)                            │    │
│  │  - Browser/OS info                                      │    │
│  │  - Timestamp                                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Notificaciones                                │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Email   │  │  Slack   │  │ Discord  │  │ Webhook  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                            ↓                                     │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Equipo de desarrollo                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  1. Recibe notificación                                 │    │
│  │  2. Revisa dashboard de Sentry                          │    │
│  │  3. Analiza stack trace y contexto                      │    │
│  │  4. Reproduce el error                                  │    │
│  │  5. Implementa fix                                      │    │
│  │  6. Deploy                                              │    │
│  │  7. Verifica que el error no vuelva a ocurrir           │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Tipos de errores capturados

### 1. Errores de React (ErrorBoundary)
```
Componente crash
    ↓
ErrorBoundary captura
    ↓
Sentry.captureException()
    ↓
Muestra fallback UI
```

### 2. Errores de contrato
```
Función de contrato (contribuir, crear, etc.)
    ↓
Error en simulación/firma/envío
    ↓
catch (error) { Sentry.captureException() }
    ↓
parsearError() → mensaje usuario
```

### 3. Errores de red
```
RPC call
    ↓
Timeout / 502 / 503
    ↓
Sentry.captureException()
    ↓
Usuario ve mensaje amigable
```

### 4. Errores no capturados
```
Error en cualquier parte del código
    ↓
Sentry captura automáticamente
    ↓
beforeSend filtra PII
    ↓
Enviado a Sentry Cloud
```

## Ejemplo de error en Sentry

```json
{
  "message": "La transacción fue rechazada por la red",
  "level": "error",
  "platform": "javascript",
  "tags": {
    "tipo": "tx_rechazada",
    "environment": "testnet"
  },
  "extra": {
    "envio": { "status": "ERROR" },
    "motivo": "..."
  },
  "breadcrumbs": [
    {
      "category": "navigation",
      "message": "User navigated to /proyecto/0"
    },
    {
      "category": "ui.click",
      "message": "User clicked 'Contribuir'"
    },
    {
      "category": "http",
      "message": "POST https://soroban-testnet.stellar.org",
      "data": {
        "address": "[REDACTED]"
      }
    }
  ],
  "user": {},
  "contexts": {
    "browser": {
      "name": "Chrome",
      "version": "120.0.0"
    },
    "os": {
      "name": "Windows",
      "version": "10"
    }
  },
  "exception": {
    "values": [
      {
        "type": "Error",
        "value": "La transacción fue rechazada por la red",
        "stacktrace": {
          "frames": [
            {
              "filename": "contrato.js",
              "function": "firmarYEnviar",
              "lineno": 123,
              "colno": 15
            }
          ]
        }
      }
    ]
  }
}
```

## Dashboard de Sentry

```
┌─────────────────────────────────────────────────────────────────┐
│  Sentry Dashboard                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📊 Overview                                                     │
│  ├─ 42 errors in last 24h                                       │
│  ├─ 12 users affected                                           │
│  └─ 98.5% stability                                             │
│                                                                  │
│  🔥 Top Issues                                                   │
│  ├─ [tx_rechazada] La transacción fue rechazada (15 events)    │
│  ├─ [firma_rechazada] Freighter rechazó la firma (8 events)    │
│  └─ [tx_timeout] Tiempo de espera agotado (5 events)           │
│                                                                  │
│  📈 Trends                                                       │
│  └─ Error rate: ↓ 15% vs last week                             │
│                                                                  │
│  🌍 Environments                                                 │
│  ├─ testnet: 35 errors                                          │
│  └─ mainnet: 7 errors                                           │
│                                                                  │
│  🔔 Alerts                                                       │
│  └─ Email on every new issue                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Filtrado de PII - Ejemplo

### Antes de beforeSend:
```javascript
{
  user: {
    id: "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    email: "user@example.com"
  },
  breadcrumbs: [
    {
      data: {
        address: "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        wallet: "freighter",
        amount: 1000000000
      }
    }
  ]
}
```

### Después de beforeSend:
```javascript
{
  user: {},  // ← PII removido
  breadcrumbs: [
    {
      data: {
        address: "[REDACTED]",  // ← Sanitizado
        wallet: "[REDACTED]",   // ← Sanitizado
        amount: 1000000000      // ← OK (no es PII)
      }
    }
  ]
}
```
