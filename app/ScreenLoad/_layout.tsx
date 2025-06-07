import { Stack } from "expo-router";

export default function ScreenLoadLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Load"
        options={{
          title: "",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerShown: false,
          headerBackVisible: false,
        }}
      />
       <Stack.Screen
        name="tyc"
        options={{
          title: "Términos y condiciones",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: "Política de privacidad",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
    
  );
}
