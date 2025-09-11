# Propósito del directorio: `src/api`

Código de clientes HTTP y servicios de dominio (auth, usuarios, predicciones) con interceptores y modo developer.

## ¿Por qué existe?

Centraliza llamadas a API, manejo de token/errores y mocks en desarrollo. Evita duplicación y asegura consistencia entre features.

## Uso básico y ejemplo

```javascript
// autenticación
import { AuthService } from '@/api/auth';
// predicciones
import { PredictionService } from '@/api/predictions';

// login
const auth = await AuthService.login('usuario@correo.com', 'password');

// predicción rápida (retinopatía)
const result = await PredictionService.predictRetinopathy('1', {
  glucoseLevel: 120,
  age: 35,
});

console.log(result.nivel_general); // 'bajo' | 'medio' | 'alto'
```

## Puntos clave a recordar

- Los interceptores añaden `Authorization` desde AsyncStorage. Ojo: el cliente lee `token` y `AuthService` guarda `authToken` (alinear claves).
- `ENV.DEVELOPER_MODE` devuelve respuestas mock instantáneas en servicios.
- URLs base y endpoints vienen de `src/config/environment.ts` (`API_CONFIG`). No hardcodear.
- No mezclar con `src/services/` (legacy). Usa siempre `src/api/*` en código nuevo.
