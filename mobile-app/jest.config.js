module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    "@testing-library/react-native/dist/preset"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|expo-router|react-redux|@react-native|react-native-reanimated|react-native-gesture-handler)/)"
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
};
