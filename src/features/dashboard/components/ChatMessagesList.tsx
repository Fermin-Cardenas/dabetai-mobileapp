// src/features/chat/components/ChatMessagesList.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { ChatMessage } from './ChatMessage';

interface MessageData {
  id: number;
  isAI: boolean;
  text: string;
  hasLink?: boolean;
}

interface ChatMessagesListProps {
  messages: MessageData[];
  onLinkPress?: (messageId: number) => void;
  className?: string;
}

export const ChatMessagesList = ({ messages, onLinkPress, className }: ChatMessagesListProps) => {
  return (
    <ScrollView 
      className={`flex-1 pt-4 pb-4 ${className || ''}`}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          isAI={message.isAI}
          text={message.text}
          hasLink={message.hasLink}
          onLinkPress={() => onLinkPress?.(message.id)}
        />
      ))}
    </ScrollView>
  );
};