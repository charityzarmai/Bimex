# Implementación de Sentry para Bimex

## ✅ Tareas completadas

### 1. Instalación
- ✅ Agregado `@sentry/react` a `package.json`
- ✅ Versión: `^8.47.0`

### 2. Inicialización en `main.jsx`
- ✅ Importado `@sentry/react`
- ✅ Inicialización condicional (solo si `VITE_SENTRY_DSN` está configurado)
- ✅ Configuración de environment basada en `VITE_NETWORK`
- ✅ Integración de Browser Tracing para performance monitoring
- ✅ Integración de Session Replay para debugging visual
- ✅ Sample rates configurados (10% traces, 10% replays normales, 100% replays con error)
- ✅ Función `beforeSend` para filtrar PII

### 3. Error Boundary
- ✅ Envuelto `<App />` con `<Sentry.ErrorBoundary>`
- ✅ Fallback UI amigable para crashes de React
- ✅ Mensaje en español con instrucciones para el usuario

### 4. Captura de errores en `contrato.js`
- ✅ Importado `@sentry/react`
- ✅ Agregado `Sentry.captureException()` en:
  - `simularLectura()` - errores de simulación, TTL restore, sin retval
  - `firmarYEnviar()` - firma rechazada, tx rechazada, tx sin hash, tx fallida, timeout
  - `obtenerBalanceMXNe()` - errores de balance
  - `obtenerTotalProyectos()` - errores al obtener total
  - `calcularYield()` - errores de cálculo de yield
  - `obtenerAportacion()` - errores al obtener aportación
  - `calcularYieldDetallado()` - errores de yield detallado
  - `obtenerEstadoCapital()` - errores de estado de capital

### 5. Configuración de variables de entorno
- ✅ Agregado `VITE_SENTRY_DSN` a `.env.example`
- ✅ Agregado `VITE_SENTRY_DSN` a `.env.production`
- ✅ Agregado `VITE_SENTRY_DSN` a `.env.staging`
- ✅ Agregado `VITE_SENTRY_DSN` a `.env.testnet`

### 6. Filtrado de PII
- ✅ Función `beforeSend` remueve:
  - `user.id`
  - `user.username`
  - `user.email`
- ✅ Sanitización de breadcrumbs:
  - Campos con "address" → `[REDACTED]`
  - Campos con "wallet" → `[REDACTED]`
  - Campos con "direccion" → `[REDACTED]`
- ✅ En `contrato.js`, direcciones se marcan como `[REDACTED]` en el contexto extra

### 7. Graceful degradation
- ✅ Inicialización condicional: `if (import.meta.env.VITE_SENTRY_DSN)`
- ✅ La app funciona normalmente sin Sentry configurado

### 8. Documentación
- ✅ `SENTRY_SETUP.md` - guía completa de configuración
- ✅ `SENTRY_QUICK_START.md` - guía rápida de 1 minuto
- ✅ `SENTRY_IMPLEMENTATION.md` - este documento

### 9. Tests
- ✅ `src/test/sentry.test.js` - tests unitarios para:
  - Inicialización de Sentry
  - Filtrado de PII
  - Captura de excepciones con tags

## 📊 Contexto capturado

Cada error incluye:
- **Stack trace completo**
- **Tags**: tipo de error (firma_rechazada, tx_fallida, timeout, etc.)
- **Extra**: contexto adicional (sin PII)
- **Environment**: testnet/mainnet
- **Breadcrumbs**: navegación del usuario (sanitizados)
- **Browser/OS**: información del dispositivo

## 🔒 Seguridad y privacidad

### ✅ NO se envía:
- Wallet addresses
- User IDs
- Emails
- Claves privadas
- Datos sensibles

### ✅ SÍ se envía:
- Stack traces
- Mensajes de error
- Tipo de error
- ID de proyecto (número)
- Environment (testnet/mainnet)
- Browser/OS info

## 🚀 Próximos pasos

1. **Crear proyecto en Sentry**
   - Ir a [sentry.io](https://sentry.io)
   - Crear cuenta gratuita
   - Crear proyecto React
   - Copiar DSN

2. **Configurar DSN**
   ```bash
   # .env.local (desarrollo)
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

3. **Instalar dependencia**
   ```bash
   cd bimex-frontend
   npm install
   ```

4. **Verificar**
   ```bash
   npm run dev
   ```
   
   En la consola del navegador:
   ```javascript
   throw new Error("Test Sentry")
   ```
   
   Verificar en dashboard de Sentry que el error aparece.

5. **Configurar alertas**
   - Email
   - Slack
   - Discord
   - Webhook

## 📈 Tier gratuito de Sentry

- 5,000 errores/mes
- 10,000 performance transactions/mes
- 50 replays/mes
- Retención de 30 días
- **Suficiente para el volumen actual de Bimex**

## ✅ Criterios de aceptación

- ✅ Errores de producción aparecen en el dashboard de Sentry con stack trace
- ✅ No se envían wallet addresses ni datos sensibles a Sentry
- ✅ La app funciona normalmente si `VITE_SENTRY_DSN` no está configurado

## 🎯 Beneficios

### Antes (sin Sentry):
- ❌ Errores mueren en la consola del navegador
- ❌ Cero visibilidad de problemas en producción
- ❌ Usuarios frustrados sin soporte
- ❌ Debugging reactivo (cuando ya es tarde)

### Después (con Sentry):
- ✅ Errores capturados automáticamente
- ✅ Notificaciones en tiempo real
- ✅ Stack traces completos con contexto
- ✅ Debugging proactivo
- ✅ Métricas de estabilidad
- ✅ Priorización de bugs por impacto

## 📝 Notas técnicas

### Sample rates
```javascript
tracesSampleRate: 0.1,        // 10% de transacciones
replaysSessionSampleRate: 0.1, // 10% de sesiones normales
replaysOnErrorSampleRate: 1.0, // 100% de sesiones con error
```

### Tags personalizados
Cada error incluye un tag `tipo` para facilitar filtrado:
- `simulacion_lectura`
- `ttl_restore`
- `sin_retval`
- `firma_rechazada`
- `firma_vacia`
- `tx_rechazada`
- `tx_sin_hash`
- `tx_fallida`
- `tx_timeout`
- `balance_error`
- `total_proyectos_error`
- `calcular_yield_error`
- `obtener_aportacion_error`
- `calcular_yield_detallado_error`
- `estado_capital_error`

### Integrations
- **Browser Tracing**: Performance monitoring de navegación
- **Session Replay**: Grabación de sesiones con errores (con masking de texto/media)

## 🔗 Referencias

- [Documentación oficial de Sentry](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry React SDK](https://github.com/getsentry/sentry-javascript/tree/master/packages/react)
- [Privacy & Security](https://sentry.io/security/)
