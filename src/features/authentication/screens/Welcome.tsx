// src/features/welcome/screens/WelcomeScreen.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonGroup } from '@/components/core/buttons';
import { TermsText } from "../components/TermsText";

export const WelcomeScreen = () => {
    const router = useRouter();

    const handleRegister = async () => {
        await AsyncStorage.clear();
        router.push('/(auth)/register');
    };

    const handleLogin = async () => {
        await AsyncStorage.clear();
        router.push('/(auth)/login');
    };

    const handleTermsPress = () => {
        router.push('/(public)/tyc');
    };

    const handlePrivacyPress = () => {
        router.push('/(public)/privacy');
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Contenedor principal */}
            <View className="flex flex-col min-h-screen items-center justify-center gap-6 pt-6 pr-4 pb-6 pl-4 relative bg-gray-100">
                
                {/* Frame superior con logos */}
                <View className="inline-flex justify-between flex-1 grow flex-col items-center relative">
                    
                    {/* Logo de texto dabetai */}
                    <View className="relative w-[206px] h-[66px] -mr-1">
                        <Image
                            className="w-full h-full"
                            source={require('@/assets/images/dabetai.png')}
                            resizeMode="contain"
                        />
                    </View>
                    
                    {/* Imagen del logo */}
                    <Image
                        className="relative w-[200px] h-[200px] object-cover"
                        source={require('@/assets/images/Logo.png')}
                        resizeMode="cover"
                    />
                </View>

                {/* Frame inferior con contenido */}
                <View className="flex justify-between flex-1 self-stretch w-full grow flex-col items-center relative">
                    
                    {/* Contenedor de título y botones */}
                    <View className="flex justify-center gap-6 self-stretch w-full flex-col items-center relative">
                        
                        {/* Título principal - SOLO CORREGIDO ESTE */}
                        <View className="w-[350px] h-[76px]">
                            <Text 
                                className="w-[350px] h-[76px] font-bold text-[#314157] text-3xl text-center"
                                style={{
                                    fontFamily: 'Source Sans Pro-Bold',
                                    letterSpacing: 0,
                                    // lineHeight removido para evitar error
                                }}
                            >
                                Monitorea tu diabetes con inteligencia artificial
                            </Text>
                        </View>
                        
                        {/* Grupo de botones */}
                        <View className="self-stretch w-full">
                            <ButtonGroup
                                align="stack"
                                buttonLabel="Registrarse"
                                buttonLabel1="Iniciar sesión"
                                onPrimaryPress={handleRegister}
                                onSecondaryPress={handleLogin}
                            />
                        </View>
                    </View>

                    {/* Términos y condiciones */}
                    <View className="relative self-stretch">
                        <Text className="text-center text-xs">
                            <Text className="text-slate-500">
                                Continúa solo si estás de acuerdo con nuestros{' '}
                            </Text>
                            <Text 
                                className="text-blue-700"
                                onPress={handleTermsPress}
                            >
                                Términos y condiciones
                            </Text>
                            <Text className="text-slate-500">
                                {' '}y nuestra{' '}
                            </Text>
                            <Text 
                                className="text-blue-700"
                                onPress={handlePrivacyPress}
                            >
                                Política de privacidad
                            </Text>
                            <Text className="text-slate-500">.</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};