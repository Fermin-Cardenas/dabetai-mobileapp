import { Stack } from 'expo-router';

export default function ConfigLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account-details" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="index" />
      <Stack.Screen name="medic-info"/>
      <Stack.Screen name="medication" />
      <Stack.Screen name="support" />
    </Stack>
  );
}