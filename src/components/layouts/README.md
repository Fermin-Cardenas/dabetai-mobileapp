# Propósito del directorio: `src/components/layouts`

Envolturas de pantalla reutilizables para diseño consistente con header y barra de navegación.

## ¿Por qué existe?

Evita repetir safe areas, scrolls y navegación en cada pantalla. asegura espaciado, variantes de header y tabs coherentes.

## Uso básico y ejemplo

```javascript
import { AppLayout } from '@/components/layouts';

export const Screen = () => (
  <AppLayout title="inicio" activeTab="inicio">
    {/* contenido */}
  </AppLayout>
);
```

## Puntos clave a recordar

- Usa `AppLayout` para pantallas normales y `OnboardingLayout` para onboarding.
- No mezcles con `Header` o `NavigationBar` manuales; ya vienen incluidos.
- Para chats, usa `scrollable={false}` y controla el scroll dentro.
- Con expo router, oculta el header nativo: `<Stack.Screen options={{ headerShown: false }} />`.
