module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|expo-router|react-redux|@react-native|react-native-reanimated|react-native-gesture-handler|react-native-css-interop)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jsdom",
  globals: {
    __DEV__: true,
  },
};