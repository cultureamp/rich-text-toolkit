import { marks } from "prosemirror-schema-basic"
import { createDocNode, createEditorState } from "../../core/state"
import { Schema } from "prosemirror-model"

export const testSchema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0]
      },
    },
    text: {
      group: "inline",
    },
  },
  marks: {
    ...marks,
  },
})

export const testDocNodeContentJSON = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Example content",
      },
    ],
  },
]

export const testDocNodeContentWithMarksJSON = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        marks: [{ type: "strong" }],
        text: "Example Mark",
      },
    ],
  },
]

export const testDocNodeJSON = {
  type: "doc",
  content: testDocNodeContentJSON,
}

export const testDocNodeWithMarks = {
  type: "doc",
  content: testDocNodeContentWithMarksJSON,
}

export const testEditorState = createEditorState(
  testSchema,
  createDocNode(testSchema, testDocNodeJSON)
)
export const testEditorStateWithMarks = createEditorState(
  testSchema,
  createDocNode(testSchema, testDocNodeWithMarks)
)
