import type { Payload } from 'payload'

import { getS3StorageConfig } from '@/lib/mediaStorage'

interface MediaRecord {
  id: string
  filename?: string | null
  prefix?: string | null
}

export async function backfillMediaPrefix(payload: Payload) {
  const s3StorageConfig = getS3StorageConfig()

  if (!s3StorageConfig) {
    return { success: false as const, results: ['Skipped prefix backfill: S3 is not configured'] }
  }

  const media = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 0,
    overrideAccess: true,
    showHiddenFields: true,
  })

  const results: string[] = []

  for (const doc of media.docs as MediaRecord[]) {
    if (doc.prefix === s3StorageConfig.prefix) {
      results.push(`Skipped ${doc.filename || doc.id}: prefix already set`)
      continue
    }

    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        prefix: s3StorageConfig.prefix,
      },
      depth: 0,
      overrideAccess: true,
      showHiddenFields: true,
    })

    results.push(`Updated ${doc.filename || doc.id}: prefix=${s3StorageConfig.prefix}`)
  }

  return { success: true as const, results }
}
