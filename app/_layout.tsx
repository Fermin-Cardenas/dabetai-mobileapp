import "../global.css";
import { Stack, router, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { CustomSplashScreen } from '@/components/common/CustomSplashScreen';

// ✅ CAMBIA ESTA CONFIGURACIÓN
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);
  
  // Variables temporales
  const user = null;
  const isLoading = true; // ← CAMBIA A true para forzar splash personalizado
  const isOnboardingComplete = false;
  
  const segments = useSegments();

  useEffect(() => {
    // ✅ Oculta inmediatamente el splash de Expo
    SplashScreen.hideAsync();
    
    // ✅ Simula carga para mostrar tu splash personalizado
    const timer = setTimeout(() => {
      console.log("⏰ Terminando carga personalizada");
      setIsReady(true);
    }, 3000); // 3 segundos de tu splash personalizado

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return; // Solo navega cuando termine tu splash

    console.log("✅ Navegando a home");
    router.replace('/(public)/welcome');
  }, [isReady]);

  // ✅ FUERZA el splash personalizado
  if (!isReady) {
    console.log("🖼️ Mostrando CustomSplashScreen");
    return <CustomSplashScreen />;
  }

  // App normal
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