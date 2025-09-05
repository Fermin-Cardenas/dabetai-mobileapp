import { Stack, useRouter } from "expo-router";
import { Image, View } from "react-native";

export default function PredictionLayout() {
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
        name="index"
        options={{
          headerShown: false,  // ← Agregar esta línea para quitar la barra blanca
          title: "",
          headerStyle: { 
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginLeft: 5, 
            }}>
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          // ✅ COMENTADO: HeaderRight con botones de settings y notifications
          // headerRight: () => (
          //   <View style={{ 
          //     flexDirection: 'row', 
          //     alignItems: 'center',
          //     gap: 16,
          //     marginRight: 16
          //   }}>
          //     <TouchableOpacity onPress={handleNotifications}>
          //       <Ionicons name="notifications-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //     <TouchableOpacity onPress={handleSettings}>
          //       <Ionicons name="settings-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
      
      
      <Stack.Screen
        name="nefropatia"
        options={{
          title: "",
          headerStyle: { 
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginLeft: 5, 
            }}>
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          // ✅ COMENTADO: HeaderRight con botones de settings y notifications
          // headerRight: () => (
          //   <View style={{ 
          //     flexDirection: 'row', 
          //     alignItems: 'center',
          //     gap: 16,
          //     marginRight: 16
          //   }}>
          //     <TouchableOpacity onPress={handleNotifications}>
          //       <Ionicons name="notifications-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //     <TouchableOpacity onPress={handleSettings}>
          //       <Ionicons name="settings-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
      <Stack.Screen
        name="chatai"
        options={{
          title: "",
          headerStyle: { 
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginLeft: 5, 
            }}>
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          // ✅ COMENTADO: HeaderRight con botones de settings y notifications
          // headerRight: () => (
          //   <View style={{ 
          //     flexDirection: 'row', 
          //     alignItems: 'center',
          //     gap: 16,
          //     marginRight: 16
          //   }}>
          //     <TouchableOpacity onPress={handleNotifications}>
          //       <Ionicons name="notifications-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //     <TouchableOpacity onPress={handleSettings}>
          //       <Ionicons name="settings-outline" size={24} color="white" />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
    </Stack>
  );
}