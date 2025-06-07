import { Stack } from "expo-router";

export default function DevicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Devicefind"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      
      />
      <Stack.Screen
        name="Devicefindcom"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      
      />
      <Stack.Screen
        name="Deviceselect"
     options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Devicesinc"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
   
      <Stack.Screen
        name="Devicesincom"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Devicetrans"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Devicetranscom"
         options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      
      <Stack.Screen
        name="Typeselect"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
       <Stack.Screen
        name="Deviceconect"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: '#f1f5f9',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}