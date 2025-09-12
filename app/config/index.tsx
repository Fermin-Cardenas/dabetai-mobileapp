// app/config/index.tsx
import { useRouter } from "expo-router";
import React from "react";

// Importar componentes core
import { Caption } from "@/components/common/Typography";
import { Button } from "@/components/core/buttons";
import { CardList } from "@/components/core/cards";
import { AppLayout } from "@/components/layouts/AppLayout";

const Configuration = () => {
  const router = useRouter();

  // Definir las secciones del menú
  const menuSections = [
    {
      id: "account",
      title: "Mi cuenta",
      items: [
        { 
          id: "account-details",
          type: "button" as const,
          title: "Detalles de la cuenta", 
          buttonType: "chevron" as const,
          route: "/config/account-details" 
        },
        { 
          id: "notifications",
          type: "button" as const,
          title: "Notificaciones", 
          buttonType: "chevron" as const,
          route: "/config/notifications" 
        },
      ],
    },
    {
      id: "health",
      title: "Mi salud y tratamiento",
      items: [
        { 
          id: "medical-info",
          type: "button" as const,
          title: "Información médica", 
          buttonType: "chevron" as const,
          route: "/config/medical-info" 
        },
        { 
          id: "medication",
          type: "button" as const,
          title: "Mi medicación habitual", 
          buttonType: "chevron" as const,
          route: "/config/medication" 
        },
        { 
          id: "doctor",
          type: "button" as const,
          title: "Mi médico", 
          buttonType: "chevron" as const,
          route: "/config/doctor" 
        },
      ],
    },
    {
      id: "devices",
      title: "Dispositivos y aplicaciones",
      items: [
        { 
          id: "devices",
          type: "button" as const,
          title: "Gestionar mis dispositivos", 
          buttonType: "chevron" as const,
          route: "/config/devices" 
        },
        { 
          id: "applications",
          type: "button" as const,
          title: "Gestionar mis aplicaciones", 
          buttonType: "chevron" as const,
          route: "/config/applications" 
        },
      ],
    },
    {
      id: "support",
      title: "Soporte y ayuda",
      items: [
        { 
          id: "faq",
          type: "button" as const,
          title: "Preguntas frecuentes", 
          buttonType: "chevron" as const,
          route: "/config/faq" 
        },
        { 
          id: "support",
          type: "button" as const,
          title: "Contactar soporte", 
          buttonType: "chevron" as const,
          route: "/config/support" 
        },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      items: [
        { 
          id: "tyc",
          type: "button" as const,
          title: "Términos y condiciones", 
          buttonType: "chevron" as const,
          route: "/(public)/tyc" 
        },
        { 
          id: "privacy",
          type: "button" as const,
          title: "Política de privacidad", 
          buttonType: "chevron" as const,
          route: "/(public)/privacy" 
        },
      ],
    },
  ];

  const handleMenuPress = (item: any) => {
    router.push(item.route as any);
  };

  const handleLogout = () => {
    // Implementar lógica de cerrar sesión
    console.log('Cerrar sesión...');
    // Aquí iría la lógica para limpiar tokens, AsyncStorage, etc.
    router.push('/(public)/welcome' as any);
  };

  const handleDeleteAccount = () => {
    // Implementar lógica de eliminación de cuenta
    console.log('Eliminar cuenta...');
    router.push('/config/delete-account' as any);
  };

  return (
    <AppLayout
      title="Configuración"
      headerVariant="section"
      activeTab="configuracion"
      scrollable={true}
      showNavigation={false}
    >
      {/* Secciones del menú */}
      {menuSections.map((section) => (
        <CardList
          key={section.id}
          title={section.title}
          items={section.items}
          onItemPress={handleMenuPress}
        />
      ))}

        {/* Botón de cerrar sesión - Acción más común */}
        <Button
          title="Cerrar sesión"
          onPress={handleLogout}
          variant="outline"
          color="secondary"
        />

      {/* Footer */}
        <Caption className="!text-gray-500 text-center">
          © 2025 dabetai. Todos los derechos reservados.
        </Caption>
    </AppLayout>
  );
};

export default Configuration;
