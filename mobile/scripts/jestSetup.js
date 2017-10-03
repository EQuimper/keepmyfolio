// @noflow

/**
 * Mock react-native native module
 */
jest.mock('react-native-device-info', () => ({
  isEmulator: jest.fn(() => true),
}));
