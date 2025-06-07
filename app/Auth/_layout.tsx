import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Login"
        options={{
          title: "Iniciar Sesión",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          title: "Registrarse",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}
