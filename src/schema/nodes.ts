import { NodeSpec } from "prosemirror-model"
import { bulletList, listItem, orderedList } from "prosemirror-schema-list"
import { nodes as proseNodes } from "prosemirror-schema-basic"

export const nodes: NodeSpec = {
  ...proseNodes,
  ordered_list: orderedList,
  bullet_list: bulletList,
  list_item: listItem,
}
