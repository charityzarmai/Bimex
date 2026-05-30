# Sentry Quick Start

## Instalación rápida

```bash
cd bimex-frontend
npm install
```

## Configuración (1 minuto)

1. Crea cuenta gratuita en [sentry.io](https://sentry.io)
2. Crea proyecto React
3. Copia el DSN
4. Agrégalo a `.env.local`:

```bash
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

## Verificar que funciona

```bash
npm run dev
```

Abre la consola del navegador y ejecuta:

```javascript
throw new Error("Test Sentry")
```

Ve a tu dashboard de Sentry — el error debería aparecer en segundos.

## ¿Qué se captura automáticamente?

✅ Errores de React (crashes)  
✅ Errores de contrato (firma rechazada, tx fallida, timeout)  
✅ Errores de red (RPC, Stellar)  
✅ Errores no capturados (unhandled exceptions)  

## ¿Qué NO se envía?

❌ Wallet addresses  
❌ User IDs  
❌ Emails  
❌ Cualquier PII  

## Sin DSN configurado

La app funciona normalmente — Sentry simplemente no se inicializa.

## Más info

Ver `SENTRY_SETUP.md` para documentación completa.
