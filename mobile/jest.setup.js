import '@testing-library/jest-native/extend-expect';
import 'react-native-reanimated';
import { jest } from '@jest/globals';

// Mock Animated for Reanimated 2
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
