# Propósito del directorio: `src/features`

Agrupar funcionalidades autocontenidas por dominio (ej. `dashboard`, `onboarding`, `notifications`).

## ¿Por qué existe?

Mantener el código de cada feature aislado, escalable y fácil de borrar o mover sin afectar otras áreas.

## Uso básico y ejemplo

```javascript
// dentro de una feature, importa sus piezas internas usando rutas absolutas locales
// ejemplo: src/features/dashboard/components/GlucoseCard.tsx

import { GlucoseCard } from '@/features/dashboard/components/GlucoseCard';

export const Screen = () => <GlucoseCard value={185} unit="mg/dL" />;
```

## Puntos clave a recordar

- Los componentes específicos de una feature viven dentro de su propia carpeta (no en `src/components/core`).
- Reutilizable y compartido va a `src/components/core/` o `src/components/layouts/`.
- Evita dependencias cruzadas entre features; comparte a través de core/hooks.