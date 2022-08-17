/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  resolver: "jest-ts-webcompat-resolver",
  testEnvironment: "jsdom",
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/index.{ts,tsx}",
    "!src/**/*.spec.*",
    "!src/schema/**",
    "!src/**/fixtures/**",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
}
