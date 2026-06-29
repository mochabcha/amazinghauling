'use client'

import type { ReactNode } from 'react'
import { EditorIcon } from '@/components/atoms/EditorIcon'

interface FrontendEditorDrawerProps {
  children: ReactNode
  documentTitle?: string
  onLeave: () => void
  payloadURL?: string
  status?: string
}

export function FrontendEditorDrawer({
  children,
  documentTitle,
  onLeave,
  payloadURL,
  status,
}: FrontendEditorDrawerProps) {
  return (
    <aside aria-label="Amazing Hauling page editor" className="ah-editor__drawer">
      <header className="ah-editor__header">
        <div>
          <span className="ah-editor__kicker">Amazing Hauling / Edit workspace</span>
          <h2>{documentTitle || 'Page editor'}</h2>
        </div>
        <button
          aria-label="Leave edit mode"
          className="ah-editor__leave-button"
          onClick={onLeave}
          type="button"
        >
          <EditorIcon name="exit" />
          <span>Leave</span>
        </button>
      </header>

      <div className="ah-editor__body">{children}</div>

      <footer className="ah-editor__footer">
        <span aria-live="polite">{status || 'Connected to Payload'}</span>
        {payloadURL ? (
          <a href={payloadURL} rel="noreferrer" target="_blank">
            Payload
          </a>
        ) : null}
      </footer>
    </aside>
  )
}
