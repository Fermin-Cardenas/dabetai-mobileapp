// app/config/index.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

// Importar componentes core
import { Button } from '@/components/core/buttons';
import { Header } from '@/components/core/navigation/Header';

// Importar componentes específicos para Config
import {
  ConfigFooter,
  ConfigSection
} from '@/features/configuration/components';

const Configuration = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Definir las secciones del menú
  const menuSections = [
    {
      id: 'account',
      title: 'Mi cuenta',
      items: [
        { title: 'Detalles de la cuenta', route: '/config/account-details' },
        { title: 'Notificaciones', route: '/config/notifications' }
      ]
    },
    {
      id: 'health',
      title: 'Mi salud y tratamiento',
      items: [
        { title: 'Información médica', route: '/config/medical-info' },
        { title: 'Mi medicación habitual', route: '/config/medication' },
        { title: 'Mi médico', route: '/config/doctor' }
      ]
    },
    {
      id: 'devices',
      title: 'Dispositivos y aplicaciones',
      items: [
        { title: 'Gestionar mis dispositivos', route: '/config/devices' },
        { title: 'Gestionar mis aplicaciones', route: '/config/applications' }
      ]
    },
    {
      id: 'support',
      title: 'Soporte y ayuda',
      items: [
        { title: 'Preguntas frecuentes', route: '/config/faq' },
        { title: 'Contactar soporte', route: '/config/support' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      items: [
        { title: 'Términos y condiciones', route: '/(public)/tyc' },
        { title: 'Política de privacidad', route: '/(public)/privacy' }
      ]
    }
  ];

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  const handleDeleteAccount = () => {
    // Implementar lógica de eliminación de cuenta
    console.log('Eliminar cuenta...');
    router.push('/config/delete-account' as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#F1F5F9]">
        {/* Header */}
        <Header
          title="Configuración"
          showBackButton={true}
          onBackPress={handleGoBack}
        />
        
        {/* Content */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Secciones del menú */}
          {menuSections.map((section) => (
            <ConfigSection
              key={section.id}
              title={section.title}
              items={section.items}
              onItemPress={handleMenuPress}
            />
          ))}

          {/* Botón de eliminar cuenta */}
          <View className="px-4 pt-5 pb-5">
            <Button
              title="Eliminar cuenta"
              onPress={handleDeleteAccount}
              variant="outline"
              color="danger"
            />
          </View>

          {/* Footer */}
          <ConfigFooter />
        </ScrollView>
      </View>
    </>
  );
};

export default Configuration;