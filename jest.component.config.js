module.exports = {
  testMatch: [
    "<rootDir>/src/App.spec.js",
  ],
  collectCoverage: false,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns : ["/node_modules/(?!uuid)/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  }
}
