var path = require("path");

module.exports = {
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
  webpack: {
    alias: {
      "@state": path.resolve(__dirname, "src/lib/state/"),
      "@components": path.resolve(__dirname, "src/lib/components/"),
      "@config": path.resolve(__dirname, "src/lib/config/"),
      "@api": path.resolve(__dirname, "src/lib/api"),
      "@forms": path.resolve(__dirname, "src/lib/forms/"),
      "@pages": path.resolve(__dirname, "src/lib/pages/"),
      "@routes": path.resolve(__dirname, "src/lib/routes/"),
      "@authentication": path.resolve(__dirname, "src/lib/authentication/"),
      "@history": path.resolve(__dirname, "src/lib/history/"),
      "@theme": path.resolve(__dirname, "src/semantic-ui/"),
      "@helpers": path.resolve(__dirname, "src/lib/helpers"),
      "@modules": path.resolve(__dirname, "src/lib/modules")
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@state(.*)$": "<rootDir>/src/lib/state$1",
        "^@components(.*)$": "<rootDir>/src/lib/components$1",
        "^@config(.*)$": "<rootDir>/src/lib/config$1",
        "^@api(.*)$": "<rootDir>/src/lib/api$1",
        "^@forms(.*)$": "<rootDir>/src/lib/forms$1",
        "^@pages(.*)$": "<rootDir>/src/lib/pages$1",
        "^@routes(.*)$": "<rootDir>/src/lib/routes$1",
        "^@authentication(.*)$": "<rootDir>/src/lib/authentication$1",
        "^@history(.*)$": "<rootDir>/src/lib/history$1",
        "^@testData(.*)$": "<rootDir>/../tests/lib/data$1"
      }
    }
  }
};
