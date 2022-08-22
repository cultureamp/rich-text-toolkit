import { createRichTextEditor } from "../core/create"
import { describe, expect, it, jest } from "@jest/globals"
import { findByText, waitFor } from "@testing-library/dom"
import { removeMark } from "./removeMark"
import { simulateSelectionByText } from "./fixtures/helpers"
import { testEditorStateWithMarks, testSchema } from "./fixtures/test-state"

describe("removeMark", () => {
  const onChange = jest.fn()
  const attributes = { "aria-labelledby": "label-text-123" }

  it("removes the given <strong> Mark from a paragraph in the document", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    // Check that there is a strong tag
    expect(node.querySelectorAll("strong").length).toBe(1)

    dispatchTransaction(simulateSelectionByText("Example Strong Mark"))
    dispatchTransaction(removeMark(testSchema.marks.strong))

    // Check that the text still exists
    await findByText(node, "Example Strong Mark")

    await waitFor(() => {
      expect(node.querySelectorAll("strong").length).toBe(0)
    })
  })

  it("removes the given <strong> Mark from a selection within a paragraph", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    // Check that there is a strong tag
    expect(node.querySelectorAll("strong").length).toBe(1)

    dispatchTransaction(simulateSelectionByText("Example Strong"))
    dispatchTransaction(removeMark(testSchema.marks.strong))

    // Check that the text still exists removed from the mark still exists
    await findByText(node, "Example Strong")

    await waitFor(() => {
      // Check that the text strong tag still exists
      expect(node.querySelectorAll("strong").length).toBe(1)
      // Check that the remaining text is in the strong
      expect(node.querySelectorAll("strong")[0].textContent).toEqual(" Mark")
    })
  })

  it("can use toExtent to remove the entire Mark from a smaller selection", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    // Check that there is a strong tag
    expect(node.querySelectorAll("strong").length).toBe(1)

    dispatchTransaction(simulateSelectionByText("Example Strong"))
    dispatchTransaction(removeMark(testSchema.marks.strong, { toExtent: true }))

    // Check that the text still exists removed from the mark still exists
    await findByText(node, "Example Strong Mark")

    await waitFor(() => {
      // Check that the text no longer exists
      expect(node.querySelectorAll("strong").length).toBe(0)
    })
  })
})
