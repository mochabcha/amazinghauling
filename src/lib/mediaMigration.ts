import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import type { Payload } from 'payload'

interface MediaDocument {
  id: string
  alt?: string | null
  caption?: string | null
  filename?: string | null
  mimeType?: string | null
  url?: string | null
}

function guessExtensionFromMimeType(mimeType?: string | null) {
  switch (mimeType) {
    case 'image/png':
      return '.png'
    case 'image/webp':
      return '.webp'
    case 'image/svg+xml':
      return '.svg'
    case 'application/pdf':
      return '.pdf'
    case 'image/jpeg':
    default:
      return '.jpg'
  }
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '-')
}

function resolveFilename(doc: MediaDocument) {
  if (doc.filename) {
    return sanitizeFilename(doc.filename)
  }

  return `${doc.id}${guessExtensionFromMimeType(doc.mimeType)}`
}

function isS3Url(url: string) {
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION

  if (publicBaseUrl && url.startsWith(publicBaseUrl.replace(/\/+$/, ''))) {
    return true
  }

  if (bucket && region && url.startsWith(`https://${bucket}.s3.${region}.amazonaws.com/`)) {
    return true
  }

  return false
}

async function downloadToTempFile(doc: MediaDocument) {
  if (!doc.url) {
    throw new Error(`Media ${doc.id} has no source URL`)
  }

  const response = await fetch(doc.url)

  if (!response.ok) {
    throw new Error(`Failed to download ${doc.url}: ${response.status} ${response.statusText}`)
  }

  const filename = resolveFilename(doc)
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'amazing-hauling-media-'))
  const tempFilePath = path.join(tempDir, filename)
  const arrayBuffer = await response.arrayBuffer()

  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer))

  return {
    tempDir,
    tempFilePath,
  }
}

export async function migrateExistingMediaToS3(payload: Payload) {
  const results: string[] = []
  const media = await payload.find({
    collection: 'media',
    limit: 0,
    depth: 0,
    overrideAccess: true,
  })

  for (const doc of media.docs as MediaDocument[]) {
    const sourceUrl = doc.url

    if (!sourceUrl) {
      results.push(`Skipped ${doc.id}: no URL`)
      continue
    }

    if (isS3Url(sourceUrl)) {
      results.push(`Skipped ${doc.id}: already on S3`)
      continue
    }

    const { tempDir, tempFilePath } = await downloadToTempFile(doc)

    try {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          alt: doc.alt || resolveFilename(doc),
          caption: doc.caption || undefined,
        },
        filePath: tempFilePath,
        depth: 0,
        overrideAccess: true,
        overwriteExistingFiles: true,
      })

      results.push(`Migrated ${doc.id}: ${sourceUrl}`)
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  }

  return { success: true as const, results }
}
