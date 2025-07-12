import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function HomeLayout() {
  const router = useRouter();

  const handleSettings = () => {
    router.push('/Config/Settings'); // Cambia por la ruta que necesites
  };

  const handleNotifications = () => {
    router.push('/Notify/Notification'); // Cambia por la ruta que necesites
  };

  return (
    <Stack>
      <Stack.Screen
        name="Home"
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
                source={require('../../src/assets/images/logo3.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 16,
              marginRight: 16
            }}>
              <TouchableOpacity onPress={handleNotifications}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettings}>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Specificp"
        options={{
          title: "Nefropatía diabética",
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerShadowVisible: false, // iOS + Android: elimina sombra
          headerTintColor: '#fff',
          
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="Prediction"
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
                source={require('../../src/assets/images/logo3.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 16,
              marginRight: 16
            }}>
              <TouchableOpacity onPress={handleNotifications}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettings}>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Record"
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
                source={require('../../src/assets/images/logo3.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 16,
              marginRight: 16
            }}>
              <TouchableOpacity onPress={handleNotifications}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettings}>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Chatai"
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
                source={require('../../src/assets/images/logo3.png')} 
                style={{
                  width: 104,  // Aumentado para que coincida con tu referencia
                  height: 24,  // Aumentado proporcionalmente
                  resizeMode: 'contain'
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 16,
              marginRight: 16
            }}>
              <TouchableOpacity onPress={handleNotifications}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettings}>
                <Ionicons name="settings-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}