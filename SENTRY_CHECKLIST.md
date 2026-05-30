# Checklist de Implementación de Sentry

## ✅ Código implementado

- [x] Instalado `@sentry/react` en `package.json`
- [x] Inicializado Sentry en `main.jsx`
- [x] Agregado `ErrorBoundary` en `main.jsx`
- [x] Configurado `beforeSend` para filtrar PII
- [x] Agregado `Sentry.captureException()` en `contrato.js`:
  - [x] `simularLectura()`
  - [x] `firmarYEnviar()`
  - [x] `obtenerBalanceMXNe()`
  - [x] `obtenerTotalProyectos()`
  - [x] `calcularYield()`
  - [x] `obtenerAportacion()`
  - [x] `calcularYieldDetallado()`
  - [x] `obtenerEstadoCapital()`
- [x] Agregado `Sentry.captureException()` en `errores.js`
- [x] Agregado `VITE_SENTRY_DSN` a `.env.example`
- [x] Agregado `VITE_SENTRY_DSN` a `.env.production`
- [x] Agregado `VITE_SENTRY_DSN` a `.env.staging`
- [x] Agregado `VITE_SENTRY_DSN` a `.env.testnet`
- [x] Creado test unitario `sentry.test.js`
- [x] Creado documentación completa

## 📋 Tareas pendientes (requieren acción manual)

### 1. Crear proyecto en Sentry
- [ ] Ir a [sentry.io](https://sentry.io)
- [ ] Crear cuenta gratuita (o usar existente)
- [ ] Crear nuevo proyecto:
  - Platform: **React**
  - Project name: **bimex-frontend**
  - Alert frequency: **On every new issue**
- [ ] Copiar el DSN proporcionado

### 2. Configurar DSN en entornos

#### Desarrollo local
- [ ] Crear archivo `.env.local` (si no existe)
- [ ] Agregar: `VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

#### Staging
- [ ] Actualizar `.env.staging` con el DSN
- [ ] Opcional: crear proyecto separado en Sentry para staging

#### Production
- [ ] Actualizar `.env.production` con el DSN
- [ ] Configurar en Vercel/hosting:
  ```
  VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
  ```

### 3. Instalar dependencias
```bash
cd bimex-frontend
npm install
```

### 4. Verificar integración

#### En desarrollo:
```bash
npm run dev
```

Abrir consola del navegador y ejecutar:
```javascript
throw new Error("Test Sentry - desarrollo")
```

Verificar en dashboard de Sentry que el error aparece.

#### En staging:
```bash
npm run build:staging
npm run preview
```

Forzar un error y verificar en Sentry.

#### En production:
Después del deploy, verificar que los errores reales se capturen.

### 5. Configurar alertas en Sentry

- [ ] Email notifications
  - Settings → Alerts → Email
  - Configurar para "Every new issue"
  
- [ ] Slack (opcional)
  - Settings → Integrations → Slack
  - Conectar workspace
  - Configurar canal de notificaciones

- [ ] Discord (opcional)
  - Settings → Integrations → Discord
  - Configurar webhook

### 6. Configurar filtros de errores (opcional)

En Sentry dashboard:
- [ ] Settings → Inbound Filters
- [ ] Ignorar errores conocidos/esperados:
  - Browser extensions
  - Ad blockers
  - Errores de terceros

### 7. Configurar releases (opcional pero recomendado)

Para trackear errores por versión:

```bash
# Instalar Sentry CLI
npm install --save-dev @sentry/cli

# Configurar en package.json
"scripts": {
  "build": "vite build && sentry-cli releases files <release> upload-sourcemaps ./dist"
}
```

### 8. Monitoreo continuo

- [ ] Revisar dashboard de Sentry diariamente
- [ ] Configurar métricas de estabilidad
- [ ] Establecer SLOs (Service Level Objectives)
- [ ] Crear runbook para errores comunes

## 🧪 Tests de verificación

### Test 1: Error de React
```javascript
// En cualquier componente
throw new Error("Test React Error")
```
**Esperado:** Error aparece en Sentry con stack trace de React

### Test 2: Error de contrato
```javascript
// Intentar contribuir sin wallet conectada
await contribuir(null, 0, 1000000000)
```
**Esperado:** Error con tag `tipo: firma_rechazada`

### Test 3: Error de red
```javascript
// Desconectar internet y recargar proyectos
```
**Esperado:** Error con tag `tipo: total_proyectos_error`

### Test 4: Filtrado de PII
```javascript
// Forzar error con wallet address en contexto
Sentry.captureException(new Error("Test"), {
  extra: { address: "GXXXXXXX..." }
})
```
**Esperado:** Address NO aparece en Sentry dashboard

## 📊 Métricas a monitorear

- [ ] Error rate (errores/minuto)
- [ ] Usuarios afectados
- [ ] Errores más frecuentes
- [ ] Tiempo de resolución
- [ ] Estabilidad por versión

## 🎯 Criterios de aceptación

- [x] ✅ Código implementado y sin errores de sintaxis
- [ ] ⏳ Proyecto creado en Sentry
- [ ] ⏳ DSN configurado en todos los entornos
- [ ] ⏳ Dependencias instaladas
- [ ] ⏳ Verificación en desarrollo exitosa
- [ ] ⏳ Verificación en staging exitosa
- [ ] ⏳ Alertas configuradas
- [ ] ⏳ Errores de producción aparecen en dashboard
- [ ] ⏳ No se envían wallet addresses a Sentry
- [ ] ⏳ App funciona sin DSN configurado

## 📚 Recursos

- [Documentación completa](./bimex-frontend/SENTRY_SETUP.md)
- [Guía rápida](./bimex-frontend/SENTRY_QUICK_START.md)
- [Resumen de implementación](./SENTRY_IMPLEMENTATION.md)
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)

## 🆘 Troubleshooting

### Sentry no captura errores
1. Verificar que `VITE_SENTRY_DSN` esté configurado
2. Verificar que la app se reconstruyó después de agregar el DSN
3. Verificar en Network tab que las requests a Sentry se envían
4. Verificar que el DSN sea correcto

### Errores duplicados
1. Verificar que no haya múltiples `Sentry.init()` calls
2. Verificar que no se capture el mismo error dos veces

### PII aparece en Sentry
1. Verificar función `beforeSend` en `main.jsx`
2. Agregar más filtros si es necesario
3. Usar `Sentry.setContext()` con cuidado

### Performance issues
1. Ajustar `tracesSampleRate` (reducir de 0.1 a 0.05)
2. Ajustar `replaysSessionSampleRate` (reducir de 0.1 a 0.05)
3. Deshabilitar Session Replay si no se usa
