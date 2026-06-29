'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { FrontendEditorDrawer } from '@/components/molecules/FrontendEditorDrawer'
import {
  FrontendEditorFields,
  type FrontendEditorFieldGroup,
} from '@/components/molecules/FrontendEditorFields'
import { FrontendMediaDrawer } from '@/components/molecules/FrontendMediaDrawer'
import { FrontendMediaLibrary } from '@/components/molecules/FrontendMediaLibrary'
import type {
  FrontendEditorDocument,
  FrontendEditorDocumentDescriptor,
  FrontendEditorField,
  FrontendEditorMediaItem,
} from '@/lib/frontendEditor/types'
import './frontendEditor.css'

interface FrontendEditorProps {
  document?: FrontendEditorDocumentDescriptor
  onLeave: () => void
}

type EditorError = { message: string; status?: number }

function normalizeText(value: string | null | undefined) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function getFieldImageSource(field: FrontendEditorField) {
  if (field.kind === 'media' && field.value && typeof field.value === 'object') {
    return field.value.url || field.value.thumbnailURL || field.value.filename || ''
  }
  return ''
}

function getVisualSource(target: HTMLElement, boundary: HTMLElement) {
  const image = target.closest<HTMLImageElement>('img')
  if (image) return decodeURIComponent(image.currentSrc || image.src)

  let element: HTMLElement | null = target
  while (element && boundary.contains(element)) {
    const backgroundImage = [
      window.getComputedStyle(element).backgroundImage,
      window.getComputedStyle(element, '::before').backgroundImage,
      window.getComputedStyle(element, '::after').backgroundImage,
    ].find((value) => value && value !== 'none')
    const match = backgroundImage?.match(/url\(["']?(.+?)["']?\)/)
    if (match?.[1]) return decodeURIComponent(match[1])
    element = element.parentElement
  }

  return ''
}

async function responseJSON<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) {
    throw Object.assign(new Error(data.error || 'The editor request failed.'), {
      status: response.status,
    })
  }
  return data
}

function findClickedField(
  editorDocuments: FrontendEditorDocument[],
  target: HTMLElement,
): { blockId: string; field?: FrontendEditorField } | null {
  const boundary = target.closest<HTMLElement>('[data-ah-editor-block]')
  const blockId = boundary?.dataset.ahEditorBlockId
  if (!blockId || !boundary) return null

  const block = editorDocuments
    .flatMap((document) => document.blocks)
    .find((entry) => entry.blockId === blockId)
  if (!block) return null

  const visualSource = getVisualSource(target, boundary)
  if (visualSource) {
    const imageFields = block.fields.filter((field) => field.kind === 'media')
    const exactField = imageFields.find((field) => {
      const fieldSource = decodeURIComponent(getFieldImageSource(field))
      return Boolean(
        fieldSource &&
          (visualSource.includes(fieldSource) ||
            visualSource.includes(fieldSource.split('/').pop() || '')),
      )
    })
    return { blockId, field: exactField || (imageFields.length === 1 ? imageFields[0] : undefined) }
  }

  const textElement = target.closest<HTMLElement>(
    'h1, h2, h3, h4, h5, h6, p, li, blockquote, a, button, span',
  )
  const clickedText = normalizeText(textElement?.textContent)
  if (!clickedText) return { blockId }

  const textFields = block.fields.filter(
    (field) =>
      (field.kind === 'text' || field.kind === 'url') &&
      typeof field.value === 'string' &&
      field.value.trim(),
  )
  const exact = textFields.find((field) => normalizeText(field.value as string) === clickedText)
  const contained = textFields.find((field) => {
    const fieldText = normalizeText(field.value as string)
    return clickedText.includes(fieldText) || fieldText.includes(clickedText)
  })

  return { blockId, field: exact || contained }
}

export function FrontendEditor({ document: descriptor, onLeave }: FrontendEditorProps) {
  const router = useRouter()
  const [pageDocument, setPageDocument] = useState<FrontendEditorDocument | null>(null)
  const [activeBlockId, setActiveBlockId] = useState<string>()
  const [selectedFieldPath, setSelectedFieldPath] = useState<string>()
  const [status, setStatus] = useState('Connecting to Payload...')
  const [error, setError] = useState<EditorError | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [pendingMedia, setPendingMedia] = useState<FrontendEditorMediaItem>()
  const [media, setMedia] = useState<FrontendEditorMediaItem[]>([])
  const [mediaPage, setMediaPage] = useState(1)
  const [mediaHasNextPage, setMediaHasNextPage] = useState(false)
  const [mediaSearch, setMediaSearch] = useState('')
  const [isMediaLoading, setIsMediaLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const editorDocuments = useMemo(
    () => [pageDocument].filter((value): value is FrontendEditorDocument => Boolean(value)),
    [pageDocument],
  )

  const groups = useMemo<FrontendEditorFieldGroup[]>(
    () =>
      editorDocuments.map((editorDocument) => ({
        blocks: editorDocument.blocks,
        label: 'Page content',
        payloadURL: editorDocument.payloadURL,
        scope: editorDocument.scope,
      })),
    [editorDocuments],
  )

  const selectedField = useMemo(
    () =>
      editorDocuments
        .flatMap((editorDocument) => editorDocument.blocks)
        .flatMap((block) => block.fields)
        .find((field) => field.path === selectedFieldPath),
    [editorDocuments, selectedFieldPath],
  )

  const activeDocument = editorDocuments.find((editorDocument) =>
    editorDocument.blocks.some((block) => block.blockId === activeBlockId),
  )

  const loadWorkspace = useCallback(async () => {
    if (!descriptor) {
      setError({ message: 'This page is not available for frontend editing.' })
      setStatus('Editor unavailable')
      return
    }

    setStatus('Connecting to Payload...')
    setError(null)
    try {
      const response = await fetch(
        `/api/frontend-editor/document?id=${encodeURIComponent(descriptor.id)}`,
        {
          cache: 'no-store',
          credentials: 'same-origin',
        },
      )
      const data = await responseJSON<{ document: FrontendEditorDocument }>(response)
      setPageDocument(data.document)
      const firstBlock = data.document.blocks.find((block) => block.fields.length)
      setActiveBlockId((current) => current || firstBlock?.blockId)
      setStatus('Connected to Payload')
    } catch (caughtError) {
      const requestError = caughtError as Error & { status?: number }
      setError({ message: requestError.message, status: requestError.status })
      setStatus('Editor unavailable')
    }
  }, [descriptor])

  const loadMedia = useCallback(
    async (page: number, replace: boolean) => {
      setIsMediaLoading(true)
      try {
        const params = new URLSearchParams({ page: String(page) })
        if (mediaSearch.trim()) params.set('search', mediaSearch.trim())
        const response = await fetch(`/api/frontend-editor/media?${params}`, {
          cache: 'no-store',
          credentials: 'same-origin',
        })
        const data = await responseJSON<{
          hasNextPage: boolean
          items: FrontendEditorMediaItem[]
          page: number
        }>(response)
        setMedia((current) => (replace ? data.items : [...current, ...data.items]))
        setMediaPage(data.page)
        setMediaHasNextPage(data.hasNextPage)
      } catch (caughtError) {
        setStatus((caughtError as Error).message)
      } finally {
        setIsMediaLoading(false)
      }
    },
    [mediaSearch],
  )

  useEffect(() => {
    document.body.dataset.ahEditorActive = 'true'
    void loadWorkspace()
    return () => {
      delete document.body.dataset.ahEditorActive
      delete document.body.dataset.ahEditorMediaOpen
    }
  }, [loadWorkspace])

  useEffect(() => {
    document.body.dataset.ahEditorMediaOpen = isMediaOpen ? 'true' : 'false'
  }, [isMediaOpen])

  useEffect(() => {
    if (!isMediaOpen || error) return
    const timeout = window.setTimeout(() => void loadMedia(1, true), 250)
    return () => window.clearTimeout(timeout)
  }, [error, isMediaOpen, loadMedia])

  useEffect(() => {
    if (!editorDocuments.length) return

    const handlePageClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement) || target.closest('.ah-editor')) return
      const clicked = findClickedField(editorDocuments, target)
      if (!clicked) return

      if (target.closest('a, button')) event.preventDefault()
      setActiveBlockId(clicked.blockId)
      setSelectedFieldPath(clicked.field?.path)
      setPendingMedia(undefined)
      if (clicked.field?.kind === 'media') {
        setIsMediaOpen(true)
      }
    }

    document.addEventListener('click', handlePageClick, true)
    return () => document.removeEventListener('click', handlePageClick, true)
  }, [editorDocuments])

  const selectField = useCallback(
    (field: FrontendEditorField) => {
      const block = editorDocuments
        .flatMap((editorDocument) => editorDocument.blocks)
        .find((entry) => entry.fields.some((entryField) => entryField.path === field.path))
      if (block) setActiveBlockId(block.blockId)
      setSelectedFieldPath(field.path)
      setPendingMedia(undefined)
    },
    [editorDocuments],
  )

  const saveField = useCallback(
    async (field: FrontendEditorField, value: string) => {
      if (!pageDocument) return

      setIsSaving(true)
      setStatus('Saving to Payload...')
      try {
        const response = await fetch(
          `/api/frontend-editor/document?id=${encodeURIComponent(pageDocument.id)}`,
          {
            body: JSON.stringify({ path: field.path, updatedAt: pageDocument.updatedAt, value }),
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
          },
        )
        const data = await responseJSON<{ document: FrontendEditorDocument }>(response)
        setPageDocument(data.document)
        setSelectedFieldPath(field.path)
        setPendingMedia(undefined)
        setStatus('Saved to Payload')
        router.refresh()
      } catch (caughtError) {
        const requestError = caughtError as Error & { status?: number }
        setStatus(requestError.message)
        if (requestError.status === 409) setError({ message: requestError.message, status: 409 })
      } finally {
        setIsSaving(false)
      }
    },
    [pageDocument, router],
  )

  const chooseMedia = useCallback(
    (field: FrontendEditorField) => {
      selectField(field)
      setIsMediaOpen(true)
    },
    [selectField],
  )

  const saveMedia = useCallback(
    async (field: FrontendEditorField) => {
      if (!pendingMedia) return
      await saveField(field, pendingMedia.id)
    },
    [pendingMedia, saveField],
  )

  const uploadMedia = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
      if (!imageFiles.length) {
        setStatus('Only image files can be added to this library.')
        return
      }

      setIsUploading(true)
      setStatus(`Uploading ${imageFiles.length} image${imageFiles.length === 1 ? '' : 's'}...`)
      try {
        for (const file of imageFiles) {
          const formData = new FormData()
          formData.append('file', file)
          formData.append(
            '_payload',
            JSON.stringify({ alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') }),
          )
          const response = await fetch('/api/media', {
            body: formData,
            credentials: 'same-origin',
            method: 'POST',
          })
          await responseJSON(response)
        }
        setStatus(`${imageFiles.length} image${imageFiles.length === 1 ? '' : 's'} added to Payload`)
        await loadMedia(1, true)
      } catch (caughtError) {
        setStatus((caughtError as Error).message)
      } finally {
        setIsUploading(false)
      }
    },
    [loadMedia],
  )

  const loginURL =
    typeof window === 'undefined'
      ? '/admin/login'
      : `/admin/login?redirect=${encodeURIComponent(`${window.location.pathname}${window.location.search}`)}`

  return createPortal(
    <div className="ah-editor">
      <FrontendMediaDrawer isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)}>
        <FrontendMediaLibrary
          activeFieldLabel={selectedField?.kind === 'media' ? selectedField.label : undefined}
          hasNextPage={mediaHasNextPage}
          isLoading={isMediaLoading}
          isUploading={isUploading}
          items={media}
          onLoadMore={() => void loadMedia(mediaPage + 1, false)}
          onSearchChange={setMediaSearch}
          onSelect={(item) => {
            setPendingMedia(item)
            setStatus('Image selected. Review it in the inspector, then save.')
          }}
          onUpload={(files) => void uploadMedia(files)}
          pendingMediaId={pendingMedia?.id}
          search={mediaSearch}
        />
      </FrontendMediaDrawer>

      <FrontendEditorDrawer
        documentTitle={pageDocument?.title || descriptor?.title || 'Page editor'}
        onLeave={onLeave}
        payloadURL={activeDocument?.payloadURL || pageDocument?.payloadURL}
        status={status}
      >
        {error ? (
          <div className="ah-editor__error">
            <span>{error.status === 401 ? 'Sign in required' : 'Editor unavailable'}</span>
            <p>{error.message}</p>
            {error.status === 401 ? <a href={loginURL}>Sign in with Payload</a> : null}
            {error.status === 409 ? (
              <button onClick={() => void loadWorkspace()} type="button">
                Reload editor data
              </button>
            ) : null}
          </div>
        ) : !pageDocument ? (
          <div className="ah-editor__loading">Loading page fields...</div>
        ) : (
          <FrontendEditorFields
            activeBlockId={activeBlockId}
            groups={groups}
            isSaving={isSaving}
            onBlockChange={(blockId) => {
              setActiveBlockId(blockId)
              setSelectedFieldPath(undefined)
              setPendingMedia(undefined)
            }}
            onChooseMedia={chooseMedia}
            onFieldChange={selectField}
            onSaveMedia={saveMedia}
            onSaveValue={saveField}
            pendingMedia={pendingMedia}
            selectedFieldPath={selectedFieldPath}
          />
        )}
      </FrontendEditorDrawer>
    </div>,
    document.body,
  )
}
