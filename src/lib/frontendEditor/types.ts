export type FrontendEditorDocumentScope = 'page'

export type FrontendEditorFieldKind = 'media' | 'text' | 'url'

export interface FrontendEditorMediaValue {
  alt?: string | null
  filename?: string | null
  id: string
  thumbnailURL?: string | null
  url?: string | null
}

export interface FrontendEditorField {
  editable: boolean
  kind: FrontendEditorFieldKind
  label: string
  path: string
  scope: FrontendEditorDocumentScope
  value: FrontendEditorMediaValue | null | string
}

export interface FrontendEditorBlock {
  blockId: string
  blockIndex: number
  blockType: string
  fields: FrontendEditorField[]
  label: string
  scope: FrontendEditorDocumentScope
}

export interface FrontendEditorDocumentDescriptor {
  id: string
  slug: string
  title: string
}

export interface FrontendEditorDocument extends FrontendEditorDocumentDescriptor {
  blocks: FrontendEditorBlock[]
  payloadURL: string
  scope: FrontendEditorDocumentScope
  updatedAt: string
}

export interface FrontendEditorMediaItem extends FrontendEditorMediaValue {
  createdAt?: string | null
  filesize?: number | null
  height?: number | null
  width?: number | null
}
