/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/*.test.tsx', '**/*.spec.tsx'],
}
