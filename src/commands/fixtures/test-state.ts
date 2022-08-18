// import { marks } from "prosemirror-schema-basic"
import { createDocNode, createEditorState } from "../../core/state"
import { Schema } from "prosemirror-model"
import { marks } from "../../schema/marks"
import { nodes } from "../../schema/nodes"
import { EditorState } from "prosemirror-state"

export const testSchema = new Schema({
  nodes: {
    ...nodes,
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
        text: "Example Strong Mark",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        marks: [{ type: "em" }],
        text: "Example Italic Mark",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        marks: [
          {
            type: "link",
            attrs: {
              href: "https://cultureamp.design",
              _metadata: null,
              target: "_blank",
              rel: "noreferrer",
            },
          },
        ],
        text: "Example Link Mark",
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
