import { EditorState } from "prosemirror-state"
import { NodeType, Schema } from "prosemirror-model"
import { findParentNodeOfTypeClosestToPos } from "prosemirror-utils"

export function listIsActive(
  state: EditorState,
  type: NodeType<Schema<any, any>>,
  listNodes: typeof type[]
) {
  const listNode = findParentNodeOfTypeClosestToPos(
    state.selection.$from,
    listNodes
  )

  return listNode?.node.type === type
}
