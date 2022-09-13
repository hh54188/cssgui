module.exports = {
  collectCoverage: true,
  "coveragePathIgnorePatterns": [
    "<rootDir>/src/utils",
    "element-state-template",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns : ["/node_modules/(?!uuid)/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
}
