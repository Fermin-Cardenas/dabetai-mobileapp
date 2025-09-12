# Propósito del directorio: `src/services`

Implementaciones legacy de clientes y servicios HTTP previos a `src/api/*`.

## ¿Por qué existe?

Mantener compatibilidad con código antiguo mientras migras a `src/api`. Útil para entender endpoints previos.

## Uso básico y ejemplo

```javascript
// aún presente en algunas pantallas antiguas
import { AuthService } from '@/services/authService';

const session = await AuthService.login({ email, password });
```

## Puntos clave a recordar

- Preferir siempre `src/api/*` en código nuevo (interceptores avanzados + mocks + QUERY_KEYS).
- Duplicidad de config: `src/services/api.ts` usa `src/config/api.ts`; `src/api/*` usa `environment.ts`.
- Planea una migración incremental para evitar dos fuentes de verdad.
