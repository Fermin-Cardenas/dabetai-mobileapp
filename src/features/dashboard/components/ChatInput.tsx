// src/features/chat/components/ChatInput.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Caption } from '@/components/common/Typography';
import Feather from '@expo/vector-icons/Feather';
interface ChatInputProps {
  message: string;
  onMessageChange: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disclaimer?: string;
}

export const ChatInput = ({ 
  message, 
  onMessageChange, 
  onSend, 
  placeholder = "Haz una pregunta",
  disclaimer = "dai puede cometer errores. Verifica la información."
}: ChatInputProps) => {
  const handleSend = () => {
    if (message.trim()) {
      onSend();
    }
  };

  return (
    <View className="px-4 py-4 bg-[#F8FAFC]">
      {/* Input wrapper */}
      <View className="flex-row items-end gap-3 mb-2">
        <TextInput
          className="flex-1 bg-[#F3F4F6] rounded-3xl px-4 py-3 text-base text-[#1F2937]"
          style={{ 
            maxHeight: 120, 
            minHeight: 44,
            textAlignVertical: 'top' 
          }}
          value={message}
          onChangeText={onMessageChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          blurOnSubmit={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          enablesReturnKeyAutomatically={true}
        />
        <TouchableOpacity
          className={`w-12 h-12 rounded-full justify-center items-center ${
            message.trim() ? 'bg-[#2196F3]' : 'bg-gray-300'
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
       
<Feather 
  name="send" 
  size={20} 
  color={message.trim() ? "white" : "#9CA3AF"} 
/>
        </TouchableOpacity>
      </View>
      
      {/* Disclaimer */}
      <Caption className="text-gray-400 px-1">
        {disclaimer}
      </Caption>
    </View>
  );
};