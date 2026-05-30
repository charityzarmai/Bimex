# Bimex Frontend

Frontend de la plataforma Bimex — crowdfunding con yield dual (CETES + AMM) en Stellar/Soroban.

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Build para staging
npm run build:staging

# Tests
npm run test

# Coverage
npm run coverage
```

## 📋 Requisitos

- Node.js 18+
- npm 9+
- Freighter Wallet (para interactuar con la app)

## 🔧 Configuración

### Variables de entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Stellar / Soroban
VITE_CONTRACT_ID=<contract_id>
VITE_RPC_URL=https://soroban-testnet.stellar.org
VITE_TOKEN_MXNE=<token_address>
VITE_ADMIN_ADDRESS=<admin_address>

# Indexer API (opcional)
VITE_INDEXER_URL=http://localhost:3001

# Supabase (opcional)
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>

# Pinata IPFS (opcional)
VITE_PINATA_API_KEY=<api_key>
VITE_PINATA_SECRET=<secret>

# Sentry (opcional - para error tracking)
VITE_SENTRY_DSN=<sentry_dsn>
```

### Sentry Error Tracking

Para habilitar error tracking en producción:

1. Crea cuenta en [sentry.io](https://sentry.io)
2. Crea proyecto React
3. Copia el DSN
4. Agrégalo a `.env.local`:
   ```bash
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

Ver [SENTRY_QUICK_START.md](./SENTRY_QUICK_START.md) para más detalles.

## 🏗️ Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── ConectarWallet.jsx
│   ├── CrearProyecto.jsx
│   ├── DetalleProyecto.jsx
│   ├── ListaProyectos.jsx
│   ├── MiCuenta.jsx
│   ├── AdminPanel.jsx
│   └── ...
├── stellar/            # Integración con Stellar/Soroban
│   └── contrato.js     # Funciones del smart contract
├── utils/              # Utilidades
│   ├── errores.js      # Manejo de errores
│   ├── ipfs.js         # Integración IPFS
│   ├── storage.js      # LocalStorage
│   └── metaTags.js     # SEO
├── i18n/               # Internacionalización
│   ├── es.json         # Español
│   ├── en.json         # English
│   └── index.js
├── hooks/              # Custom hooks
│   └── useCetesRate.js
├── test/               # Tests
│   └── ...
├── App.jsx             # Componente principal
└── main.jsx            # Entry point
```

## 🧪 Tests

```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run coverage

# Tests en modo watch
npm run test -- --watch
```

## 📦 Build

```bash
# Build para producción
npm run build

# Build para staging
npm run build:staging

# Preview del build
npm run preview
```

## 🌐 Entornos

- **Development**: `.env.local` (testnet)
- **Staging**: `.env.staging` (testnet con contrato dedicado)
- **Production**: `.env.production` (mainnet)

Ver [docs/staging-environment.md](../docs/staging-environment.md) para más detalles.

## 🔍 Linting

```bash
npm run lint
```

## 📚 Documentación adicional

- [SENTRY_SETUP.md](./SENTRY_SETUP.md) - Configuración de Sentry
- [SENTRY_QUICK_START.md](./SENTRY_QUICK_START.md) - Quick start de Sentry
- [DOCUMENTACION_TECNICA_BIMEXFI_ACTUAL.txt](./DOCUMENTACION_TECNICA_BIMEXFI_ACTUAL.txt) - Documentación técnica completa

## 🛠️ Stack tecnológico

- **React 19** - UI framework
- **Vite 8** - Build tool
- **React Router 7** - Routing
- **Stellar SDK 14** - Blockchain integration
- **Freighter API 6** - Wallet integration
- **i18next** - Internacionalización
- **Vitest** - Testing
- **Sentry** - Error tracking
- **Supabase** - Backend (opcional)
- **Pinata** - IPFS (opcional)

## 🤝 Contribuir

Ver [docs/guia-contribuidor.md](../docs/guia-contribuidor.md)

## 📄 Licencia

Ver LICENSE en el root del proyecto.
