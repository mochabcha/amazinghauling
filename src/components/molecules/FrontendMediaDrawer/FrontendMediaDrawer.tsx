'use client'

import type { ReactNode } from 'react'
import { EditorIcon } from '@/components/atoms/EditorIcon'

interface FrontendMediaDrawerProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function FrontendMediaDrawer({ children, isOpen, onClose }: FrontendMediaDrawerProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      aria-label="Payload media library"
      className="ah-editor__media-drawer"
      data-open={isOpen ? 'true' : 'false'}
      inert={!isOpen}
    >
      <header className="ah-editor__media-header">
        <div>
          <span className="ah-editor__kicker">Payload</span>
          <h2>Media library</h2>
        </div>
        <button
          aria-label="Close media library"
          className="ah-editor__icon-button"
          onClick={onClose}
          type="button"
        >
          <EditorIcon name="close" />
        </button>
      </header>
      <div className="ah-editor__media-body">{children}</div>
    </aside>
  )
}
