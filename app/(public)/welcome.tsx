// src/features/welcome/screens/WelcomeScreen.tsx
import { H1 } from '@/components/common/Typography';
import { Button, ButtonGroup } from '@/components/core/buttons';
import { TermsText } from '@/features/authentication/components/TermsText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

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
                                        <View className="items-center mb-8">
                            <Image
                                className="w-48 h-16 mb-2"
                                source={require('@/assets/images/logos/dabetai-main.png')}
                                resizeMode="contain"
                            />
                        </View>

                        <Image
                            className="w-16 h-12"
                            source={require('@/assets/images/logos/brand-logo.png')}
                            resizeMode="contain"
                        />

                {/* Frame inferior con contenido */}
                <View className="flex justify-between flex-1 self-stretch w-full grow flex-col items-center relative">
                    
                    {/* Contenedor de título y botones */}
                    <View className="flex justify-center gap-6 self-stretch w-full flex-col items-center relative">
                        
                        {/* Título principal */}
                        <View className="w-[350px] h-[76px]">
                            <H1 
                                className="w-[350px] h-[76px] font-bold text-gray-700 text-center"
                            >
                                Monitorea tu diabetes con inteligencia artificial
                            </H1>
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