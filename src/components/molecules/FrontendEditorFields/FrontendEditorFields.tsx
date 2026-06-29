'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { EditorIcon } from '@/components/atoms/EditorIcon'
import type {
  FrontendEditorBlock,
  FrontendEditorDocumentScope,
  FrontendEditorField,
  FrontendEditorMediaItem,
} from '@/lib/frontendEditor/types'

export interface FrontendEditorFieldGroup {
  blocks: FrontendEditorBlock[]
  label: string
  payloadURL: string
  scope: FrontendEditorDocumentScope
}

interface FrontendEditorFieldsProps {
  activeBlockId?: string
  groups: FrontendEditorFieldGroup[]
  isSaving: boolean
  onBlockChange: (blockId: string) => void
  onChooseMedia: (field: FrontendEditorField) => void
  onFieldChange: (field: FrontendEditorField) => void
  onSaveMedia: (field: FrontendEditorField) => Promise<void>
  onSaveValue: (field: FrontendEditorField, value: string) => Promise<void>
  pendingMedia?: FrontendEditorMediaItem
  selectedFieldPath?: string
}

function getFieldImageSource(field: FrontendEditorField, pendingMedia?: FrontendEditorMediaItem) {
  if (pendingMedia) return pendingMedia.thumbnailURL || pendingMedia.url || ''
  if (field.kind === 'media' && field.value && typeof field.value === 'object') {
    return field.value.thumbnailURL || field.value.url || ''
  }
  return ''
}

function FieldImagePreview({
  field,
  pendingMedia,
}: {
  field: FrontendEditorField
  pendingMedia?: FrontendEditorMediaItem
}) {
  const source = getFieldImageSource(field, pendingMedia)
  const alt =
    pendingMedia?.alt ||
    (field.value && typeof field.value === 'object' ? field.value.alt : '') ||
    ''

  return source ? (
    <Image alt={alt} height={360} src={source} unoptimized width={640} />
  ) : (
    <span className="ah-editor__image-empty">No image selected</span>
  )
}

export function FrontendEditorFields({
  activeBlockId,
  groups,
  isSaving,
  onBlockChange,
  onChooseMedia,
  onFieldChange,
  onSaveMedia,
  onSaveValue,
  pendingMedia,
  selectedFieldPath,
}: FrontendEditorFieldsProps) {
  const blocks = groups.flatMap((group) => group.blocks)
  const activeBlock = blocks.find((block) => block.blockId === activeBlockId) || blocks[0]
  const selectedField = activeBlock?.fields.find((field) => field.path === selectedFieldPath)
  const activeGroup = groups.find((group) => group.scope === activeBlock?.scope)
  const [draftValue, setDraftValue] = useState('')

  useEffect(() => {
    setDraftValue(typeof selectedField?.value === 'string' ? selectedField.value : '')
  }, [selectedField])

  if (!activeBlock) {
    return (
      <div className="ah-editor__empty">
        <strong>No editable fields found</strong>
        <p>Open this document in Payload for advanced content.</p>
      </div>
    )
  }

  const isImageField = selectedField?.kind === 'media'
  const isURLField = selectedField?.kind === 'url'

  return (
    <div className="ah-editor__content-panel">
      <nav aria-label="Editable page regions" className="ah-editor__scope-tree">
        {groups.map((group) => (
          <details key={group.scope} open>
            <summary>
              <span>{group.label}</span>
              <small>{group.blocks.length}</small>
            </summary>
            <div>
              {group.blocks.map((block) => (
                <button
                  data-active={block.blockId === activeBlock.blockId ? 'true' : 'false'}
                  key={block.blockId}
                  onClick={() => onBlockChange(block.blockId)}
                  type="button"
                >
                  <span>{block.label}</span>
                  <small>{block.fields.length}</small>
                </button>
              ))}
            </div>
          </details>
        ))}
      </nav>

      <div className="ah-editor__section-heading">
        <span>{activeBlock.label}</span>
        <small>Page content</small>
      </div>

      <div className="ah-editor__field-list">
        {activeBlock.fields.length ? (
          activeBlock.fields.map((field) => (
            <button
              className="ah-editor__field-row"
              data-active={field.path === selectedFieldPath ? 'true' : 'false'}
              key={field.path}
              onClick={() => onFieldChange(field)}
              type="button"
            >
              <span>{field.label}</span>
              <small>{field.kind}</small>
            </button>
          ))
        ) : (
          <div className="ah-editor__empty ah-editor__empty--compact">
            <p>This section is collection-driven or has no simple fields.</p>
          </div>
        )}
      </div>

      {selectedField ? (
        <section className="ah-editor__field-editor">
          <div className="ah-editor__field-heading">
            <span>{selectedField.label}</span>
            <small>{activeBlock.label}</small>
          </div>

          {isImageField ? (
            <>
              <div className="ah-editor__media-preview">
                <FieldImagePreview field={selectedField} pendingMedia={pendingMedia} />
                <div>
                  <strong>{pendingMedia ? 'New selection' : 'Current image'}</strong>
                  <span>{pendingMedia?.alt || pendingMedia?.filename || 'Payload image'}</span>
                </div>
              </div>
              <div className="ah-editor__image-actions">
                <button
                  aria-label="Open media library"
                  className="ah-editor__secondary-button"
                  onClick={() => onChooseMedia(selectedField)}
                  type="button"
                >
                  <EditorIcon name="image" />
                  <span>Media</span>
                </button>
                <button
                  aria-label="Save image"
                  className="ah-editor__primary-button"
                  disabled={isSaving || !pendingMedia}
                  onClick={() => void onSaveMedia(selectedField)}
                  type="button"
                >
                  <EditorIcon name="save" />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            </>
          ) : selectedField.kind === 'text' || isURLField ? (
            <>
              {isURLField ? (
                <label className="ah-editor__url-control">
                  <span>Destination URL</span>
                  <input
                    aria-label={`Edit ${selectedField.label}`}
                    onChange={(event) => setDraftValue(event.target.value)}
                    type="url"
                    value={draftValue}
                  />
                </label>
              ) : (
                <textarea
                  aria-label={`Edit ${selectedField.label}`}
                  onChange={(event) => setDraftValue(event.target.value)}
                  rows={Math.min(10, Math.max(3, draftValue.split('\n').length + 2))}
                  value={draftValue}
                />
              )}
              <button
                aria-label="Save to Payload"
                className="ah-editor__primary-button"
                disabled={isSaving || draftValue === selectedField.value}
                onClick={() => void onSaveValue(selectedField, draftValue)}
                type="button"
              >
                <EditorIcon name="save" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </>
          ) : (
            <div className="ah-editor__advanced-field">
              <p>This field should be edited in Payload.</p>
              <a href={activeGroup?.payloadURL} rel="noreferrer" target="_blank">
                Open Payload
              </a>
            </div>
          )}
        </section>
      ) : (
        <div className="ah-editor__hint">
          Click text or an image on the site, or select a field above.
        </div>
      )}
    </div>
  )
}
