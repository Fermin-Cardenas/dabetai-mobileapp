import { Stack, useRouter } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,  // ← Deshabilitar header para home también
        }}
      />
      
      <Stack.Screen
        name="prediction"
        options={{
          headerShown: false,  // ← Deshabilitar header para prediction
        }}
      />
      
      <Stack.Screen
        name="record"
        options={{
          headerShown: false,  // ← Deshabilitar header para record también
        }}
      />
      
      <Stack.Screen
        name="chatai"
        options={{
          headerShown: false,  // ← Deshabilitar header para chatai también
        }}
      />
    </Stack>
  );
}