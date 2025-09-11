# Dabetai Mobile App - Copilot Instructions

## Project Overview
**dabetai** is a React Native/Expo app for diabetes patients to monitor health and receive AI-powered complication predictions (retinopathy, nephropathy, neuropathy, diabetic foot). Part of a larger ecosystem including web app for doctors and AI/ML backends.

## Architecture & Navigation

### Expo Router File-Based Routing
- `app/_layout.tsx` - Root layout with QueryClient, auth routing logic
- Route groups: `(public)`, `(auth)`, `(tabs)` for different app states
- Auth flow: Welcome → Login/Register → Tabs (home, predictions, etc.)
- Each route group has its own `_layout.tsx` for screen configuration

### State Management Patterns
- **React Query** (`@tanstack/react-query`) for server state
- **AsyncStorage** for auth tokens, user data, onboarding state
- **Custom hooks**: `useAuthState.tsx` for authentication state
- No global state manager - prefer React Query + local state

### Feature-Based Architecture
```
src/features/
  dashboard/components/    # Home screen components (GlucoseCard, RiskIndicator)
  configuration/components/
  notifications/components/
```
Keep feature-specific components within their feature folders, not in global `src/components/`.

## Component System

### Layout Components (`src/components/layouts/`)
- **AppLayout**: Standard page wrapper with Header + NavigationBar + scrollable content
- **OnboardingLayout**: For welcome/signup flows
- Always use layouts for consistent spacing and navigation

### Core Components (`src/components/core/`)
- **Typography**: `Display`, `H1`, `H2`, `H3`, `Subtitle`, `Body`, `BodyBold`, `BodySmall`, `BodySmallBold`, `Caption`, `CaptionBold` from `@/components/common/Typography`
- **Buttons**: Consistent variants (`primary`, `secondary`, `outline`)
- **Inputs**: Custom hooks `useInputField`, `usePasswordInput` with validation
- **Navigation**: `Header` (3 variants: section, principal, onboarding), `NavigationBar`

### Styling with NativeWind
- **Always use Tailwind CSS classes via NativeWind** - never hardcode styles or use StyleSheet
- **Check existing custom classes** in `tailwind.config.js` before creating new ones
- Custom colors: `primary`, `secondary`, `danger`, `success`, `warning` with variants (50, 100, 300, 500, 700, 900)
- Risk levels: `'bajo'` (success colors), `'medio'` (warning colors), `'alto'` (danger colors)
- **Never hardcode hex values** - use Tailwind color classes like `text-primary-500`, `bg-danger-200`

## Development Guidelines

### Core Principles
- **No markdown instruction files** unless explicitly requested by user
- **Avoid hardcoded values** - use Tailwind classes and project constants
- **Check existing patterns** before creating new components or styles
- **Follow feature-based architecture** - keep components in their feature folders

### Styling Best Practices
- Use NativeWind classes exclusively: `className="bg-primary-500 text-white"`
- Reference custom Tailwind config for project-specific colors
- Risk level styling pattern: `'bajo'` → success colors, `'medio'` → warning colors, `'alto'` → danger colors
- Check `tailwind.config.js` for available custom classes before adding new ones

### Typography System Best Practices
- **Use semantic components** instead of manual font styling: prefer `BodyBold` over `Body` with `font-bold`
- **Available components**: `Display` (largest), `H1`, `H2`, `H3`, `Subtitle`, `Body`, `BodyBold`, `BodySmall`, `BodySmallBold`, `Caption`, `CaptionBold`
- **DO NOT** add `font-bold` className to already bold variants (`BodyBold`, `BodySmallBold`, `CaptionBold`)
- **DO NOT** manually change font sizes with Tailwind classes - use the appropriate semantic component
- **DO** use className for spacing or other non-font properties
- **DO** use the built-in `onPress` prop for clickable text instead of wrapping in TouchableOpacity
- **Color changes**: Use `!` modifier to override default `text-gray-700`: `<Body className="!text-primary-500">`. Only override colors for specific semantic colors (warning, danger, success, gray-500)
- **Hierarchy**: `Display` > `H1` > `H2` > `H3` > `Subtitle` > `Body` > `BodySmall` > `Caption`

## Key Development Patterns

### API Integration
- Hardcoded development API: `http://192.168.100.20:8000`
- Endpoints: `/retinopathy/predict/1` for predictions
- Use React Query mutations for API calls
- Example pattern in `app/(tabs)/home.tsx` and `app/(tabs)/prediction/index.tsx`

### Authentication Flow
- Check `useAuthState()` hook for auth state and onboarding completion
- Tokens stored in AsyncStorage
- Root layout handles automatic routing based on auth state

### Prediction Components
Risk levels (`'bajo' | 'medio' | 'alto'`) are central to the app:
- `RiskCircle` - Animated risk level indicators
- `RiskLevelCard` - Main prediction display with update functionality
- `ComplicationsList` - Shows 4 complications (nephropathy, retinopathy, neuropathy, diabetic foot)
- `TrendChart` - Historical risk data visualization

### Animation Patterns
- Use `react-native-reanimated` for smooth animations
- Common pattern: pulse animations for risk indicators and glucose cards
- Risk circles have glow effects and scaling animations

## Development Workflow

### Commands
```bash
npm start          # Start Expo dev server
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run lint       # ESLint check
```

### Git Conventions (from CONTRIBUTING.MD)
- Branch naming: `feat/`, `fix/`, `refactor/`, `docs/`
- Commits: Conventional commits in English (`feat:`, `fix:`, etc.)
- Always use PR template when creating pull requests

### File Structure Conventions
- Route files directly in `app/` folder structure
- Components in feature folders when specific to that feature
- Shared components in `src/components/core/`
- Import aliases: `@/` points to `src/`

## Key Dependencies
- **Expo 53.x** with new architecture enabled
- **React Native 0.79** with React 19
- **NativeWind 4.x** for styling
- **Expo Router 5.x** for navigation
- **React Query 5.x** for data fetching
- **React Native Chart Kit** for data visualization

## Common Gotchas
- **Never create markdown instruction files** without explicit user request
- **Always use NativeWind classes** - avoid StyleSheet.create() or hardcoded styles
- Always wrap screens with appropriate Layout component for consistent UI
- Risk level prop must be lowercase: `'bajo' | 'medio' | 'alto'`
- Use absolute imports with `@/` alias
- Header variants determine styling: `'section' | 'principal' | 'onboarding'`
- Navigation bar expects `activeTab` prop for highlighting current screen
- All prediction screens use SafeAreaView with Header and NavigationBar pattern
- **Check tailwind.config.js first** for existing custom classes before creating new styles
