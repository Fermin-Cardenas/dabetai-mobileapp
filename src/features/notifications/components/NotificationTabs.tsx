// src/features/notifications/components/NotificationTabs.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface NotificationTabsProps {
  activeTab: 'no-leidas' | 'leidas';
  onTabChange: (tab: 'no-leidas' | 'leidas') => void;
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'no-leidas' as const, title: 'No leídas' },
    { id: 'leidas' as const, title: 'Leídas' },
  ];

  return (
    <View className="flex-row px-4 pt-4 pb-2 gap-3">
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.id}
          className={`flex-1 py-3 rounded-full border items-center ${
            activeTab === tab.id 
              ? 'bg-[#2196F3] border-[#2196F3]' 
              : 'bg-white border-[#E5E7EB]'
          }`}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.8}
        >
          <Body className={`text-sm font-medium ${
            activeTab === tab.id ? 'text-white font-semibold' : 'text-[#6B7280] font-medium'
          }`}>
            {tab.title}
          </Body>
        </TouchableOpacity>
      ))}
    </View>
  );
};
