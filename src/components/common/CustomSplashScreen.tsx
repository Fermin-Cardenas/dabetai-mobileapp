// src/components/common/CustomSplashScreen.tsx

import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export const CustomSplashScreen = () => {
  console.log("🚀 CustomSplashScreen se está renderizando");
  
  return (
    <View style={styles.container}>
      {/* Agrega texto temporal para confirmar que aparece */}
    
      
      <Image
        source={require("../../assets/images/dabetai3.png")}
        style={styles.logo}
        resizeMode="contain"
        onError={(error) => console.log("❌ Error cargando imagen:", error)}
        onLoad={() => console.log("✅ Imagen cargada correctamente")}
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