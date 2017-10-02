// @noflow

jest.mock('react-native-device-info', () => ({
  isEmulator: jest.fn(() => true),
}));
