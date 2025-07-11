// src/features/dashboard/components/HorizontalTabs.tsx
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface TabItem {
  id: string;
  title: string;
}

interface HorizontalTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 pt-4 mb-5"
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.id}
          className={`px-5 py-2.5 mr-3 rounded-full border min-w-[120px] items-center ${
            activeTab === tab.id 
              ? 'bg-[#2196F3] border-[#2196F3]' 
              : 'bg-white border-[#E5E7EB]'
          }`}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.8}
        >
          <Body className={`text-sm ${
            activeTab === tab.id 
              ? 'text-white font-semibold' 
              : 'text-[#6B7280] font-medium'
          }`}>
            {tab.title}
          </Body>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};