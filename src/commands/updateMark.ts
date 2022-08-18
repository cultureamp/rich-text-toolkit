import { CommandFactory } from "../core/types"
import { EditorState, Transaction } from "prosemirror-state"
import { MarkType } from "prosemirror-model"
import { getMarkRange } from "./getMarkRange"

/** Update Mark attributes, create nested Marks or split Marks of the same type   */
export const updateMark: CommandFactory =
  (
    type: MarkType,
    attrs: Object,
    options: {
      /** Select of the entire content of the mark  */
      toExtent: boolean
    } = { toExtent: false }
  ) =>
  (state: EditorState, dispatch: (tx: Transaction) => void) => {
    const { tr, selection, doc } = state
    let { from, to } = selection
    const { $from, empty } = selection

    if (empty || options.toExtent) {
      const range = getMarkRange($from, type)
      if (range) {
        from = range.from
        to = range.to
      }
    }

    const hasMark = doc.rangeHasMark(from, to, type)

    if (hasMark) {
      tr.removeMark(from, to, type)
    }
    tr.addMark(from, to, type.create(attrs))
    dispatch(tr)

    return true
  }
