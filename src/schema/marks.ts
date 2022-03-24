import { MarkSpec } from "prosemirror-model"
import { marks as proseMarks } from "prosemirror-schema-basic"

export const marks: MarkSpec = {
  ...proseMarks,

  // An underline mark. Rendered as a `<u>` element. Has parse rules that also
  // matches `font-style: underline`.
  underline: {
    parseDOM: [{ tag: "u" }, { style: "font-style=underline" }],
    toDOM() {
      return ["u", 0]
    },
  },
}
