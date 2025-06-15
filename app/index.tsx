// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  // useEffect(() => {
  //   router.replace('/splash');
  // }, []);

  // El splash ya se maneja directamente en el archivo app/_layout.tsx

  return null; // No renderiza nada
}