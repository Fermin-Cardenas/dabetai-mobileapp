// src/features/chat/components/ChatMessage.tsx
import { Body } from '@/components/common/Typography';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface ChatMessageProps {
  id: number;
  isAI: boolean;
  text: string;
  hasLink?: boolean;
  onLinkPress?: () => void;
}

export const ChatMessage = ({ id, isAI, text, hasLink, onLinkPress }: ChatMessageProps) => {
  const renderMessageText = () => {
    const textColor = isAI ? '#1F2937' : '#FFFFFF';
    
    if (hasLink && text.includes('aquí')) {
      const parts = text.split('aquí');
      return (
        <View className="flex-row flex-wrap">
          <Body className="text-sm leading-5" style={{ color: textColor }}>
            {parts[0]}
          </Body>
          <TouchableOpacity onPress={onLinkPress}>
            <Body className="text-sm leading-5 text-[#1E40AF] underline font-semibold">
              aquí
            </Body>
          </TouchableOpacity>
          <Body className="text-sm leading-5" style={{ color: textColor }}>
            {parts[1]}
          </Body>
        </View>
      );
    }
    
    return (
      <Body className="text-sm leading-5" style={{ color: textColor }}>
        {text}
      </Body>
    );
  };

  return (
    <View className={`mb-4 px-4 ${isAI ? 'flex-row items-start gap-3' : 'flex-row justify-end'}`}>
      {isAI && (
                <View className="w-8 h-8 bg-blue-500 rounded-full mr-3 justify-center items-center overflow-hidden">
          <Image 
            className="w-6 h-6"
            source={require('@/assets/images/icons/chat-avatar.png')}
            resizeMode="contain"
          />
        </View>
      )}
      
      <View 
        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          isAI 
            ? 'bg-[#E5E7EB] rounded-bl-sm' 
            : 'bg-[#2196F3] rounded-br-sm'
        }`}
      >
        {renderMessageText()}
      </View>
    </View>
  );
};