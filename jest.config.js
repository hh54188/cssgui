module.exports = {
  collectCoverage: true,
  "collectCoverageFrom": [
    "<rootDir>/src/store/**/*.js"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns : ["/node_modules/(?!uuid)/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
}
