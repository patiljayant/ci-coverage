module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", '!**/node_modules/**'],
  coverageReporters: ['clover', 'json-summary', 'lcov'],
};
