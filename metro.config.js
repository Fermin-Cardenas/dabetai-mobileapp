const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// ⭐ Configurar alias más específicos para que Metro resuelva correctamente
config.resolver.alias = {
  // Específico para assets - debe ir ANTES del genérico
  '@/assets': path.resolve(__dirname, 'assets'),
  // Genérico para src
  '@': path.resolve(__dirname, 'src'),
};

// Agregar a watchFolders para asegurar que Metro vigile los assets
config.watchFolders = [
  path.resolve(__dirname, 'assets'),
  path.resolve(__dirname, 'src'),
];

// Mantén NativeWind funcionando
module.exports = withNativeWind(config, { input: './global.css' });