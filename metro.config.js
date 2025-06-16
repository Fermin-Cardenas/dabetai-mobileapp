const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// ⭐ Agrega el alias para @ sin romper NativeWind
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

// Mantén NativeWind funcionando
module.exports = withNativeWind(config, { input: './global.css' });