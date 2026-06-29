'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import type { FrontendEditorDocumentDescriptor } from '@/lib/frontendEditor/types'

const FrontendEditor = dynamic(
  () => import('./FrontendEditor').then((module) => module.FrontendEditor),
  { ssr: false },
)

interface FrontendEditorGateProps {
  document?: FrontendEditorDocumentDescriptor
}

const EDIT_MODE_STORAGE_KEY = 'amazing-hauling-frontend-editor-active'

/** Keeps the editor and its styles out of the visitor bundle unless `?edit` is present. */
export function FrontendEditorGate({ document }: FrontendEditorGateProps) {
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    const explicitlyRequested = new URLSearchParams(window.location.search).has('edit')
    if (explicitlyRequested) localStorage.setItem(EDIT_MODE_STORAGE_KEY, 'true')
    setRequested(explicitlyRequested || localStorage.getItem(EDIT_MODE_STORAGE_KEY) === 'true')
  }, [])

  const leaveEditMode = () => {
    localStorage.removeItem(EDIT_MODE_STORAGE_KEY)
    const url = new URL(window.location.href)
    url.searchParams.delete('edit')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setRequested(false)
  }

  return requested ? <FrontendEditor document={document} onLeave={leaveEditMode} /> : null
}
