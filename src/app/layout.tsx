import React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Amazing Hauling of North Florida | Reliable Dump Truck & Materials Hauling',
  description: 'Dependable dump truck and materials hauling services for contractors throughout Jacksonville and Northeast Florida. Dirt, asphalt, aggregates, and construction site hauling.',
  keywords: 'dump truck hauling, materials hauling, Jacksonville, Northeast Florida, dirt hauling, asphalt hauling, aggregate delivery, construction hauling',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
