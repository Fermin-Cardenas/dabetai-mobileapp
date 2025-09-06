// src/hooks/useTabNavigation.tsx
import Feather from '@expo/vector-icons/Feather';
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
    icon: <Feather name="home" />,
    route: '/(tabs)/home'
  },
  {
    id: 'prediccion',
    title: 'Predicción',
    icon: <Feather name="box" />,
    route: '/(tabs)/retinopatia'
  },
  {
    id: 'historial',
    title: 'Historial',
    icon: <Feather name="activity" />,
    route: '/(tabs)/record'
  },
  {
    id: 'ia-chat',
    title: 'IA Chat',
    icon: <Feather name="message-square" />,
    route: '/(tabs)/chatai'
  }
];

export const useTabNavigation = (initialTab: string = 'inicio') => {
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