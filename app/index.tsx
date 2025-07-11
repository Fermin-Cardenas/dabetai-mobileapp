import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // Este archivo redirige automáticamente al layout principal
  // El _layout.tsx se encarga de decidir a dónde ir
  return <Redirect href="/(auth)/login" />;
}