const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add missing env resolution
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
  resolver: {
    extraNodeModules: {
      "expo-router": require.resolve("expo-router"),
    },
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
