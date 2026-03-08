import React from 'react'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import '@/styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E8922E',
}

export const metadata: Metadata = {
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
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  )
}
