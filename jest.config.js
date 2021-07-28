module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFiles: ['<rootDir>/jest/setup.spec.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react-navigation)',
  ],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
};
