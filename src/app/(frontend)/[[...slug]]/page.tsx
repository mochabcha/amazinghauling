import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/components/BlockRenderer'

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

  const meta = page.meta as { title?: string; description?: string } | undefined

  return {
    title: meta?.title || page.title,
    description: meta?.description || undefined,
  }
}

export default async function DynamicPage({ params }: PageParams) {
  const { slug: slugArr } = await params
  const slug = slugArr?.join('/') || 'home'
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  const layout = (page.layout || []) as Array<{ blockType: string; id?: string; [key: string]: unknown }>

  return (
    <div className="page-template">
      <BlockRenderer blocks={layout} />
    </div>
  )
}
