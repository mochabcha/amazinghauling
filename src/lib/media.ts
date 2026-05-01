interface MediaLike {
  url?: string | null
  alt?: string | null
}

function normalizeLegacyMediaUrl(value: string): string {
  if (value.startsWith('/api/media/file/') || value.startsWith('/brand/')) {
    return value
  }

  try {
    const parsed = new URL(value)
    const pathSegments = parsed.pathname.split('/').filter(Boolean)

    if (
      parsed.hostname === 's3.us-east-2.amazonaws.com'
      && pathSegments.length >= 2
      && pathSegments[0] === 'embetter-shared-bucket'
      && !pathSegments.includes('production')
    ) {
      return `/api/media/file/${decodeURIComponent(pathSegments[pathSegments.length - 1])}`
    }
  } catch {
    return value
  }

  return value
}

export function resolveMediaUrl(media: unknown): string | undefined {
  if (!media) {
    return undefined
  }

  if (typeof media === 'string') {
    return normalizeLegacyMediaUrl(media)
  }

  if (typeof media === 'object' && 'url' in media) {
    const value = (media as MediaLike).url
    return value ? normalizeLegacyMediaUrl(value) : undefined
  }

  return undefined
}

export function resolveMediaAlt(media: unknown, fallback: string) {
  if (!media || typeof media === 'string') {
    return fallback
  }

  if (typeof media === 'object' && 'alt' in media) {
    const value = (media as MediaLike).alt
    return value || fallback
  }

  return fallback
}
