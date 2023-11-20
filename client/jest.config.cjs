module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
