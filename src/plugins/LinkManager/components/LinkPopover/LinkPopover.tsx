import {
  EditIcon,
  ExternalLinkIcon,
  RemoveLinkIcon,
  Text,
  usePopover,
} from "@kaizen/components"
import { Positioner } from "./Positioner"
import { SelectionPosition } from "../../types"
import React from "react"
import styles from "./LinkPopover.module.scss"

export interface LinkPopoverProps {
  href?: string
  onRemove: () => void
  onEdit: () => void
  selectionPosition: SelectionPosition
}

/**
 * @deprecated Please use the same component from `@kaizen/components`
 */
export const LinkPopover: React.VFC<LinkPopoverProps> = props => {
  const { href, onRemove, onEdit, selectionPosition } = props
  const [ElementRef, Popover] = usePopover()

  return (
    <>
      <Positioner ref={ElementRef} {...selectionPosition} />
      <Popover size="large">
        <div className={styles.popoverContent}>
          <ExternalLinkIcon role="presentation" />
          <div className={styles.popoverLinkContainer}>
            <Text
              variant="body"
              tag="div"
              classNameOverride={styles.paragraphFlex}
            >
              <a
                className={styles.popoverLink}
                href={href != null ? href : undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                {href}
              </a>
            </Text>
          </div>
          <div className={styles.popoverActions}>
            <EditIcon role="img" onClick={onEdit} aria-label="Edit link" />
          </div>
          <RemoveLinkIcon
            role="img"
            onClick={onRemove}
            aria-label="Remove link"
          />
        </div>
      </Popover>
    </>
  )
}

LinkPopover.displayName = "LinkPopover"
