import { getPayloadClient } from '@/lib/payload'
import { getSiteUrl } from '@/lib/site'
import { projectSeeds } from '@/seed/collections/projects'
import { serviceSeeds } from '@/seed/collections/services'
import { seedMediaAssets, type MediaSeedKey } from '@/seed/media'
import { aboutPageSeed } from '@/seed/pages/about'
import { contactPageSeed } from '@/seed/pages/contact'
import { homePageSeed } from '@/seed/pages/home'
import { projectsPageSeed } from '@/seed/pages/projects'
import { seoPageSeeds } from '@/seed/pages/seo-cities'
import { serviceAreasPageSeed } from '@/seed/pages/service-areas'
import { servicesPageSeed } from '@/seed/pages/services'
import { subcontractorPageSeed } from '@/seed/pages/subcontractor'

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

const headerNavItems = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Subcontractors', href: '/subcontractor-resources' },
  { label: 'Contact', href: '/contact' },
]

const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Dirt & Fill Hauling', href: '/services' },
      { label: 'Asphalt Hauling', href: '/services' },
      { label: 'Aggregates & Rock', href: '/services' },
      { label: 'Milling Debris', href: '/services' },
      { label: 'Construction Materials', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Service Areas', href: '/service-areas' },
      { label: 'Subcontractor Resources', href: '/subcontractor-resources' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Service Areas',
    links: [
      { label: 'Jacksonville', href: '/areas/jacksonville' },
      { label: 'Fernandina Beach', href: '/areas/fernandina-beach' },
      { label: 'Orange Park', href: '/areas/orange-park' },
      { label: 'St. Augustine', href: '/areas/st-augustine' },
      { label: 'Yulee', href: '/areas/yulee' },
    ],
  },
]

function withBlockMedia<T extends Record<string, unknown>>(input: T, mediaMap: Record<MediaSeedKey, string>) {
  const next = { ...input } as Record<string, unknown>
  const imageKey = next.imageKey as MediaSeedKey | undefined

  if (imageKey && mediaMap[imageKey]) {
    next.image = mediaMap[imageKey]
  }

  delete next.imageKey

  return next
}

function mapPageLayout(layout: Array<Record<string, unknown>>, mediaMap: Record<MediaSeedKey, string>) {
  return layout.map((block) => {
    const nextBlock = withBlockMedia(block, mediaMap)

    if (nextBlock.blockType === 'projectGrid' && Array.isArray(nextBlock.items)) {
      nextBlock.items = nextBlock.items.map((item) => {
        const nextItem = { ...(item as Record<string, unknown>) }
        const imageKey = nextItem.imageKey as MediaSeedKey | undefined

        if (imageKey && mediaMap[imageKey]) {
          nextItem.image = mediaMap[imageKey]
        }

        delete nextItem.imageKey
        return nextItem
      })
    }

    return nextBlock
  })
}

function mapMeta(meta: Record<string, unknown> | undefined, mediaMap: Record<MediaSeedKey, string>) {
  if (!meta) {
    return undefined
  }

  const nextMeta = { ...meta }
  const imageKey = nextMeta.imageKey as MediaSeedKey | undefined

  if (imageKey && mediaMap[imageKey]) {
    nextMeta.image = mediaMap[imageKey]
  }

  delete nextMeta.imageKey

  return nextMeta
}

async function upsertBySlug(args: {
  payload: Awaited<ReturnType<typeof getPayloadClient>>
  collection: 'pages' | 'services' | 'projects'
  slug: string
  data: Record<string, unknown>
  results: string[]
  label: string
}) {
  const { payload, collection, slug, data, results, label } = args
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0) {
    await (payload as any).update({
      collection,
      id: existing.docs[0].id,
      data,
      depth: 0,
    })
    results.push(`Updated ${label}: ${slug}`)
    return
  }

  await (payload as any).create({
    collection,
    data,
    depth: 0,
  })
  results.push(`Created ${label}: ${slug}`)
}

