import React from 'react'
import { ContactTemplate } from '@/components/templates/ContactTemplate'

export const metadata = {
  title: 'Contact & Request a Quote | Amazing Hauling of North Florida',
  description: 'Request hauling services from Amazing Hauling. Get a quote for dirt hauling, asphalt transport, aggregate delivery, and construction site materials in Jacksonville and Northeast Florida.',
}

export default function ContactPage() {
  return (
    <ContactTemplate
      hero={{
        heading: 'Contact & Request a Quote',
        description: 'Request Hauling Services',
      }}
      contactInfo={{
        address: 'Jacksonville, Florida',
        email: 'info@amazinghauling.com',
        hours: 'Monday – Friday, 6:00 AM – 6:00 PM',
      }}
      serviceAreas={[
        { name: 'Jacksonville', services: ['All hauling services'] },
        { name: 'Duval County', services: ['All hauling services'] },
        { name: 'Clay County', services: ['All hauling services'] },
        { name: 'Nassau County', services: ['All hauling services'] },
        { name: 'St. Johns County', services: ['All hauling services'] },
        { name: "St. Mary's, Georgia", services: ['Select hauling services'] },
      ]}
    />
  )
}
