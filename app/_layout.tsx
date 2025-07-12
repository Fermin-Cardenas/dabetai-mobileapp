// app/_layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { useState } from 'react';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false, // Oculta headers globalmente
        }}
      >
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}