import { Stack } from "expo-router";

export default function NotifyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Settings"
        options={{
          title: "Configuración",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Notify"
        options={{
          title: "Configuración",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Medicationalert"
        options={{
          title: "Recordatorios de medicación",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
       <Stack.Screen
        name="Glucosealert"
        options={{
          title: "Alertas de glucosa",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Predictionsalert"
        options={{
          title: "Alertas de predicción",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
       <Stack.Screen
        name="Devicealert"
        options={{
          title: "Alertas del dispositivo",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Dataregister"
        options={{
          title: "Recordatorio de registro de datos",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
       <Stack.Screen
        name="Devicelist"
        options={{
          title: "Mis dispositivos",
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}