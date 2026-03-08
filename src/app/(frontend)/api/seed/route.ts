import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { homePageSeed } from '@/seed/pages/home'
import { servicesPageSeed } from '@/seed/pages/services'
import { projectsPageSeed } from '@/seed/pages/projects'
import { aboutPageSeed } from '@/seed/pages/about'
import { serviceAreasPageSeed } from '@/seed/pages/service-areas'
import { subcontractorPageSeed } from '@/seed/pages/subcontractor'
import { contactPageSeed } from '@/seed/pages/contact'
import { seoPageSeeds } from '@/seed/pages/seo-cities'

const allPages = [
  homePageSeed,
  servicesPageSeed,
  projectsPageSeed,
  aboutPageSeed,
  serviceAreasPageSeed,
  subcontractorPageSeed,
  contactPageSeed,
  ...seoPageSeeds,
]

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    // Create admin user if needed
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: { email: 'admin@amazinghauling.com', password: 'AmazingHauling2026!', name: 'Admin' },
      })
      results.push('Created admin user')
    }

    // Seed pages
    for (const page of allPages) {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        limit: 1,
      })

      if (existing.totalDocs > 0) {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: {
            title: page.title,
            slug: page.slug,
            layout: page.layout as never,
            meta: page.meta,
          },
        })
        results.push(`Updated: ${page.title}`)
      } else {
        await payload.create({
          collection: 'pages',
          data: {
            title: page.title,
            slug: page.slug,
            layout: page.layout as never,
            meta: page.meta,
          },
        })
        results.push(`Created: ${page.title}`)
      }
    }

    const verify = await payload.find({ collection: 'pages', limit: 0 })
    results.push(`Total pages in DB: ${verify.totalDocs}`)

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
