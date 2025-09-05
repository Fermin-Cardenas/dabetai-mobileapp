// src/components/common/CustomSplashScreen.tsx

import React from "react";
import { Image, View } from "react-native";

export const CustomSplashScreen = () => {
  console.log("🚀 CustomSplashScreen se está renderizando");
  
  return (
    <View className="flex-1 bg-primary-500 justify-center items-center">
      <Image
        className="w-64 h-20 self-center"
        source={require("@/assets/images/logos/dabetai-splash.png")}
        resizeMode="contain"
      />
    </View>
  );
};