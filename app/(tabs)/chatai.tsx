// app/(tabs)/chatai.tsx
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// Importar layout estándar
import { AppLayout } from "@/components/layouts";

// Importar componentes core
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/core/buttons";
import { InputField } from "@/components/core/inputs";

// Importar componentes del chat
import { ChatBubble } from "@/components/common/ChatBubble";

// Importar componentes de texto
import { Caption } from "@/components/common/Typography";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  // Datos de mensajes
  const messages = [
    {
      id: 1,
      isAI: true,
      text: "Hola, soy dai. Tu asistente de inteligencia artificial. ¿Qué puedo hacer por ti hoy?",
    },
    {
      id: 2,
      isAI: false,
      text: "¿Cuáles fueron mis niveles de glucosa el 17 de mayo de 12:00 pm a 6:00 pm?",
    },
    {
      id: 3,
      isAI: true,
      text: "Según tu Accu Check, tus rangos de glucosa se mantuvieron constantes en 165 mg/dL durante las seis horas.",
    },
    {
      id: 4,
      isAI: false,
      text: "¿Cuál era mi riesgo de padecer retinopatía hace un mes?",
    },
    {
      id: 5,
      isAI: true,
      text: "La predicción realizada el 18 de abril a las 3:45 pm, indica que tu riesgo de padecer retinopatía era moderado. Puedes hacer clic aquí para acceder a la predicción completa.",
    },
    {
      id: 6,
      isAI: false,
      text: "¿Podrías darme algunas recomendaciones para mejorar mi control glucémico?",
    },
    {
      id: 7,
      isAI: true,
      text: "Por supuesto. Basándome en tus datos recientes, te recomiendo: 1) Mantener horarios regulares de comida, 2) Incrementar ligeramente tu actividad física, 3) Monitorear tu glucosa después de las comidas principales, y 4) Considerar ajustar las porciones de carbohidratos.",
    },
    {
      id: 8,
      isAI: false,
      text: "¿Qué ejercicios me recomiendas específicamente?",
    },
    {
      id: 9,
      isAI: true,
      text: "Te recomiendo ejercicios aeróbicos de intensidad moderada como caminar enérgicamente 30 minutos al día, natación, o ciclismo. También son beneficiosos los ejercicios de resistencia 2-3 veces por semana. Siempre consulta con tu médico antes de cambiar tu rutina de ejercicios.",
    },
    {
      id: 10,
      isAI: false,
      text: "Perfecto, gracias por la ayuda",
    },
    {
      id: 11,
      isAI: true,
      text: "¡De nada! Estoy aquí para ayudarte en tu manejo de la diabetes. ¿Hay algo más en lo que pueda asistirte?",
    },
  ];

  // Scroll automático cuando se añaden mensajes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      // Aquí se manejaría el envío del mensaje
      console.log("Enviando mensaje:", message);
      setMessage("");
    }
  };

  return (
    <AppLayout activeTab="chatai" scrollable={false}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="flex-1">
          {/* Los mensajes van dentro de un ScrollView flexible */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Caption className="!text-gray-500 text-center mb-4">
              dai puede cometer errores. Verifica la información.
            </Caption>

            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                id={message.id}
                message={message.text}
                type={message.isAI ? "recipient" : "sender"}
                avatarSource={
                  message.isAI
                    ? require("@/assets/images/icons/chat-avatar.png")
                    : undefined
                }
              />
            ))}
          </ScrollView>

          {/* Input fijo en la parte inferior */}
          <View className="flex-row items-end gap-3 pt-4">
            <View className="flex-1">
              <InputField
                value={message}
                onChangeText={setMessage}
                placeholder="Haz una pregunta"
                multiline={true}
                minLines={1}
                maxLines={6}
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
            </View>

            <Button
              variant="fill"
              color="primary"
              onPress={handleSend}
              disabled={!message.trim()}
              icon={<Icon name="send" size={24} />}
              iconPosition="only"
              circular
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppLayout>
  );
};

export default AIChat;
