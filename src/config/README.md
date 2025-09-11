# Propósito del directorio: `src/config`

Fuente única de verdad para URLs de API, endpoints, flags de entorno y claves de react query.

## ¿Por qué existe?

Evita hardcodes y dispersión de configuración. Cambios de entorno en un solo lugar.

## Uso básico y ejemplo

```javascript
import { ENV, API_CONFIG, QUERY_KEYS } from '@/config/environment';

console.log(ENV.PREDICTION_API_URL); // base url
fetch(`${API_CONFIG.PREDICTION.ENDPOINTS.RETINOPATHY}/1`);

// react query keys
QUERY_KEYS.PREDICTIONS.RETINOPATHY('1');
```

## Puntos clave a recordar

- Preferir `environment.ts` frente a `config/api.ts` en código nuevo.
- `DEVELOPER_MODE` activa mocks en `src/api/*` y bypass de auth si `BYPASS_AUTH`.
- Alinea el almacenamiento del token: usa una sola clave (recomendado `authToken`).
- No edites keys a mano en features; importa desde aquí.
