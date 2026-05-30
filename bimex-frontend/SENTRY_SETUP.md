# Configuración de Sentry para Bimex

## ¿Por qué Sentry?

**Problema actual:** Cero observabilidad en producción. Si un usuario tiene un error, nadie lo sabe — los errores mueren en la consola del navegador.

**Solución:** Sentry captura errores automáticamente con:
- Stack trace completo
- Contexto del usuario (sin PII)
- Breadcrumbs de navegación
- Información del entorno

## Setup

### 1. Crear cuenta en Sentry

1. Ve a [sentry.io](https://sentry.io) y crea una cuenta gratuita
2. Crea un nuevo proyecto:
   - Platform: **React**
   - Alert frequency: **On every new issue**
3. Copia el **DSN** que te proporciona (algo como `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### 2. Instalar dependencia

```bash
cd bimex-frontend
npm install @sentry/react
```

### 3. Configurar variables de entorno

Agrega el DSN a tus archivos `.env`:

**`.env.local` (desarrollo):**
```bash
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**`.env.production` (producción):**
```bash
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**`.env.staging` (staging):**
```bash
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### 4. Verificar integración

1. Inicia la app: `npm run dev`
2. Fuerza un error en la consola del navegador:
   ```javascript
   throw new Error("Test Sentry")
   ```
3. Ve al dashboard de Sentry — deberías ver el error aparecer en unos segundos

## Características implementadas

### ✅ Error Boundary
Captura crashes de React que romperían toda la app y muestra un fallback amigable.

### ✅ Captura automática de errores
Todos los errores no capturados se envían a Sentry automáticamente.

### ✅ Errores de contrato
Los errores en `contrato.js` se capturan con contexto:
- Tipo de error (firma rechazada, tx fallida, timeout, etc.)
- Información adicional (sin wallet addresses)

### ✅ Filtrado de PII
**Importante:** No se envían wallet addresses ni datos sensibles:
- Wallet addresses → `[REDACTED]`
- User IDs → removidos
- Breadcrumbs sanitizados

### ✅ Graceful degradation
Si `VITE_SENTRY_DSN` no está configurado, la app funciona normalmente sin Sentry.

## Configuración avanzada

### Ajustar sample rates

En `main.jsx`:

```javascript
tracesSampleRate: 0.1,        // 10% de transacciones para performance monitoring
replaysSessionSampleRate: 0.1, // 10% de sesiones normales
replaysOnErrorSampleRate: 1.0, // 100% de sesiones con errores
```

### Agregar contexto personalizado

```javascript
import * as Sentry from '@sentry/react'

Sentry.setContext('proyecto', {
  id: proyectoId,
  estado: proyecto.estado,
})
```

### Capturar errores manualmente

```javascript
try {
  // código que puede fallar
} catch (error) {
  Sentry.captureException(error, {
    tags: { tipo: 'custom_error' },
    extra: { info: 'contexto adicional' },
  })
  throw error
}
```

## Tier gratuito

El tier gratuito de Sentry incluye:
- 5,000 errores/mes
- 10,000 performance transactions/mes
- 50 replays/mes
- Retención de 30 días

Suficiente para el volumen actual de Bimex.

## Monitoreo

Dashboard de Sentry muestra:
- Errores en tiempo real
- Usuarios afectados
- Frecuencia de errores
- Stack traces completos
- Breadcrumbs de navegación
- Información del navegador/OS

## Alertas

Configura alertas en Sentry para recibir notificaciones:
- Email
- Slack
- Discord
- Webhook

## Criterios de aceptación

- ✅ Errores de producción aparecen en el dashboard de Sentry con stack trace
- ✅ No se envían wallet addresses ni datos sensibles a Sentry
- ✅ La app funciona normalmente si `VITE_SENTRY_DSN` no está configurado
