import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // Redirigir a welcome por defecto - el _layout.tsx manejará la navegación según el estado de auth
  return <Redirect href="/(public)/welcome" />;
}