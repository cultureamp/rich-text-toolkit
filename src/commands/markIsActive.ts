import { EditorState } from "prosemirror-state"
import { MarkType } from "prosemirror-model"

/**
 * @deprecated Please use the same component from `@kaizen/components`
 */
export function markIsActive(state: EditorState, type: MarkType) {
  const { from, $from, to, empty } = state.selection

  if (empty) {
    return !!type.isInSet(state.storedMarks || $from.marks())
  }

  return !!state.doc.rangeHasMark(from, to, type)
}
