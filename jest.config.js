/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  resolver: "jest-ts-webcompat-resolver",
  testEnvironment: "jsdom",
  testMatch: ["**/*.spec.ts"],

  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
}
