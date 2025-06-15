// app/_layout.tsx
import "./global.css"
import { Stack, router, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from "@/state/auth"; // O tu hook de autenticación
import * as SplashScreen from 'expo-splash-screen';
import { CustomSplashScreen } from '@/components/common/CustomSplashScreen'; // ★ 1. Importa tu componente de splash (ajusta la ruta si es necesario)

// Evita que el splash screen nativo se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const { user, isLoading, isOnboardingComplete } = useAuth(); // Tu hook debe proveer el estado de carga
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return; // Si estamos cargando el estado del usuario, no hagas nada

    // Una vez que tenemos el estado, ocultamos el splash screen nativo
    SplashScreen.hideAsync();

    const inApp = segments[0] === '(tabs)';

    if (user && isOnboardingComplete) {
      // Usuario listo para usar la app
      if (!inApp) router.replace('/(tabs)/home'); // Si no está en la app, llévalo
    } else if (user && !isOnboardingComplete) {
      // Usuario logueado pero no ha completado el onboarding
      router.replace('/onboarding');
    } else if (!user) {
      // No hay usuario, debe estar en el flujo público/auth
      // Lo llevamos a la bienvenida si no está ya en esa zona
      if (segments[0] !== '(public)' && segments[0] !== '(auth)') {
        router.replace('/(public)/welcome');
      }
    }
  }, [isLoading, user, isOnboardingComplete]);

  // ★ 2. Lógica de renderizado condicional ★
  // Mientras se determina el estado del usuario, muestra tu componente personalizado.
  if (isLoading) {
    return <CustomSplashScreen />;
  }

  // ★ 3. Una vez que no está cargando, renderiza la app normal.
  // El useEffect de arriba se encargará de la redirección correcta.
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Declara todos tus "mundos". El useEffect se encarga de elegir el correcto. */}
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        {/* Y tus otras stacks modales */}
        <Stack.Screen name="config" options={{ presentation: 'modal' }} />
        <Stack.Screen name="devices" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notify" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
