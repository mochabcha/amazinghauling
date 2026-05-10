import { buildS3ObjectUrl } from '@/lib/mediaStorage'

export const sharedMediaKeys = {
  fleet: 'fleet',
  fieldPhoto: 'fieldPhoto',
  siteDetail: 'siteDetail',
} as const

export type SharedMediaKey = keyof typeof sharedMediaKeys

const sharedMediaFilenames: Record<SharedMediaKey, string> = {
  fleet: 'fleet.png',
  fieldPhoto: 'IMG_1534.heic_202604011109.jpeg',
  siteDetail: 'IMG_0124.jpeg_202604011109.jpeg',
}

export function resolveSharedMediaUrl(key: SharedMediaKey) {
  const filename = sharedMediaFilenames[key]
  const url = buildS3ObjectUrl({ filename })
  return url || undefined
}
