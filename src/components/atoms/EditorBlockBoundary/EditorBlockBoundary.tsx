import type { ReactNode } from 'react'

interface EditorBlockBoundaryProps {
  blockId: string
  blockType: string
  children: ReactNode
}

/** Structural marker used by the optional frontend editor. */
export function EditorBlockBoundary({ blockId, blockType, children }: EditorBlockBoundaryProps) {
  return (
    <div
      data-ah-editor-block=""
      data-ah-editor-block-id={blockId}
      data-ah-editor-block-type={blockType}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  )
}
