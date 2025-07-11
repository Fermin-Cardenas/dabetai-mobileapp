import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeLayout() {
  const router = useRouter();

  // ✅ COMENTADO: Funciones de settings y notifications
  // const handleSettings = () => {
  //   router.push('/Config/Settings'); // Cambia por la ruta que necesites
  // };

  // const handleNotifications = () => {
  //   router.push('/Notify/Notification'); // Cambia por la ruta que necesites
  // };

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