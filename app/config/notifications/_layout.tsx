import { Stack } from 'expo-router';

export default function NotificationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="data-reminders" />
      <Stack.Screen name="device-alerts" />
      <Stack.Screen name="glucose-alerts" />
      <Stack.Screen name="index"/>
      <Stack.Screen name="medication-reminders" />
      <Stack.Screen name="prediction-alerts" />
    </Stack>
  );
}