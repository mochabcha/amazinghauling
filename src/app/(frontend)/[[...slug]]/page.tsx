import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/components/BlockRenderer'
import { resolveMediaUrl } from '@/lib/media'
import { getSiteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

interface PageParams {
  params: Promise<{ slug?: string[] }>
}

async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug: slugArr } = await params
  const slug = slugArr?.join('/') || 'home'
  const page = await getPageBySlug(slug)

  if (!page) return { title: 'Page Not Found' }

  const meta = page.meta as { title?: string; description?: string; image?: unknown } | undefined
  const pageTitle = meta?.title || page.title
  const pageDescription = meta?.description || undefined
  const imageUrl = resolveMediaUrl(meta?.image)
  const pathname = slug === 'home' ? '/' : `/${slug}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type: 'website',
      title: pageTitle,
      description: pageDescription,
      url: pathname,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function DynamicPage({ params }: PageParams) {
  const { slug: slugArr } = await params
  const slug = slugArr?.join('/') || 'home'
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  const layout = (page.layout || []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `${getSiteUrl().replace(/\/$/, '')}${slug === 'home' ? '/' : `/${slug}`}`,
    description: (page.meta as { description?: string } | undefined)?.description || page.title,
  }

  return (
    <div className="page-template">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <BlockRenderer blocks={layout} />
    </div>
  )
}
