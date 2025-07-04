// src/features/notifications/components/NotificationPreferencesSection.tsx
import React from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { NotificationPreferenceItem } from './NotificationPreferenceItem';

interface NotificationPreference {
  id: string;
  title: string;
  enabled: boolean;
}

interface NotificationPreferencesSectionProps {
  title: string;
  preferences: NotificationPreference[];
  onPreferenceChange: (preferenceId: string, newValue: boolean) => void;
}

export const NotificationPreferencesSection: React.FC<NotificationPreferencesSectionProps> = ({
  title,
  preferences,
  onPreferenceChange
}) => {
  return (
    <View>
      {/* Section Header */}
      <View className="px-4 pt-5 pb-2">
        <H2 className="text-[#314158] font-bold text-lg">
          {title}
        </H2>
      </View>
      
      {/* Preference Items */}
      <View className="bg-white mb-0.5">
        {preferences.map((preference, index) => (
          <NotificationPreferenceItem
            key={preference.id}
            title={preference.title}
            value={preference.enabled}
            onValueChange={(newValue) => onPreferenceChange(preference.id, newValue)}
            isLast={index === preferences.length - 1}
          />
        ))}
      </View>
    </View>
  );
};