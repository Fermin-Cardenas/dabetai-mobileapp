// src/features/notifications/components/AlertSection.tsx
import React from 'react';
import { View } from 'react-native';
import { H2 } from '@/components/common/Typography';
import { AlertItem } from './AlertItem';

interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
}

interface AlertSectionProps {
  title: string;
  alerts: AlertConfig[];
  onAlertChange: (alertId: string, newValue: boolean) => void;
}

export const AlertSection: React.FC<AlertSectionProps> = ({
  title,
  alerts,
  onAlertChange
}) => {
  return (
    <View>
      {/* Section Header */}
      <View className="px-4 pt-5 pb-2">
        <H2 className="text-[#314158] font-bold text-lg">
          {title}
        </H2>
      </View>
      
      {/* Alert Items */}
      <View className="bg-white mb-0.5">
        {alerts.map((alert, index) => (
          <AlertItem
            key={alert.id}
            title={alert.title}
            subtitle={alert.subtitle}
            value={alert.enabled}
            onValueChange={(newValue) => onAlertChange(alert.id, newValue)}
            isLast={index === alerts.length - 1}
          />
        ))}
      </View>
    </View>
  );
};