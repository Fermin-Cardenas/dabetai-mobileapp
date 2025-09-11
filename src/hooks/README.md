# Propósito del directorio: `src/hooks`

Hooks reutilizables (react query) para auth, usuarios y predicciones con caché e invalidaciones listas.

## ¿Por qué existe?

Estandariza el acceso a datos: claves de query, notificaciones, navegación y mutaciones coherentes.

## Uso básico y ejemplo

```javascript
// auth
import { useAuth } from '@/hooks/useAuth';
const { login, isLoginLoading } = useAuth();
login({ email: 'demo@dabetai.com', password: '***' });

// predicciones
import { usePredictions } from '@/hooks/usePredictions';
const { useGeneralPrediction, predictRetinopathy } = usePredictions('1');
const { data, isLoading } = useGeneralPrediction();
predictRetinopathy({ glucoseLevel: 120 });
```

## Puntos clave a recordar

- Claves: usa `QUERY_KEYS` de `src/config/environment.ts` para consistencia.
- `usePredictions` asume `userId='1'` si no pasas uno; pasa el real en producción.
- Las mutaciones muestran notificaciones e invalidan queries automáticamente.
- Los errores ya se formatean y notifican; evita duplicar toasts en componentes.
