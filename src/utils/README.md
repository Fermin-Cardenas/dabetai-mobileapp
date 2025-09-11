# Propósito del directorio: `src/utils`

Utilidades pequeñas y reutilizables (p. ej., notificaciones y mock helpers).

## ¿Por qué existe?

Evitar reimplementaciones en features. Unificar alertas y formatos de error.

## Uso básico y ejemplo

```javascript
import { showSuccessNotification, showErrorNotification } from '@/utils/notifications';

showSuccessNotification('Operación exitosa');
showErrorNotification('Algo salió mal');
```

## Puntos clave a recordar

- Las notificaciones usan `Alert` nativo; son bloqueantes.
- `formatApiErrorMessage(error)` devuelve un mensaje seguro para mostrar.
- Mantén este directorio libre de dependencias de UI; solo helpers puros.
