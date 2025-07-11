// src/features/notifications/components/NotificationItem.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Body } from '@/components/common/Typography';

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  type: 'glucose' | 'alert' | 'reminder' | 'device' | 'glucose-low';
  isUnread: boolean;
  isLast?: boolean;
  onPress?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  time,
  type,
  isUnread,
  isLast = false,
  onPress
}) => {
  return (
    <TouchableOpacity 
      className={`px-4 py-4 ${!isLast ? 'border-b border-[#F3F4F6]' : ''}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start">
        {/* Contenido izquierdo */}
        <View className="flex-1 flex-row items-start">
          {/* Indicador de no leída */}
          <View className="w-3 h-3 justify-center items-center mr-3 mt-1">
            {isUnread && (
              <View className="w-2 h-2 rounded-full bg-[#2196F3]" />
            )}
          </View>
          
          {/* Texto de la notificación */}
          <View className="flex-1">
            <Body className={`text-[15px] mb-1 ${
              isUnread 
                ? 'text-[#1F2937] font-semibold' 
                : 'text-[#6B7280] font-medium'
            }`}>
              {title}
            </Body>
            <Body className={`text-[13px] leading-[18px] ${
              isUnread 
                ? 'text-[#374151]' 
                : 'text-[#9CA3AF]'
            }`}>
              {description}
            </Body>
          </View>
        </View>
        
        {/* Tiempo */}
        <Body className={`text-[12px] ml-2 text-right min-w-[70px] ${
          isUnread 
            ? 'text-[#6B7280]' 
            : 'text-[#D1D5DB]'
        }`}>
          {time}
        </Body>
      </View>
    </TouchableOpacity>
  );
};
