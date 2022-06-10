import { EditorState, Transaction } from "prosemirror-state"
import { EditorView } from "prosemirror-view"

/*
 * Dispatch receives a transaction from ProseMirror to effect changes to the
 * EditorState in order
 */
export type Dispatch = (tx: Transaction) => void

export type Command = (
  editorState: EditorState,
  dispatch: Dispatch,
  view?: EditorView
) => boolean

export type MaybeCommand = Command | Transaction

export type Dispatcher = (tx: Transaction) => void

export class CAEditorView extends EditorView {
  dispatch(maybeCommand: MaybeCommand): void
}

export type SelectionPosition = {
  top: number
  left: number
  height: number
  width: number
}
