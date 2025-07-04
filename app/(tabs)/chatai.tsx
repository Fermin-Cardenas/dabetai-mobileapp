// app/(tabs)/chatai.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Importar componentes core
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { NavButton } from '@/features/dashboard/components/NavButton';

// Importar componentes del chat
import { 
  ChatMessagesList,
  ChatInput 
} from '@/features/dashboard/components';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('ia chat');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const router = useRouter();

  // Listener para el teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Datos de mensajes
  const messages = [
    {
      id: 1,
      isAI: true,
      text: "Hola, soy dai. Tu asistente de inteligencia artificial. ¿Qué puedo hacer por ti hoy?"
    },
    {
      id: 2,
      isAI: false,
      text: "¿Cuáles fueron mis niveles de glucosa el 17 de mayo de 12:00 pm a 6:00 pm?"
    },
    {
      id: 3,
      isAI: true,
      text: "Según tu Accu Check, tus rangos de glucosa se mantuvieron constantes en 165 mg/dL durante las seis horas."
    },
    {
      id: 4,
      isAI: false,
      text: "¿Cuál era mi riesgo de padecer retinopatía hace un mes?"
    },
    {
      id: 5,
      isAI: true,
      text: "La predicción realizada el 18 de abril a las 3:45 pm, indica que tu riesgo de padecer retinopatía era moderado. Puedes hacer clic aquí para acceder a la predicción completa.",
      hasLink: true
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Aquí se manejaría el envío del mensaje
      console.log('Enviando mensaje:', message);
      setMessage('');
    }
  };

  const handleLinkPress = (messageId: number) => {
    console.log('Link presionado en mensaje:', messageId);
    // Aquí se manejaría la navegación al enlace
  };

  const handleNotifications = () => {
    console.log('Abriendo notificaciones...');
  };

  const handleSettings = () => {
    console.log('Abriendo configuración...');
  };

  const handleNavigation = (tab: string, route?: string) => {
    setActiveTab(tab.toLowerCase());
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView className="flex-1 bg-[#F8FAFC]">
        {/* Header */}
        <DashboardHeader 
          onNotificationPress={handleNotifications}
          onSettingsPress={handleSettings}
        />

        {/* Chat Container */}
        <View className="flex-1">
          <KeyboardAvoidingView 
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
          >
            {/* Lista de mensajes */}
            <ChatMessagesList 
              messages={messages}
              onLinkPress={handleLinkPress}
            />

            {/* Input de chat */}
            <ChatInput 
              message={message}
              onMessageChange={setMessage}
              onSend={handleSend}
            />

            {/* Spacer dinámico para Android - SOLO cuando el teclado está abierto */}
            {Platform.OS === 'android' && keyboardHeight > 0 && (
              <View style={{ height: keyboardHeight - 15 }} />
            )}
          </KeyboardAvoidingView>
        </View>

        {/* Navegación inferior - SOLO visible cuando el teclado está cerrado */}
        {keyboardHeight === 0 && (
          <View 
            className="bg-white border-t border-gray-200 flex-row shadow-lg self-center"
            style={{ width: 375, height: 67 }}
          >
            <NavButton
                      title="Inicio"
                      iconName="home"
                      isActive={activeTab === 'inicio'}
            onPress={() => handleNavigation('home', '/(tabs)/home')}
                    />
                    <NavButton
                      title="Predicción"
                      iconName="box"
                      isActive={activeTab === 'predicción'}
                      onPress={() => handleNavigation('predicción', '/(tabs)/prediction')}
                    />
                    <NavButton
                      title="Historial"
                      iconName="activity"
                      isActive={activeTab === 'historial'}
                      onPress={() => handleNavigation('historial', '/(tabs)/record')}
                    />
                    <NavButton
                      title="IA Chat"
                      iconName="codesandbox"
                      isActive={activeTab === 'ia chat'}
                      onPress={() => handleNavigation('ia chat', '/(tabs)/chatai')}
                    />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default AIChat;