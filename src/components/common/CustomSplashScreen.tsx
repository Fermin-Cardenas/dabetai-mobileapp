// Crea este archivo si no lo tienes:
// src/components/common/CustomSplashScreen.tsx

import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/dabetai3.png")}
        style={styles.logo}
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
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "System", // Cambiado a fuente del sistema por compatibilidad
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  logo: {
    width: 200,
    height: 100,
  },
});
