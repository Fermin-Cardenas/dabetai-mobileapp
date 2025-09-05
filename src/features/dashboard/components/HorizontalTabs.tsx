// src/features/dashboard/components/HorizontalTabs.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

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
      className="px-4 pt-4 mb-5 pr-4"
    >
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.id}
          className={`px-5 py-2.5 mr-3 rounded-full border min-w-[120px] items-center ${
            activeTab === tab.id 
              ? 'bg-primary-500 border-primary-500' 
              : 'bg-white border-gray-200'
          }`}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.8}
        >
          <Body className={`text-sm ${
            activeTab === tab.id 
              ? 'text-white font-semibold' 
              : 'text-gray-500 font-medium'
          }`}>
            {tab.title}
          </Body>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};