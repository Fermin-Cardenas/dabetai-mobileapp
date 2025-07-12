import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('ia chat');
  const router = useRouter();

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
      setMessage('');
    }
  };

  const NavButton = ({ title, isActive, onPress, iconName, route }) => {
    const handlePress = () => {
      setActiveTab(title.toLowerCase());
      if (route) {
        router.push(route);
      } else {
        onPress();
      }
    };

    return (
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={handlePress}
      >
        <View style={[styles.navIcon, isActive && styles.navIconActive]}>
          <MaterialIcons 
            name={iconName} 
            size={24} 
            color={isActive ? '#2196F3' : '#6B7280'} 
          />
        </View>
        <Text style={[styles.navText, isActive && styles.navTextActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMessageText = (text, hasLink, isAI) => {
    const textColor = isAI ? '#1F2937' : '#FFFFFF';
    
    if (hasLink && text.includes('aquí')) {
      const parts = text.split('aquí');
      return (
        <Text style={[styles.messageText, { color: textColor }]}>
          {parts[0]}
          <Text style={styles.linkText}>aquí</Text>
          {parts[1]}
        </Text>
      );
    }
    return <Text style={[styles.messageText, { color: textColor }]}>{text}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
    


      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.isAI ? styles.aiMessageRow : styles.userMessageRow]}>
              {msg.isAI && (
                <View style={styles.avatar}>
                  <Image 
                    source={require('../../src/assets/images/Shape.png')} // Ruta corregida
                    // source={{ uri: 'https://tu-url-de-imagen.com/bot-icon.png' }} // Para imagen de red
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                </View>
              )}
              
              {/* Message Bubble */}
              <View style={[
                styles.messageBubble,
                msg.isAI ? styles.aiBubble : styles.userBubble
              ]}>
                {renderMessageText(msg.text, msg.hasLink, msg.isAI)}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Haz una pregunta"
              placeholderTextColor="#9CA3AF"
              multiline
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
            >
              <MaterialIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>
            dai puede cometer errores. Verifica la información.
          </Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <NavButton 
            title="Inicio" 
            iconName="home"
          route="/Home/Home"
            isActive={activeTab === 'inicio'} 
            onPress={() => {}} 
          />
          <NavButton 
            title="Predicción" 
            iconName="view-in-ar"
          route="/Home/Prediction"
            isActive={activeTab === 'predicción'} 
            onPress={() => {}} 
          />
          <NavButton 
            title="Historial" 
            iconName="timeline"
            route="/Home/Record"
            isActive={activeTab === 'historial'} 
            onPress={() => {}} 
          />
          <NavButton 
            title="IA Chat" 
            iconName="smart-toy"
            isActive={activeTab === 'ia chat'} 
            onPress={() => {}} 
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  appName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  messagesContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  messageRow: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  aiMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  userMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  aiBubble: {
    backgroundColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: '#1E40AF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    paddingHorizontal: 4,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2196F3',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navIconActive: {
    backgroundColor: 'transparent',
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default AIChat;