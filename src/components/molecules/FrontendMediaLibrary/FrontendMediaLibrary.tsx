'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { EditorIcon } from '@/components/atoms/EditorIcon'
import type { FrontendEditorMediaItem } from '@/lib/frontendEditor/types'

interface FrontendMediaLibraryProps {
  activeFieldLabel?: string
  hasNextPage: boolean
  isLoading: boolean
  isUploading: boolean
  items: FrontendEditorMediaItem[]
  onLoadMore: () => void
  onSearchChange: (value: string) => void
  onSelect: (media: FrontendEditorMediaItem) => void
  onUpload: (files: FileList | File[]) => void
  pendingMediaId?: string
  search: string
}

export function FrontendMediaLibrary({
  activeFieldLabel,
  hasNextPage,
  isLoading,
  isUploading,
  items,
  onLoadMore,
  onSearchChange,
  onSelect,
  onUpload,
  pendingMediaId,
  search,
}: FrontendMediaLibraryProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="ah-editor__library">
      <div className="ah-editor__library-intro">
        <strong>{activeFieldLabel ? `Selecting for ${activeFieldLabel}` : 'Media library'}</strong>
        <p>
          {activeFieldLabel
            ? 'Choose an image to update this page.'
            : 'Upload images now; assign them when a page image is selected.'}
        </p>
      </div>

      <button
        className="ah-editor__dropzone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          if (event.dataTransfer.files.length) onUpload(event.dataTransfer.files)
        }}
        type="button"
      >
        <EditorIcon name="upload" />
        <span>{isUploading ? 'Uploading...' : 'Drop images here'}</span>
        <small>or click to browse</small>
      </button>
      <input
        accept="image/*"
        hidden
        multiple
        onChange={(event) => {
          if (event.target.files?.length) onUpload(event.target.files)
          event.target.value = ''
        }}
        ref={inputRef}
        type="file"
      />

      <label className="ah-editor__search">
        <span className="ah-editor__sr-only">Search media</span>
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search filename or alt text"
          type="search"
          value={search}
        />
      </label>

      <div className="ah-editor__media-grid">
        {items.map((media) => (
          <button
            data-selected={media.id === pendingMediaId ? 'true' : 'false'}
            key={media.id}
            onClick={() => onSelect(media)}
            title={media.alt || media.filename || 'Image'}
            type="button"
          >
            {media.thumbnailURL || media.url ? (
              <Image
                alt={media.alt || ''}
                height={media.height || 320}
                src={media.thumbnailURL || media.url || ''}
                unoptimized
                width={media.width || 320}
              />
            ) : (
              <span>Image unavailable</span>
            )}
            <small>{media.alt || media.filename || 'Untitled image'}</small>
          </button>
        ))}
      </div>

      {!items.length && !isLoading ? (
        <div className="ah-editor__empty">
          <strong>No images found</strong>
          <p>Drop an Amazing Hauling image above to add it to Payload.</p>
        </div>
      ) : null}

      {hasNextPage ? (
        <button
          className="ah-editor__secondary-button"
          disabled={isLoading}
          onClick={onLoadMore}
          type="button"
        >
          <EditorIcon name="plus" />
          <span>{isLoading ? 'Loading...' : 'More'}</span>
        </button>
      ) : null}
    </div>
  )
}