export async function runSeed() {
  const payload = await getPayloadClient()
  const results: string[] = []

  const existingUsers = await payload.find({ collection: 'users', limit: 1, depth: 0 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@amazinghauling.com',
        password: 'AmazingHauling2026!',
        name: 'Admin',
      },
    })
    results.push('Created admin user')
  }

  const mediaMap = await seedMediaAssets({ payload, results })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: mediaMap.logo,
      companyName: 'Amazing Hauling of North Florida',
      navItems: headerNavItems,
      ctaLabel: 'Request a Quote',
      ctaHref: '/contact',
    },
    depth: 0,
  })
  results.push('Updated global: header')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      companyName: 'Amazing Hauling of North Florida',
      tagline: 'Dump Truck & Materials Hauling Services',
      description: 'Serving Duval, Clay, Nassau, and St. Johns Counties',
      columns: footerColumns,
      contactInfo: {
        address: 'Jacksonville, Florida',
        email: 'info@amazinghauling.com',
        hours: 'Monday - Friday, 6:00 AM - 6:00 PM',
      },
      certifications: 'Licensed & Insured',
      copyright: '© 2026 Amazing Hauling of North Florida. All Rights Reserved.',
    },
    depth: 0,
  })
  results.push('Updated global: footer')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Amazing Hauling of North Florida',
      siteDescription: 'Reliable dump truck and materials hauling in Jacksonville and Northeast Florida.',
      siteUrl: getSiteUrl(),
      ogImage: mediaMap.worksite,
    },
    depth: 0,
  })
  results.push('Updated global: site-settings')

  for (const page of allPages) {
    await upsertBySlug({
      payload,
      collection: 'pages',
      slug: page.slug,
      label: 'page',
      results,
      data: {
        title: page.title,
        slug: page.slug,
        layout: mapPageLayout(page.layout as Array<Record<string, unknown>>, mediaMap) as never,
        meta: mapMeta(page.meta as Record<string, unknown>, mediaMap),
      },
    })
  }

  for (const service of serviceSeeds) {
    const nextService = { ...service } as Record<string, unknown>
    const imageKey = nextService.imageKey as MediaSeedKey | undefined

    if (imageKey && mediaMap[imageKey]) {
      nextService.image = mediaMap[imageKey]
    }

    delete nextService.imageKey

    await upsertBySlug({
      payload,
      collection: 'services',
      slug: service.slug,
      label: 'service',
      results,
      data: nextService,
    })
  }

  for (const project of projectSeeds) {
    const nextProject = { ...project } as Record<string, unknown>
    const featuredImageKey = nextProject.featuredImageKey as MediaSeedKey | undefined
    const galleryKeys = (nextProject.galleryKeys as MediaSeedKey[] | undefined) || []

    if (featuredImageKey && mediaMap[featuredImageKey]) {
      nextProject.featuredImage = mediaMap[featuredImageKey]
    }

    nextProject.gallery = galleryKeys
      .map((key) => mediaMap[key])
      .filter(Boolean)
      .map((image) => ({ image }))

    delete nextProject.featuredImageKey
    delete nextProject.galleryKeys

    await upsertBySlug({
      payload,
      collection: 'projects',
      slug: project.slug,
      label: 'project',
      results,
      data: nextProject,
    })
  }

  const [pageCount, serviceCount, projectCount, mediaCount] = await Promise.all([
    payload.find({ collection: 'pages', limit: 0, depth: 0 }),
    payload.find({ collection: 'services', limit: 0, depth: 0 }),
    payload.find({ collection: 'projects', limit: 0, depth: 0 }),
    payload.find({ collection: 'media', limit: 0, depth: 0 }),
  ])

  results.push(`Total pages in DB: ${pageCount.totalDocs}`)
  results.push(`Total services in DB: ${serviceCount.totalDocs}`)
  results.push(`Total projects in DB: ${projectCount.totalDocs}`)
  results.push(`Total media in DB: ${mediaCount.totalDocs}`)

  return { success: true as const, results }
}
