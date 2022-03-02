import { describe, expect, it, jest } from "@jest/globals"
import { dummy } from "./dummy.js"

it(`has no tests`, () => {
  expect(dummy).toBe("blep")
})
