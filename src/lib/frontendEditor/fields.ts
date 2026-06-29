import type {
  FrontendEditorBlock,
  FrontendEditorDocumentScope,
  FrontendEditorField,
  FrontendEditorMediaValue,
} from './types'

type UnknownRecord = Record<string, unknown>

const EDITABLE_TEXT_FIELDS = new Set([
  'badge',
  'body',
  'description',
  'heading',
  'headingLine1',
  'headingLine2',
  'headingLine3',
  'item',
  'label',
  'name',
  'primaryCta',
  'secondaryCta',
  'service',
  'title',
  'value',
])

const MEDIA_FIELDS = new Set(['image'])

const URL_FIELDS = new Set([
  'ctaLink',
  'href',
  'primaryCtaLink',
  'secondaryCtaLink',
])

const BLOCK_LABELS: Record<string, string> = {
  areaCards: 'Service areas',
  contentSplit: 'Content split',
  ctaBanner: 'CTA banner',
  fleet: 'Fleet section',
  hero: 'Hero',
  projectGrid: 'Project gallery',
  quoteForm: 'Quote form',
  serviceCards: 'Service cards',
  splitCtaBanner: 'Split CTA',
  statsBar: 'Stats',
  textBlock: 'Text block',
  valuesGrid: 'Values grid',
  workApplicationForm: 'Work application form',
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isMedia(value: unknown): value is UnknownRecord & { id: string } {
  if (!isRecord(value) || typeof value.id !== 'string') return false

  return (
    (typeof value.mimeType === 'string' && value.mimeType.startsWith('image/')) ||
    typeof value.filename === 'string' ||
    typeof value.url === 'string'
  )
}

function humanize(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/^./, (character) => character.toUpperCase())
}

function toMediaValue(value: UnknownRecord & { id: string }): FrontendEditorMediaValue {
  return {
    alt: typeof value.alt === 'string' ? value.alt : null,
    filename: typeof value.filename === 'string' ? value.filename : null,
    id: value.id,
    thumbnailURL: typeof value.thumbnailURL === 'string' ? value.thumbnailURL : null,
    url: typeof value.url === 'string' ? value.url : null,
  }
}

function collectFields(
  value: unknown,
  path: string,
  fieldName: string,
  fields: FrontendEditorField[],
  scope: FrontendEditorDocumentScope,
) {
  if (fieldName.startsWith('_')) return

  if (isMedia(value)) {
    fields.push({
      editable: true,
      kind: 'media',
      label: humanize(fieldName),
      path,
      scope,
      value: toMediaValue(value),
    })
    return
  }

  if ((typeof value === 'string' || value == null) && MEDIA_FIELDS.has(fieldName)) {
    fields.push({
      editable: true,
      kind: 'media',
      label: humanize(fieldName),
      path,
      scope,
      value: null,
    })
    return
  }

  if ((typeof value === 'string' || value == null) && URL_FIELDS.has(fieldName)) {
    fields.push({
      editable: true,
      kind: 'url',
      label: humanize(fieldName),
      path,
      scope,
      value: typeof value === 'string' ? value : '',
    })
    return
  }

  if (typeof value === 'string' && EDITABLE_TEXT_FIELDS.has(fieldName)) {
    fields.push({
      editable: true,
      kind: 'text',
      label: humanize(fieldName),
      path,
      scope,
      value,
    })
    return
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectFields(entry, `${path}.${index}`, fieldName, fields, scope))
    return
  }

  if (!isRecord(value)) return

  Object.entries(value).forEach(([key, nestedValue]) => {
    if (key === 'id' || key === 'blockName' || key === 'blockType' || key.startsWith('_')) return
    collectFields(nestedValue, `${path}.${key}`, key, fields, scope)
  })
}

export function extractEditableBlocks(
  layout: unknown,
  scope: FrontendEditorDocumentScope = 'page',
): FrontendEditorBlock[] {
  if (!Array.isArray(layout)) return []

  return layout.flatMap((block, blockIndex) => {
    if (!isRecord(block) || typeof block.blockType !== 'string') return []

    const blockId = typeof block.id === 'string' ? block.id : `block-${blockIndex}`
    const fields: FrontendEditorField[] = []

    Object.entries(block).forEach(([key, value]) => {
      if (key === 'id' || key === 'blockName' || key === 'blockType' || key.startsWith('_')) return
      collectFields(value, `layout.${blockIndex}.${key}`, key, fields, scope)
    })

    return [
      {
        blockId,
        blockIndex,
        blockType: block.blockType,
        fields,
        label: BLOCK_LABELS[block.blockType] || humanize(block.blockType),
        scope,
      },
    ]
  })
}

export function setValueAtPath(
  source: unknown,
  path: string,
  nextValue: unknown,
  allowLeafCreation = false,
): boolean {
  const segments = path.split('.')
  const finalSegment = segments.pop()
  if (!finalSegment) return false

  const parent = segments.reduce<unknown>((value, segment) => {
    if (Array.isArray(value)) return value[Number(segment)]
    if (isRecord(value)) return value[segment]
    return undefined
  }, source)

  if (Array.isArray(parent)) {
    const index = Number(finalSegment)
    if (!Number.isInteger(index) || index < 0 || index >= parent.length) return false
    parent[index] = nextValue
    return true
  }

  if (!isRecord(parent) || (!allowLeafCreation && !(finalSegment in parent))) return false
  parent[finalSegment] = nextValue
  return true
}
