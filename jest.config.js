module.exports = {
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns : ["/node_modules/(?!uuid)/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
}
