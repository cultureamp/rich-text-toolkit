import { CommandOrTransaction, EditorView } from "./types.js"
import { EditorState, Transaction } from "prosemirror-state"
import { EditorView as ProseMirrorEditorView } from "prosemirror-view"

type EditorAPI = {
  destroy: () => void
  dispatchTransaction: (maybeCommand: CommandOrTransaction) => void
}

type EditorArgs = {
  initialEditorState: EditorState
  node: HTMLElement
  onChange: (editorState: EditorState) => void
  isEditable?: () => boolean
}

/**
 * createRichTextEditor
 * Initialize a ProseMirror EditorView
 */
export function createRichTextEditor({
  initialEditorState,
  node,
  onChange = () => undefined,
  isEditable = () => true,
}: EditorArgs): EditorAPI {
  let editorView: EditorView | undefined

  // Handle transactions eminating from the EditorView instance
  function dispatch(tx: Transaction): void {
    const newEditorState = editorView && editorView.state.apply(tx)
    if (newEditorState) {
      onChange(newEditorState)
      editorView && editorView.updateState(newEditorState)
    }
  }

  // Allow the dispatcher to handle either a Command or a Transaction so we can
  // change the state more ergonomically upstream
  function dispatchCommandOrTransaction(
    commandOrTransaction: CommandOrTransaction
  ) {
    if (commandOrTransaction instanceof Transaction) {
      dispatch(commandOrTransaction)
    } else if (editorView) {
      commandOrTransaction(editorView.state, dispatch)
    }
  }

  editorView = new ProseMirrorEditorView(node, {
    state: initialEditorState,
    dispatchTransaction: dispatchCommandOrTransaction,
    editable: isEditable,
  })

  return {
    destroy: () => {
      editorView && editorView.destroy()
    },
    dispatchTransaction: dispatchCommandOrTransaction,
  }
}