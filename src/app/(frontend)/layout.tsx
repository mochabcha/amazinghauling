import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { resolveMediaUrl } from '@/lib/media'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const fallbackNavItems = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Subcontractors', href: '/subcontractor-resources' },
  { label: 'Contact', href: '/contact' },
]

const fallbackFooterColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Dirt & Fill Hauling', href: '/services#dirt' },
      { label: 'Asphalt Hauling', href: '/services#asphalt' },
      { label: 'Aggregates & Rock', href: '/services#aggregates' },
      { label: 'Milling Debris', href: '/services#milling' },
      { label: 'Construction Materials', href: '/services#construction' },
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

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'footer', depth: 1 }).catch(() => null),
  ])

  const footerColumns = (footer?.columns || fallbackFooterColumns).map((column) => ({
    title: column.title,
    links: column.links || [],
  }))

  return (
    <div className="template">
      <Header
        logoSrc={resolveMediaUrl(header?.logo) || '/brand/amazing-hauling-logo.png'}
        companyName={header?.companyName || 'Amazing Hauling'}
        navItems={header?.navItems || fallbackNavItems}
        ctaLabel={header?.ctaLabel || 'Request a Quote'}
        ctaHref={header?.ctaHref || '/contact'}
        phone={header?.phone || undefined}
      />
      <main className="template__main">
        {children}
      </main>
      <Footer
        logoSrc={resolveMediaUrl(header?.logo) || '/brand/amazing-hauling-logo.png'}
        companyName={footer?.companyName || 'Amazing Hauling of North Florida'}
        tagline={footer?.tagline || 'Dump Truck & Materials Hauling Services'}
        description={footer?.description || 'Serving Duval, Clay, Nassau, and St. Johns Counties'}
        ctaImageSrc={resolveMediaUrl(footer?.ctaImage) || undefined}
        ctaImageAlt="Amazing Hauling dump truck in North Florida"
        columns={footerColumns}
        contactInfo={{
          address: footer?.contactInfo?.address || 'Jacksonville, Florida',
          phone: footer?.contactInfo?.phone || undefined,
          email: footer?.contactInfo?.email || 'info@amazinghauling.com',
          hours: footer?.contactInfo?.hours || 'Monday - Friday, 6:00 AM - 6:00 PM',
        }}
        certifications={footer?.certifications || 'Licensed & Insured'}
        copyright={footer?.copyright || '© 2026 Amazing Hauling of North Florida. All Rights Reserved.'}
      />
    </div>
  )
}
