# Propósito del directorio: `src/config`

Fuente única de verdad para URLs de API, endpoints, flags de entorno y claves de react query.

## ¿Por qué existe?

Evita hardcodes y dispersión de configuración. Cambios de entorno en un solo lugar con configuración segura para Expo.

## Uso básico y ejemplo

```javascript
import { ENV, API_CONFIG, QUERY_KEYS } from '@/config/environment';

// Variables de entorno accesibles en el cliente
console.log(ENV.PREDICTION_API_URL); // http://192.168.100.20:8000
console.log(ENV.NODE_ENV); // development
console.log(ENV.DEVELOPER_MODE); // true (derivado de NODE_ENV)

// Configuración de API con endpoints
fetch(`${API_CONFIG.PREDICTION.BASE_URL}${API_CONFIG.PREDICTION.ENDPOINTS.RETINOPATHY}/1`);

// Claves para React Query
const queryKey = QUERY_KEYS.PREDICTIONS.RETINOPATHY('1');
```

## Puntos clave a recordar

- **CRÍTICO**: Todas las variables de entorno deben usar prefijo `EXPO_PUBLIC_` para funcionar en Expo.
- **Seguridad**: Nunca uses `EXPO_PUBLIC_` para secretos (API keys, passwords), solo para URLs y configuración pública.
- Usa únicamente `environment.ts` - el archivo `config/api.ts` fue eliminado por seguridad.
- `DEVELOPER_MODE` activa mocks en `src/api/*` y bypass de auth si `BYPASS_AUTH`.
- Alinea el almacenamiento del token: usa una sola clave (recomendado `authToken`).
- No edites keys a mano en features; importa desde aquí.
- El archivo `.env` está protegido en `.gitignore` - usa `.env.example` como plantilla.
