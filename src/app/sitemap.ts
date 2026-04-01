import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { getSiteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const pages = await payload.find({
    collection: 'pages',
    limit: 200,
    depth: 0,
  })
  const baseUrl = getSiteUrl().replace(/\/$/, '')

  return pages.docs.map((page) => ({
    url: `${baseUrl}${page.slug === 'home' ? '/' : `/${page.slug}`}`,
    lastModified: page.updatedAt,
    changeFrequency: page.slug === 'home' ? 'weekly' : 'monthly',
    priority: page.slug === 'home' ? 1 : 0.8,
  }))
}
