import { useAuthState } from '@/hooks/useAuthState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import "../global.css";

// Prevenir que el splash nativo se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);
  const { isLoggedIn, isLoading, hasCompletedOnboarding } = useAuthState();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading || isReady) return;

    const initApp = async () => {
      await SplashScreen.hideAsync();
      setIsReady(true);

      // Solo redirigir si estamos en una ruta que no corresponde al estado actual
      const inAuthGroup = segments[0] === '(auth)';
      const inPublicGroup = segments[0] === '(public)';
      const inTabsGroup = segments[0] === '(tabs)';

      if (isLoggedIn && !inTabsGroup) {
        router.replace('/(tabs)/home');
      } else if (!isLoggedIn && hasCompletedOnboarding && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (!isLoggedIn && !hasCompletedOnboarding && !inPublicGroup) {
        router.replace('/(public)/welcome');
      }
    };

    setTimeout(initApp, 100);
  }, [isLoading, isLoggedIn, hasCompletedOnboarding, isReady, segments]);

  // Mostrar splash nativo mientras no esté listo
  if (!isReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="notify" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}