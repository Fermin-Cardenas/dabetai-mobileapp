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
          headerShown: false,
          title: "",
          headerStyle: { 
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <View className="flex-row items-center ml-1">
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{ width: 104, height: 24 }}
                resizeMode="contain"
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
            <View className="flex-row items-center ml-1">
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{ width: 104, height: 24 }}
                resizeMode="contain"
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
            <View className="flex-row items-center ml-1">
              <Image 
                source={require('@/assets/images/logos/dabetai-compact.png')} 
                style={{ width: 104, height: 24 }}
                resizeMode="contain"
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