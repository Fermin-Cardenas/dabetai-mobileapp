// src/hooks/useTabNavigation.tsx
import { Icon } from '@/components/common/Icon';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export interface NavigationItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  route?: string;
}

export const TAB_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    icon: <Icon name="home" />,
    route: '/(tabs)/home'
  },
  {
    id: 'historial',
    title: 'Historial',
    icon: <Icon name="record" />,
    route: '/(tabs)/record'
  },
  {
    id: 'prediccion',
    title: 'Predicción',
    icon: <Icon name="activity" />,
    route: '/(tabs)/prediction'
  },
  {
    id: 'chatai',
    title: 'Asistente',
    icon: <Icon name="chat" />,
    route: '/(tabs)/chatai'
  }
];export const useTabNavigation = (initialTab: string = 'inicio') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    const item = TAB_NAVIGATION_ITEMS.find(item => item.id === tabId);
    if (item?.route) {
      router.push(item.route as any);
    }
  };

  const navigationItems = TAB_NAVIGATION_ITEMS.map(item => ({
    ...item,
    onPress: () => handleNavigation(item.id)
  }));

  return {
    activeTab,
    navigationItems,
    handleNavigation
  };
};