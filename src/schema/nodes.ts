import { NodeSpec } from "prosemirror-model"
import { bulletList, listItem, orderedList } from "prosemirror-schema-list"
import { nodes as proseNodes } from "prosemirror-schema-basic"

export const nodes: NodeSpec = {
  ...proseNodes,
  ordered_list: {
    ...orderedList,
    content: "list_item+",
    group: "block",
  },
  bullet_list: {
    ...bulletList,
    content: "list_item+",
    group: "block",
  },
  list_item: {
    ...listItem,
    content: "paragraph block*",
  },
}
