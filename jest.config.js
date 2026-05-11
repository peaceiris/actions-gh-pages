module.exports = {
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'ts'],
  setupFiles: ['<rootDir>/__tests__/jest.setup.mjs'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'ES2022',
          target: 'ES2022'
        },
        useESM: true
      }
    ]
  },
  verbose: true
};
