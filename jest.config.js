require('dotenv').config();

module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/lib/api$1',
    '^@authentication(.*)$': '<rootDir>/src/lib/authentication$1',
    '^@components(.*)$': '<rootDir>/src/lib/components$1',
    '^@config(.*)$': '<rootDir>/src/lib/config$1',
    '^@forms(.*)$': '<rootDir>/src/lib/forms$1',
    '^@modules(.*)$': '<rootDir>/src/lib/modules$1',
    '^@pages(.*)$': '<rootDir>/src/lib/pages$1',
    '^@routes(.*)$': '<rootDir>/src/lib/routes$1',
    '^@history(.*)$': '<rootDir>/src/lib/history$1',
    '^@theme(.*)$': '<rootDir>/src/semantic-ui$1',
    '^@testData(.*)$': '<rootDir>/src/testData$1',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  snapshotFormat: {
    printBasicPrototype: true,
  },
};
