import React from 'react'
import { ServiceAreasTemplate } from '@/components/templates/ServiceAreasTemplate'

export const metadata = {
  title: 'Service Areas | Amazing Hauling of North Florida',
  description: 'Amazing Hauling serves contractors throughout Jacksonville, Duval County, Clay County, Nassau County, and St. Johns County with dependable dump truck hauling services.',
}

export default function ServiceAreasPage() {
  return (
    <ServiceAreasTemplate
      hero={{
        heading: 'Service Areas',
        description: 'Hauling Services Across Northeast Florida',
      }}
      introContent="Amazing Hauling of North Florida proudly provides dependable dump truck and materials hauling services throughout Jacksonville and the surrounding Northeast Florida region. Our fleet supports contractors, construction crews, and development teams across multiple counties, helping move the materials that keep projects on schedule. While Jacksonville is our primary service area, our trucks regularly operate across nearby counties and cities throughout Northeast Florida."
      areas={[
        { name: 'Jacksonville, Florida', description: 'Jacksonville is the center of our operations and where the majority of our hauling work takes place. With constant road construction, development projects, and infrastructure improvements across the city, contractors rely on dependable hauling partners to keep projects moving efficiently.', services: ['Asphalt paving projects', 'Road construction operations', 'Dirt hauling for development sites', 'Aggregate and rock delivery', 'Construction site material transport'] },
        { name: 'Duval County', description: 'Duval County continues to see major construction and infrastructure growth. Amazing Hauling provides hauling services throughout Duval County for contractors working on road construction, residential development, commercial construction, and infrastructure improvements.', services: ['Road construction and resurfacing', 'Residential development', 'Commercial construction', 'Infrastructure improvements'] },
        { name: 'Clay County', description: "Clay County's continued growth has created strong demand for construction and development services. Amazing Hauling supports contractors across Clay County by providing reliable hauling services for dirt, rock, asphalt, and construction materials.", services: ['Residential developments', 'Road construction projects', 'Materials transport'] },
        { name: 'Nassau County', description: 'Nassau County continues to experience development and infrastructure expansion, particularly around Fernandina Beach and surrounding communities.', services: ['Development site preparation', 'Infrastructure construction', 'Roadway improvements', 'Construction site logistics'] },
        { name: 'St. Johns County', description: 'St. Johns County has become one of the fastest-growing areas in Northeast Florida. Amazing Hauling provides hauling support for residential community development, road construction, commercial development, and infrastructure improvements.', services: ['Residential community development', 'Road construction projects', 'Commercial development', 'Infrastructure improvements'] },
      ]}
      additionalAreas={['Keystone Heights', 'Gainesville', "St. Mary's, Georgia", 'Other areas across Florida']}
    />
  )
}
