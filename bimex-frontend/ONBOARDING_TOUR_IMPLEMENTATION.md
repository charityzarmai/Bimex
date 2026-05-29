# Onboarding Tour Implementation

## ✅ Completed Tasks

### 1. Component Creation
- ✅ Created `OnboardingTour.jsx` with custom lightweight tour implementation
- ✅ No external dependencies needed (react-joyride not required)
- ✅ Fully responsive and accessible

### 2. Translation Files
- ✅ Updated `es.json` with Spanish tour texts
- ✅ Updated `en.json` with English tour texts
- ✅ Structured translations with title and content for each step

### 3. App Integration
- ✅ Imported OnboardingTour component in App.jsx
- ✅ Added tour state management (`tourActivo`)
- ✅ Trigger tour automatically on first wallet connection
- ✅ Added "?" button in navbar to manually restart tour
- ✅ LocalStorage integration to track tour completion

### 4. Tour Steps

The tour includes 5 steps:

1. **Wallet Chip** - Shows connected wallet address
2. **Project List** - Explains the project exploration area
3. **Project Card** - How to view details and contribute
4. **Testnet Badge** - Explains testnet and faucet
5. **Mi Cuenta Button** - Shows where to view contributions and yield

### 5. Features Implemented

- ✅ Automatic trigger on first login
- ✅ Skip button on every step
- ✅ Progress indicator (visual bars)
- ✅ Step counter (e.g., "1 / 5")
- ✅ LocalStorage persistence (won't show again after completion)
- ✅ Manual restart via "?" button in navbar
- ✅ Smooth animations (fadeIn, slideIn)
- ✅ Overlay with semi-transparent background
- ✅ Element highlighting with green border and shadow
- ✅ Smart positioning (adapts to viewport)
- ✅ Bilingual support (ES/EN)

## 📋 Acceptance Criteria

✅ First time connecting wallet → tour activates automatically
✅ Tour can be skipped at any step
✅ Tour doesn't show on subsequent visits (localStorage)
✅ "?" button in navbar restarts the tour manually
✅ All texts translated to ES and EN

## 🎨 Design Details

- **Overlay**: Semi-transparent black background (rgba(0, 0, 0, 0.5))
- **Tooltip**: White card with green border (2px solid var(--green))
- **Highlight**: Target elements get green shadow and border
- **Progress**: Visual bars showing current step
- **Animations**: Smooth fade-in and slide-in effects

## 🔧 Technical Implementation

### Component Structure
```
OnboardingTour.jsx
├── State management (currentStep, tooltipPosition)
├── Steps configuration (target, title, content, placement)
├── Position calculation (dynamic based on target element)
├── Highlight management (adds/removes styles)
├── Event handlers (next, skip, complete)
└── Exports (shouldShowTour, restartTour)
```

### Integration Points
- `App.jsx`: Main integration, state management, trigger logic
- `i18n/es.json`: Spanish translations
- `i18n/en.json`: English translations
- `ListaProyectos.jsx`: Already has `project-card` class for targeting

## 🚀 Usage

### For Users
1. Connect wallet for the first time → tour starts automatically
2. Click "Siguiente" to advance through steps
3. Click "Omitir" to skip the tour
4. Click "?" button in navbar to restart tour anytime

### For Developers
```javascript
import OnboardingTour, { shouldShowTour, restartTour } from "./components/OnboardingTour";

// Check if tour should show
if (shouldShowTour()) {
  setTourActivo(true);
}

// Restart tour manually
restartTour();
setTourActivo(true);
```

## 📝 Notes

- Tour uses custom implementation instead of react-joyride (no npm install needed)
- Lightweight and performant
- Fully accessible with ARIA labels
- Responsive design works on mobile and desktop
- Clean up of element styles on unmount
- Fallback selectors for elements that might not exist

## 🐛 Known Limitations

- Tour targets specific CSS selectors - if component structure changes significantly, selectors may need updates
- Some elements (like "Mi Cuenta" button) use text-based fallback selectors
- Tour doesn't pause if user navigates away (by design - it completes/skips)

## ✨ Future Enhancements (Optional)

- Add keyboard navigation (Arrow keys, Escape)
- Add tour progress persistence (resume from last step)
- Add analytics tracking for tour completion rates
- Add more granular step targeting (e.g., specific project features)
- Add video/GIF demonstrations in tour steps
