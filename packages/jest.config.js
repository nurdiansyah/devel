module.exports = {
  preset: '@deboxsoft/devel',
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverage: true
};
