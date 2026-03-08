import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

const navItems = [
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

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="template">
      <Header
        companyName="Amazing Hauling"
        navItems={navItems}
        ctaLabel="Request a Quote"
        ctaHref="/contact"
      />
      <main className="template__main">
        {children}
      </main>
      <Footer
        companyName="Amazing Hauling of North Florida"
        tagline="Dump Truck & Materials Hauling Services"
        description="Serving Duval, Clay, Nassau, and St. Johns Counties"
        columns={footerColumns}
        contactInfo={{
          address: 'Jacksonville, Florida',
          email: 'info@amazinghauling.com',
          hours: 'Monday – Friday, 6:00 AM – 6:00 PM',
        }}
        certifications="Licensed & Insured"
        copyright="© 2026 Amazing Hauling of North Florida. All Rights Reserved."
      />
    </div>
  )
}
