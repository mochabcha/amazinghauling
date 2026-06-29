const LOCAL_SITE_URL = 'http://localhost:3000'
const PRODUCTION_SITE_URL = 'https://amazinghaulingnf.com'

function resolveDefaultSiteUrl() {
  return process.env.NODE_ENV === 'production' ? PRODUCTION_SITE_URL : LOCAL_SITE_URL
}

function normalizeSiteUrl(rawUrl?: string) {
  if (!rawUrl) {
    return resolveDefaultSiteUrl()
  }

  try {
    const parsed = new URL(rawUrl)

    if (parsed.hostname.endsWith('.vercel.app')) {
      return PRODUCTION_SITE_URL
    }

    return parsed.origin
  } catch {
    return resolveDefaultSiteUrl()
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl())
}
