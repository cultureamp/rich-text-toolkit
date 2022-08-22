import { createRichTextEditor } from "../core/create"
import { describe, expect, it, jest } from "@jest/globals"
import { waitFor } from "@testing-library/dom"
import { EditorState } from "prosemirror-state"
import { getMarkRange } from "./getMarkRange"
import { simulateSelectionByText } from "./fixtures/helpers"
import { testEditorStateWithMarks } from "./fixtures/test-state"

describe("getMarkRange", () => {
  const onChange = jest.fn()
  const attributes = { "aria-labelledby": "label-text-123" }

  it("returns the entire range of the Mark provided from a resolved position", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    let currentState = testEditorStateWithMarks

    dispatchTransaction(simulateSelectionByText("Example Italic"))
    dispatchTransaction((editorState: EditorState) => {
      currentState = editorState
      return true
    })

    await waitFor(() => {
      const startPos = currentState.selection.$from
      const providedMark = currentState.schema.marks.em
      const range = getMarkRange(startPos, providedMark)
      expect(range).toBeTruthy()
      expect(range).toHaveProperty("from")
      expect(range).toHaveProperty("to")
    })
  })

  it("returns null if the Mark provided does not match to the current selection", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    let currentState = testEditorStateWithMarks

    dispatchTransaction(simulateSelectionByText("Example Strong"))
    dispatchTransaction((editorState: EditorState) => {
      currentState = editorState
      return true
    })

    await waitFor(() => {
      const startPos = currentState.selection.$from
      const providedMark = currentState.schema.marks.em
      const range = getMarkRange(startPos, providedMark)
      expect(range).toBe(null)
    })
  })

  it("returns null if the position provided cannot be resolved", async () => {
    const node = document.createElement("div")
    const { dispatchTransaction } = createRichTextEditor({
      node,
      onChange,
      attributes,
      initialEditorState: testEditorStateWithMarks,
    })
    let currentState = testEditorStateWithMarks

    dispatchTransaction(simulateSelectionByText("Example Strong"))
    dispatchTransaction((editorState: EditorState) => {
      currentState = editorState
      return true
    })

    await waitFor(() => {
      const startPos = null
      const providedMark = currentState.schema.marks.em
      const range = getMarkRange(startPos, providedMark)
      expect(range).toBe(null)
    })
  })
})
