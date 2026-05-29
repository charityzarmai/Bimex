# Onboarding Tour Implementation

## Overview
Implemented a guided onboarding tour for new users to reduce bounce rate and improve conversion to first contribution.

## Features Implemented

### 1. OnboardingTour Component (`src/components/OnboardingTour.jsx`)
- 5-step guided tour using `react-joyride`
- Automatic trigger on first wallet connection
- Skip functionality at any step
- LocalStorage persistence to prevent showing on subsequent visits
- Manual restart via "?" button in navbar
- Bilingual support (ES/EN)

### 2. Tour Steps
1. **Wallet Connection** - Shows connected Stellar address
2. **Project List** - Explains project exploration
3. **Project Card** - How to view details and contribute
4. **Testnet Badge** - Explains testnet environment and faucet
5. **My Account** - Where to view contributions and yield

### 3. Integration Points

#### App.jsx
- Import `OnboardingTour` component and utilities
- State management for tour visibility (`runTour`)
- Trigger tour on first login in `manejarConectado`
- "?" help button in navbar to restart tour
- Tour component rendered at app root level

#### ListaProyectos.jsx
- Added `project-card` class to project cards for tour targeting

#### Translation Files
- Added `tour` section to `es.json` and `en.json`
- Includes step content and button labels

## Installation

```bash
npm install react-joyride
```

## Usage

### First-time User Flow
1. User connects wallet
2. Tour automatically starts after 800ms delay
3. User can skip or complete the tour
4. Completion status saved to localStorage

### Returning Users
- Tour does not show automatically
- Can be restarted via "?" button in navbar

### Manual Tour Reset
```javascript
import { resetTour } from './components/OnboardingTour';
resetTour(); // Clears localStorage flag
```

## Customization

### Styling
Tour styling is configured in `OnboardingTour.jsx`:
- Primary color: `#16A34A` (green)
- Custom tooltip styles
- Button styling matching app design

### Adding/Modifying Steps
Edit the `steps` array in `OnboardingTour.jsx`:
```javascript
{
  target: ".css-selector",
  content: t("tour.stepKey"),
  placement: "top|bottom|left|right",
  disableBeacon: true, // Optional: skip beacon animation
}
```

### Translations
Add new keys to `src/i18n/es.json` and `src/i18n/en.json` under the `tour` section.

## Acceptance Criteria ✓

- [x] First wallet connection triggers tour automatically
- [x] Tour can be skipped at any step
- [x] Tour does not show on subsequent visits (localStorage)
- [x] "?" button in navbar restarts tour manually
- [x] All 5 steps implemented and translated
- [x] Bilingual support (ES/EN)

## Technical Details

### LocalStorage Key
`bimex.tourCompletado` - Set to `"true"` when tour is completed or skipped

### Dependencies
- `react-joyride@^2.9.2` - Tour library

### Browser Compatibility
Works in all modern browsers that support localStorage and ES6+

## Future Enhancements
- Add analytics tracking for tour completion rates
- A/B test different tour content
- Add contextual tours for specific features
- Video tutorials integration
