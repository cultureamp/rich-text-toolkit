import { createRichTextEditor } from "../core/create"
import { describe, expect, it, jest } from "@jest/globals"
import { findByText, waitFor, getByText } from "@testing-library/dom"
import { simulateSelectionByText, simulateTextInsert } from "./fixtures/helpers"
import {
  testEditorState,
  testEditorStateWithMarks,
  testSchema,
} from "./fixtures/test-state"
import { updateMark } from "./updateMark"
import { addMark } from "./addMark"

describe("updateMark", () => {
  const onChange = jest.fn()
  const attributes = { "aria-labelledby": "label-text-123" }

  it("can update existing Mark with a nested Mark", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })

    dispatchTransaction(simulateSelectionByText("Example Italic Mark"))
    dispatchTransaction(updateMark(testSchema.marks.strong))

    await waitFor(() => {
      const italicExample = getByText(node, "Example Italic Mark")
      expect(italicExample.nodeName).toBe("STRONG")
      expect(italicExample.parentNode?.nodeName).toBe("EM")
    })
  })

  // it("can update attributes of current mark", async () => {
  //   const node = document.createElement("div")
  //   const { dispatchTransaction } = createRichTextEditor({
  //     node,
  //     onChange,
  //     attributes,
  //     initialEditorState: testEditorStateWithMarks,
  //   })

  //   dispatchTransaction(simulateSelectionByText("Example Link"))
  //   dispatchTransaction(
  //     updateMark(testSchema.marks.link, {
  //       href: "https://cultureamp.design",
  //       _metadata: null,
  //       rel: "noreferrer",
  //       target: "_self",
  //     })
  //   )
  //   await findByText(node, "safasdas")
  //   await waitFor(() => {
  //     const italicExample = getByText(node, "Example Italic Mark")
  //     expect(italicExample.nodeName).toBe("EM")
  //   })
  // })
})
