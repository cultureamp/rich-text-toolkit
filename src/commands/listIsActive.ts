import { EditorState } from "prosemirror-state"
import { NodeType, Schema } from "prosemirror-model"
import { hasParentNodeOfType } from "prosemirror-utils"

export function listIsActive(
  state: EditorState,
  type: NodeType<Schema<any, any>>
) {
  return hasParentNodeOfType(state.schema.nodes[type.name])(state.selection)
}
