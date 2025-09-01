// src/features/welcome/screens/WelcomeScreen.tsx
import { Button, ButtonGroup } from '@/components/core/buttons';
import { TermsText } from '@/features/authentication/components/TermsText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Welcome() {
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
                        
                        {/* Título principal */}
                        <View className="w-[350px] h-[76px]">
                            <Text 
                                className="w-[350px] h-[76px] font-bold text-[#314157] text-center"
                                style={{
                                    fontFamily: 'Source Sans Pro-Bold',
                                    letterSpacing: 0,
                                    fontSize: 28,
                                }}
                            >
                                Monitorea tu diabetes con inteligencia artificial
                            </Text>
                        </View>
                        
                        {/* Grupo de botones */}
                        <View className="self-stretch w-full">
                            <ButtonGroup align="stack">
                                <Button
                                    title="Registrarse"
                                    onPress={handleRegister}
                                    variant="fill"
                                    color="primary"
                                />
                                <Button
                                    title="Iniciar sesión"
                                    onPress={handleLogin}
                                    variant="outline"
                                    color="primary"
                                />
                            </ButtonGroup>
                        </View>
                    </View>

                    {/* Términos y condiciones */}
<View className="relative self-stretch">
    <TermsText 
        onTermsPress={handleTermsPress}
        onPrivacyPress={handlePrivacyPress}
    />
</View>
                </View>
            </View>
        </>
    );
}