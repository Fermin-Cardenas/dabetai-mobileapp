// app/(tabs)/chatai.tsx
import { Stack } from 'expo-router';
import React, { useState } from 'react';

// Importar layout del chat
import { ChatLayout } from '@/components/layouts';

// Importar componentes del chat
import {
  ChatInput,
  ChatMessagesList
} from '@/features/dashboard/components';

const AIChat = () => {
  const [message, setMessage] = useState('');

  // Datos de mensajes
  const messages = [
    {
      id: 1,
      isAI: true,
      text: "Hola, soy dai. Tu asistente de inteligencia artificial. ¿Qué puedo hacer por ti hoy?"
    },
    {
      id: 2,
      isAI: false,
      text: "¿Cuáles fueron mis niveles de glucosa el 17 de mayo de 12:00 pm a 6:00 pm?"
    },
    {
      id: 3,
      isAI: true,
      text: "Según tu Accu Check, tus rangos de glucosa se mantuvieron constantes en 165 mg/dL durante las seis horas."
    },
    {
      id: 4,
      isAI: false,
      text: "¿Cuál era mi riesgo de padecer retinopatía hace un mes?"
    },
    {
      id: 5,
      isAI: true,
      text: "La predicción realizada el 18 de abril a las 3:45 pm, indica que tu riesgo de padecer retinopatía era moderado. Puedes hacer clic aquí para acceder a la predicción completa.",
      hasLink: true
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Aquí se manejaría el envío del mensaje
      console.log('Enviando mensaje:', message);
      setMessage('');
    }
  };

  const handleLinkPress = (messageId: number) => {
    console.log('Link presionado en mensaje:', messageId);
    // Aquí se manejaría la navegación al enlace
  };

  return (
    <>
      <ChatLayout title="IA Chat" activeTab="ia-chat">
        {/* Lista de mensajes */}
        <ChatMessagesList 
          messages={messages}
          onLinkPress={handleLinkPress}
        />

        {/* Input de chat */}
        <ChatInput 
          message={message}
          onMessageChange={setMessage}
          onSend={handleSend}
        />
      </ChatLayout>
    </>
  );
};

export default AIChat;