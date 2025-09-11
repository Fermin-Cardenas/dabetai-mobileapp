import { Stack } from "expo-router";

export default function PredictionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="[complication]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}