// src/components/common/CustomSplashScreen.tsx

import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const CustomSplashScreen = () => {
  console.log("🚀 CustomSplashScreen se está renderizando");
  
  return (
    <View style={styles.container}>
      {/* Agrega texto temporal para confirmar que aparece */}
    
      
            <Image
        className="w-64 h-20 self-center"
        source={require("@/assets/images/logos/dabetai-splash.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
});