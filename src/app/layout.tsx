import type { Metadata, Viewport } from 'next'
import React from 'react'
import '@/styles/globals.css'
import { getSiteUrlObject } from '@/lib/site'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E8922E',
}

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: 'Amazing Hauling of North Florida | Reliable Dump Truck & Materials Hauling',
    template: '%s | Amazing Hauling of North Florida',
  },
  description: 'Dependable dump truck and materials hauling services for contractors throughout Jacksonville and Northeast Florida. Dirt, asphalt, aggregates, and construction site hauling.',
  keywords: ['dump truck hauling', 'materials hauling', 'Jacksonville', 'Northeast Florida', 'dirt hauling', 'asphalt hauling', 'aggregate delivery', 'construction hauling', 'Amazing Hauling'],
  authors: [{ name: 'Amazing Hauling of North Florida' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Amazing Hauling of North Florida',
    title: 'Amazing Hauling of North Florida | Reliable Dump Truck & Materials Hauling',
    description: 'Dependable dump truck and materials hauling services for contractors throughout Jacksonville and Northeast Florida.',
    images: [
      {
        url: '/brand/amazing-hauling-logo.png',
        width: 1200,
        height: 630,
        alt: 'Amazing Hauling of North Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazing Hauling of North Florida | Reliable Dump Truck & Materials Hauling',
    description: 'Dependable dump truck and materials hauling services for contractors throughout Jacksonville and Northeast Florida.',
    images: ['/brand/amazing-hauling-logo.png'],
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Amazing Hauling of North Florida',
    url: getSiteUrlObject().toString(),
    logo: `${getSiteUrlObject().toString().replace(/\/$/, '')}/brand/amazing-hauling-logo.png`,
    image: `${getSiteUrlObject().toString().replace(/\/$/, '')}/brand/amazing-hauling-logo.png`,
    description: 'Safe, dependable, and efficient dump truck hauling services across North Florida.',
    areaServed: ['Jacksonville', 'Duval County', 'Clay County', 'Nassau County', 'St. Johns County', 'North Florida'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jacksonville',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
  }

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
