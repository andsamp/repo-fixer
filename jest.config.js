// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'cobertura'
  ],
  roots: ['<rootDir>/src'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
