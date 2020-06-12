var path = require('path');

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  eslint: {
    enable: true /* (default value) */,
    useEslintrc: true,
    mode: 'file',
  },
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/lib/api'),
      '@authentication': path.resolve(__dirname, 'src/lib/authentication/'),
      '@components': path.resolve(__dirname, 'src/lib/components/'),
      '@config': path.resolve(__dirname, 'src/lib/config/'),
      '@forms': path.resolve(__dirname, 'src/lib/forms/'),
      '@modules': path.resolve(__dirname, 'src/lib/modules'),
      '@pages': path.resolve(__dirname, 'src/lib/pages/'),
      '@routes': path.resolve(__dirname, 'src/lib/routes/'),
      '@history': path.resolve(__dirname, 'src/lib/history/'),
      '@theme': path.resolve(__dirname, 'src/semantic-ui/'),
    },
  },
  jest: {
    configure: {
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
    },
  },
};
