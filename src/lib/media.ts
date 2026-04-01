interface MediaLike {
  url?: string | null
  alt?: string | null
}

export function resolveMediaUrl(media: unknown): string | undefined {
  if (!media) {
    return undefined
  }

  if (typeof media === 'string') {
    return media
  }

  if (typeof media === 'object' && 'url' in media) {
    const value = (media as MediaLike).url
    return value || undefined
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
