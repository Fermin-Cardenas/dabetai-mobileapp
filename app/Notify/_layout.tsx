import { Stack } from "expo-router";

export default function NotifyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Notification"
        options={{
          title: "Notificaciones",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}